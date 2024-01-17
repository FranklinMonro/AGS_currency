import express from 'express';
import { getWeather } from './weather.controller';

class WeatherRouter {
  public router = express.Router();

  constructor() {
    this.router.get('', getWeather);
  }
}

export default new WeatherRouter().router;