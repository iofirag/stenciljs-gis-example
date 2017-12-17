import { render } from '@stencil/core/testing';
import { CcGisViewer } from './cc-gis-viewer';

describe('my-app', () => {
  it('should build', () => {
    expect(new CcGisViewer()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [CcGisViewer],
        html: '<my-app></my-app>'
      });
    });
  });
});