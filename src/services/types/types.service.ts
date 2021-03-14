// Initializes the `types` service on path `/types`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Types } from './types.class';
import createModel from '../../models/types.model';
import hooks from './types.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'types': Types & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/types', new Types(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('types');

  service.hooks(hooks);
}
