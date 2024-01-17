import { Request, Response, NextFunction } from 'express';

import { cittiesLogger as log } from '../../server/winstonLog';
import axios from 'axios';

const getCurrencyList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const options = {
      method: 'GET',
      url: 'https://currencyconverter.p.rapidapi.com/availablecurrencies',
      headers: {
        'X-RapidAPI-Key': '9dab233126mshb4192ee6a836697p1799f1jsn974963a92fe2',
        'X-RapidAPI-Host': 'currencyconverter.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    res.status(200).send(response.data);
  } catch (error) {
    log.error(`Error retrieving response, error: ${error}`)
    next(error);
  }
};

const getConvertCurrencies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const options = {
      method: 'GET',
      url: 'https://currencyconverter.p.rapidapi.com/',
      params: {
        from_amount: '1',
        from: 'USD',
        to: 'SEK'
      },
      headers: {
        'X-RapidAPI-Key': '9dab233126mshb4192ee6a836697p1799f1jsn974963a92fe2',
        'X-RapidAPI-Host': 'currencyconverter.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    res.status(200).send(response.data);
  } catch (error) {
    log.error(`Error retrieving response, error: ${error}`)
    next(error);
  }
};

export {
  getCurrencyList,
  getConvertCurrencies,
};