import { render } from '@stencil/core/testing';
import { CcGisViewer } from './cc-gis-viewer';

describe('my-app', () => {
  it('should build', () => {
    expect(new MyApp()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [MyApp],
        html: '<my-app></my-app>'
      });
    });
  });
});