import express from 'express';
import { getConvertCurrencies, getCurrencyList } from './currency.controllers';


class CurrencyRouter {
  public router = express.Router();

  constructor() {
    this.router.get('/currency', getCurrencyList);

    this.router.get('/convert', getConvertCurrencies);
  }
}

export default new CurrencyRouter().router;