import { Request, Response, NextFunction } from 'express';

import { cittiesLogger as log } from '../../server/winstonLog';
import axios from 'axios';

const getCities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const options = {
      method: 'GET',
      url: 'https://andruxnet-world-cities-v1.p.rapidapi.com/',
      params: {
        query: 'paris',
        searchby: 'city'
      },
      headers: {
        'X-RapidAPI-Key': '9dab233126mshb4192ee6a836697p1799f1jsn974963a92fe2',
        'X-RapidAPI-Host': 'andruxnet-world-cities-v1.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    res.status(200).send(response.data);
  } catch (error) {
    log.error(`Error retrieving response, error: ${error}`)
    next(error);
  }
};

export default getCities;