/* eslint-disable @typescript-eslint/naming-convention */
import { randomUUID } from 'crypto';

import { Request, Response, NextFunction } from 'express';
import { SEQUILIZE_NEW } from '../../server/config';
import { initModels } from '../../models/init-models';

import { trailByCityLogger as log } from '../../server/winstonLog';
import { callWeatherApi } from '../weather/weather.controller';

const { weather_city } = initModels(SEQUILIZE_NEW);

const getWeatherByCity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const weatherByCityList = await weather_city.findAll({
      where: {
        active: true,
      },
      raw: true,
    }).catch((err) => {
      log.log('error', `Error in getting weather by city list, error: ${err}`);
      throw new Error('Error in getting weather by city list');
    });
    res.status(200).send(weatherByCityList);
  } catch (error) {
    log.error(`Error retrieving response, error: ${error}`)
    next(error);
  }
};

const postWeatherByCity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { city , main, description} = req.body;
    const weatherByCityPost = await weather_city.create({
      id: randomUUID(),
      city,
      main,
      description,
      date: new Date().toISOString(),
      active: true,
    }).catch((err) => {
      log.log('error', `Error in posting weather by city, error: ${err}`);
      throw new Error('Error in posting weather by city');
    });
    res.status(201).send(weatherByCityPost);
  } catch (error) {
    log.error(`Error retrieving response, error: ${error}`)
    next(error);
  }
};

const putWeatherByCity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id , city } = req.body;
    const response = await callWeatherApi(city!);
    const { main, description } = response;
    const updateWeather = await weather_city.update(
      {
        main,
        description,
        date: new Date().toISOString(),
      },
      {
        where: {
          id,
        },
      },
    ).catch((err) => {
      log.log('error', `Error in updating weather by city, error: ${err}`);
      throw new Error('Error in updating weather by city');
    });
    res.status(204).send(updateWeather);
  } catch (error) {
    log.error(`Error retrieving response, error: ${error}`)
    next(error);
  }
};

const deleteWeatherByCity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id  } = req.query;
    const weatherID: string = id as string;
    const deleteWeather = await weather_city.update(
      {
        active: false,
      },
      {
        where: {
          id: weatherID,
        },
      },
    ).catch((err) => {
      log.log('error', `Error in deleting weather by city, error: ${err}`);
      throw new Error('Error in deleting weather by city wordTypes');
    });
    res.status(204).send(deleteWeather);
  } catch (error) {
    log.error(`Error retrieving response, error: ${error}`)
    next(error);
  }
};

export {
  getWeatherByCity,
  postWeatherByCity,
  putWeatherByCity,
  deleteWeatherByCity
}