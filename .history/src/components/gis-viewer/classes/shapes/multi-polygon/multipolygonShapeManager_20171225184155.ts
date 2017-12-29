import {
  ShapeDefinition,
  PolygonShape,
  ShapeType,
  ShapeObject,
  Coordinate,
  MultiPolygonShape
} from '../../../../../models/apiModels';
import /** as*/ L from "leaflet";
import { ShapeEventHandlers, ShapeManagerBase } from "../ShapeManager";
import /** as*/ _ from "lodash";

export class MultiPolygonShapeManager extends ShapeManagerBase {
  // getCoordinateAsString(shapeObject: ShapeObject): string {
  //   const polygonsStrArr: string[] = [];
  //   const multipolygon = shapeObject.shape as MultiPolygonShape;
  //   const allPolygons: PolygonShape[] = multipolygon.polygons || [];

  //   allPolygons.forEach((polygon: PolygonShape) => {
  //     // Iterate all polygons
  //     const coordinatesStrArr: string[] = [];

  //     polygon.coordinates.forEach((coordinate: Coordinate) => {
  //       // Iterate coordinates
  //       coordinatesStrArr.push(Utils.getCoordinageStrByCoordinate(coordinate));
  //     });

  //     const stringifiedPointsOfPolygon = coordinatesStrArr.join(",");

  //     polygonsStrArr.push(stringifiedPointsOfPolygon);
  //   });

  //   return polygonsStrArr.join(",");
  // }

  getType(): ShapeType {
    return ShapeType.MULTIPOLYGON;
  }

  shapeObjectToWkt(shapeObject: ShapeObject): string {
    const multipolygon = shapeObject.shape as MultiPolygonShape;

    if (multipolygon.polygons && multipolygon.polygons.length > 0) {
      const multiPolygon = multipolygon.polygons
        .map((polygon: PolygonShape) => {
          const anyObj: any = polygon;

          return (
            "((" +
            anyObj.shape.coordinates[0]
              .map(
                (coordinate: Coordinate) =>
                  `${coordinate.lng} ${coordinate.lat}`
              )
              .join(",") +
            "))"
          );
        })
        .join(",");

      return `MULTIPOLYGON(${multiPolygon})`;
    } else {
      return "";
    }
  }

  shapeWktToObject(shapeWkt: string): ShapeObject {
    shapeWkt = shapeWkt.replace(/, /g, ",");

    const multipolygonArr = shapeWkt.split("),(");
    const polygons = multipolygonArr.map(polygon =>
      polygon.replace(/[^0-9\.\,\ \-]/g, "")
    );
    const multiPolygonShape = {
      polygons: polygons.map((polygon): PolygonShape => ({
        coordinates: polygon
          .split(",")
          .map((coordinateStr: string): Coordinate => ({
            lng: Number(coordinateStr.split(" ")[0]),
            lat: Number(coordinateStr.split(" ")[1])
          }))
      }))
    };

    return {
      type: ShapeType.MULTIPOLYGON,
      shape: <MultiPolygonShape>multiPolygonShape
    };
  }

  isWktOfType(wkt: string): boolean {
    /* TBD use shapeWktToObject method to parse wkt string,
		 if success and get the object, return true
		 else return false
		 */
    return wkt.indexOf("MULTIPOLYGON") > -1;
    // return true; // tbd, start with circle
  }

  addShapeToLayer(
    shapeDef: ShapeDefinition,
    container: L.LayerGroup,
    eventHandlers: ShapeEventHandlers
  ): L.FeatureGroup {
    if (shapeDef.shapeObject) {
      // Create Circle from shape values
      const multiPolygonShape: MultiPolygonShape = <MultiPolygonShape>shapeDef
        .shapeObject.shape;
      const mp: any = {
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: [this._toGeoJsonMultipolygon(multiPolygonShape)]
        },
        properties: {
          // "name": "MultiPolygon"
        }
      };

      const leafletObject: any = new L.GeoJSON(mp);

      const obj = _.cloneDeep(shapeDef);
      leafletObject.shapeDef = _.merge(leafletObject.shapeDef, obj, {
        data: {
          isSelected: _.get(shapeDef, "data.isSelected", false),
          count: _.get(shapeDef, "data.count", 1)
        }
      });

      leafletObject.addTo(<any>container);

      if (eventHandlers && eventHandlers.click) {
        // Set on click event handler
        leafletObject.on('click', eventHandlers.click);
      }

      return leafletObject;
    } else {
      console.error(
        "shapeDef.shapeObject.shape is missing for creating the Polygons"
      );
      return null;
    }
    // tbd , use _.defaults for default options
  }

  getShapeObjectFromDrawingLayer(layer: L.Polygon): ShapeObject {
    const polygon: PolygonShape = {
      coordinates: layer.getLatLngs()
    };

    return {
      shape: polygon,
      type: ShapeType.MULTIPOLYGON
    };
  }

  public getAreaSize(shapeObject: ShapeObject): number {
    console.log("TBD getAreaSize() for multipolygon");
    return 0;
  }

  public isLayerOfThisShapeType(leafletLayer: L.FeatureGroup): boolean {
    if (!leafletLayer.getLayers()) {
      return false;
    }

    return true;
  }

  private _toGeoJsonMultipolygon(
    multiPolygonObj: MultiPolygonShape
  ): number[][][] {
    // GeoJson type
    return multiPolygonObj.polygons.map((polygon: PolygonShape) =>
      polygon.coordinates.map((coord: Coordinate) => [coord.lng, coord.lat])
    );
  }
}
