import assert from 'assert';
import app from '../../src/app';

describe('\'types\' service', () => {
  it('registered the service', () => {
    const service = app.service('types');

    assert.ok(service, 'Registered the service');
  });
});
