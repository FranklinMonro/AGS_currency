import express from 'express';
import { 
  getWeatherByCity, 
  postWeatherByCity,
  putWeatherByCity,
  deleteWeatherByCity
} from './weatherByCity.controller';

class WeatherByCityRouter {
  public router = express.Router();

  constructor() {
    this.router.get('', getWeatherByCity);

    this.router.post('', postWeatherByCity);

    this.router.put('', putWeatherByCity);

    this.router.delete('', deleteWeatherByCity);
  }
}

export default new WeatherByCityRouter().router;
