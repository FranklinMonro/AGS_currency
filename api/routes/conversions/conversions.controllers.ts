import { Request, Response, NextFunction } from 'express';

import { conversionsLogger as log } from '../../server/winstonLog';


const getconversionList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
    } catch (error) {
        log.error(`Erron in getconversionList, error: ${error}`);
        next(error);
    }
};

const postConversion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
    } catch (error) {
        log.error(`Erron in postConversion, error: ${error}`);
        next(error);
    }
};

const putConversion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
    } catch (error) {
        log.error(`Erron in putConversion, error: ${error}`);
        next(error);
    }
};

const deleteConversion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
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