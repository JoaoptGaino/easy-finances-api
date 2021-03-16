// Initializes the `calculations` service on path `/calculations`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Calculations } from './calculations.class';
import hooks from './calculations.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'calculations': Calculations & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/calculations', new Calculations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('calculations');

  service.hooks(hooks);
}
