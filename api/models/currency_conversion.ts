/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable @typescript-eslint/naming-convention */
import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';

export interface currency_conversionAttributes {
  id: string;
  from_country: string;
  to_country: string;
  from_amount: string;
  currency_name: string;
  rate: string;
  rate_for_amount: string;
  converted_date: string;
}

export type currency_conversionPk = "id";
export type currency_conversionId = currency_conversion[currency_conversionPk];
export type currency_conversionCreationAttributes = currency_conversionAttributes;

export class currency_conversion extends Model<currency_conversionAttributes, currency_conversionCreationAttributes> implements currency_conversionAttributes {
  id!: string;
  from_country!: string;
  to_country!: string;
  from_amount!: string;
  currency_name!: string;
  rate!: string;
  rate_for_amount!: string;
  converted_date!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof currency_conversion {
    return currency_conversion.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    from_country: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    to_country: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    from_amount: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    currency_name: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    rate: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    rate_for_amount: {
      type:DataTypes.CHAR(50),
      allowNull: false
    },
    converted_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'currency_conversion',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "currency_conversion_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
