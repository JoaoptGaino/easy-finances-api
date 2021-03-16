import { Application } from "../declarations";
import users from "./users/users.service";
import types from "./types/types.service";
import financeTransaction from "./finance-transaction/finance-transaction.service";
import calculations from "./calculations/calculations.service";
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(types);
  app.configure(financeTransaction);
  app.configure(calculations);
}
