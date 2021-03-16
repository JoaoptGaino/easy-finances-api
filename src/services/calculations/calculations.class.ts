import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from "@feathersjs/feathers";
import { Transaction } from "sequelize/types";
import { toFloat } from "validator";
import { Application } from "../../declarations";
import { FinanceTransactionModel } from "../../models/finance-transaction.model";
import { FinanceTransaction } from "../finance-transaction/finance-transaction.class";

interface Data {}

interface ServiceOptions {}
let totalIncome = 0,
  totalOutcome = 0;
export class Calculations implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }
  get transactionsService(): FinanceTransaction {
    return this.app.service("finance-transaction");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Data[] | Paginated<Data> | any> {
    const query: any = params?.query || {};
    if (query.type === "totalIncome") {
      const allTransactions = (await this.transactionsService.find()) as Paginated<FinanceTransactionModel>;
      const valuesIncome = allTransactions.data.map((data) =>
        data.typeId === 1 ? +data.value : 0
      );
      for (const value of valuesIncome) {
        totalIncome += value;
      }
      return {
        totalIncome: totalIncome,
      };
    } else if (query.type === "totalOutcome") {
      const allTransactions = (await this.transactionsService.find()) as Paginated<FinanceTransactionModel>;
      const valuesOutcome = allTransactions.data.map((data) =>
        data.typeId === 2 ? +data.value : 0
      );
      for (const value of valuesOutcome) {
        totalOutcome += value;
      }
      return {
        totalOutcome: totalOutcome,
      };
    } else if (query.type === "netBalance") {
      const allTransactions = (await this.transactionsService.find()) as Paginated<FinanceTransactionModel>;
      const valuesIncome = allTransactions.data.map((data) =>
        data.typeId === 1 ? +data.value : 0
      );
      const valuesOutcome = allTransactions.data.map((data) =>
        data.typeId === 2 ? +data.value : 0
      );
      for (const value of valuesOutcome) {
        totalOutcome += value;
      }
      for (const value of valuesIncome) {
        totalIncome += value;
      }
      console.log(totalIncome);
      console.log(totalOutcome);
      const netBalance = totalIncome - totalOutcome;

      return {
        netBalance: netBalance,
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<Data> {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Data, params?: Params): Promise<Data> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Data> {
    return { id };
  }
}
