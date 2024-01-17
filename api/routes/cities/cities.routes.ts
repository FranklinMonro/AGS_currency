import express from 'express';
import getCities from './cities.controller';


class CitiesRouter {
  public router = express.Router();

  constructor() {
    this.router.get('', getCities);
  }
}

export default new CitiesRouter().router;