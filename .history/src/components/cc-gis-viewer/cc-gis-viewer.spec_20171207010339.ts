import { render } from '@stencil/core/testing';
import { CcGisViewer } from './cc-gis-viewer';

describe('c', () => {
  it('should build', () => {
    expect(new CcGisViewer()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [CcGisViewer],
        html: '<cc-gis-viewer></cc-gis-viewer>'
      });
    });
  });
});