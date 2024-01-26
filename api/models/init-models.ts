import type { Sequelize } from "sequelize";
import { currency_conversion as _currency_conversion } from "./currency_conversion";
import type { currency_conversionAttributes, currency_conversionCreationAttributes } from "./currency_conversion";

export {
  _currency_conversion as currency_conversion,
};

export type {
  currency_conversionAttributes,
  currency_conversionCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const currency_conversion = _currency_conversion.initModel(sequelize);


  return {
    currency_conversion: currency_conversion,
  };
}
