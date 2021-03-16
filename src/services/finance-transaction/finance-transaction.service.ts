// Initializes the `transaction` service on path `/transaction`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { FinanceTransaction } from "./finance-transaction.class";
import createModel from "../../models/finance-transaction.model";
import hooks from "./finance-transaction.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    "finance-transaction": FinanceTransaction & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/finance-transaction", new FinanceTransaction(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("finance-transaction");

  service.hooks(hooks);
}
