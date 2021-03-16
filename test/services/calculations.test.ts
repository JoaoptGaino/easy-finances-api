import assert from 'assert';
import app from '../../src/app';

describe('\'calculations\' service', () => {
  it('registered the service', () => {
    const service = app.service('calculations');

    assert.ok(service, 'Registered the service');
  });
});
