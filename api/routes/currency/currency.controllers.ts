import { Request, Response, NextFunction } from 'express';

import { currencyLogger as log } from '../../server/winstonLog';
import axios from 'axios';

import Converted from './currency.models';

const getCurrencyList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const options = {
      method: 'GET',
      url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
      params: {
        format: 'json',
        from: 'AUD',
        to: 'CAD',
        amount: '1'
      },
      headers: {
        'X-RapidAPI-Key': '9dab233126mshb4192ee6a836697p1799f1jsn974963a92fe2',
        'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    res.status(200).send(response.data.currencies);
  } catch (error) {
    log.error(`Error retrieving response, error: ${error}`)
    next(error);
  }
};

const convertCurrencies = async (
  convertAmout: string, 
  countryFrom: string, 
  countryTo: string
): Promise<Converted | Error> => {
  try {
    const options = {
      method: 'GET',
      url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
      params: {
        format: 'json',
        from: countryFrom,
        to: countryTo,
        amount: convertAmout
      },
      headers: {
        'X-RapidAPI-Key': '9dab233126mshb4192ee6a836697p1799f1jsn974963a92fe2',
        'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    console.log('response', response);
    return {};
  } catch(error) {
    return error as Error;
  }
}

const getConvertCurrencies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { convertAmout, countryFrom, countryTo } = req.body;
    const response = await convertCurrencies(convertAmout, countryFrom, countryTo);

    if (response instanceof Error) {
      next(response);
    }
    res.status(200).send(response);
  } catch (error) {
    log.error(`Error retrieving response, error: ${error}`)
    next(error);
  }
};

export {
  getCurrencyList,
  getConvertCurrencies,
};