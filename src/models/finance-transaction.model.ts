// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { Application } from "../declarations";
import { HookReturn } from "sequelize/types/lib/hooks";
import { BaseModel, BaseModelType } from "./common";

export interface FinanceTransactionModel extends BaseModelType {
  description: string;
  value: number;
  typeId: number;
}
export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const transaction = sequelizeClient.define(
    "transaction",
    {
      ...BaseModel,
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "type_id",
      },
    },
    {
      hooks: {
        beforeCount(options: any): HookReturn {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (transaction as any).associate = function (models: any): void {
    transaction.belongsTo(models.types, {
      foreignKey: "typeId",
      as: "TransactionType",
    });
  };

  return transaction;
}
