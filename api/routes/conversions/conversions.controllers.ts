/* eslint-disable @typescript-eslint/naming-convention */
import { randomUUID } from 'crypto';

import { Request, Response, NextFunction } from 'express';
import { SEQUILIZE_NEW } from '../../server/config';
import { initModels } from '../../models/init-models';

import { conversionsLogger as log } from '../../server/winstonLog';
import { convertCurrencies } from '../currency/currency.controllers';

const { currency_conversion } = initModels(SEQUILIZE_NEW);


const getconversionList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const list = await currency_conversion.findAll({
            raw: true,
        }).catch((err: unknown) => {
            log.log('error', `Error in getting list, error: ${err}`);
            throw new Error('Error in getting list');
        });
        res.status(200).send(list);
    } catch (error) {
        log.error(`Erron in getconversionList, error: ${error}`);
        next(error);
    }
};

const postConversion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { 
            from_country , 
            to_country, 
            from_amount,
            currency_name,
            rate,
            rate_for_amount
        } = req.body;
        const post = await currency_conversion.create({
            id: randomUUID(),
            from_country,
            to_country,
            from_amount,
            currency_name,
            rate,
            rate_for_amount,
            converted_date: new Date().toISOString(),
        }).catch((err: unknown) => {
            log.log('error', `Error in post, error: ${err}`);
            throw new Error('Error in post');
        });
        res.status(201).send(post);
    } catch (error) {
        log.error(`Erron in postConversion, error: ${error}`);
        next(error);
    }
};

const putConversion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id , from_country , to_country, from_amount } = req.body;
        const amount = await convertCurrencies(from_amount!, from_country!, to_country);
        console.log(amount);
        const updateWeather = await currency_conversion.update(
            {
                from_amount,
                rate_for_amount: '',
                converted_date: new Date().toISOString(),
            },
            {
                where: {
                    id,
                },
            },
        ).catch((err: unknown) => {
            log.log('error', `Error in update, error: ${err}`);
            throw new Error('Error in update');
        });
        res.status(204).send(updateWeather);
    } catch (error) {
        log.error(`Erron in putConversion, error: ${error}`);
        next(error);
    }
};

const deleteConversion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id: incommingID = ''  } = req.query;
        const deleteRow = await currency_conversion.destroy({
            where: {
                id: incommingID as string,
            },
        }).catch((err: unknown) => {
            log.log('error', `Error in delete, error: ${err}`);
            throw new Error('Error in delete');
        });
        res.status(204).send(deleteRow);
    } catch (error) {
        log.error(`Erron in deleteConversion, error: ${error}`);
        next(error);
    }
};

export {
    getconversionList,
    postConversion,
    putConversion,
    deleteConversion,
}