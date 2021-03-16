import { Paginated } from "@feathersjs/feathers";
import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import { Application } from "../../declarations";
import { FinanceTransactionModel } from "../../models/finance-transaction.model";

export class FinanceTransaction extends Service {
  app: Application;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }
  async calculateNet(): Promise<any> {
    const allTransactions = (await this.find()) as Paginated<FinanceTransactionModel>;
    /* const valuesIncome = allTransactions.data.map((data) =>
      data.typeId === 1 ? +data.value : 0
    );
    const valuesOutcome = allTransactions.data.map((data) =>
      data.typeId === 2 ? +data.value : 0
    ); */
    let valuesIncome = 0,
      valuesOutcome = 0;
    for (let i = 0; i < allTransactions.total; i++) {
      if (allTransactions.data[i].typeId === 1) {
        valuesIncome += +allTransactions.data[i].value;
      } else {
        valuesOutcome += +allTransactions.data[i].value;
      }
    }
    const netIncome = valuesIncome - valuesOutcome;
    return {
      valuesIncome,
      valuesOutcome,
      netIncome,
    };
  }
}
