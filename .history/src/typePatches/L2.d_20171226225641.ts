L.Control.StyledLayerControl = L.Control.Layers.extend({
    options: {
        collapsed: true,
        position: 'topright',
        autoZIndex: true,
        group_togglers: {
            show: false,
            labelAll: 'All',
            labelNone: 'None'
        },
        callbacks: {
            onChangeCheckbox: null
        },
        groupDeleteLabel: 'Delete the group'
    },


    interface FeatureGroup {
        shapeDef: ShapeDefinition;
        layerName?: string;
    }