import express from 'express';
import { getconversionList, postConversion, putConversion, deleteConversion } from './conversions.controllers';

class ConversionsRouter {
  public router = express.Router();

  constructor() {
    this.router.get('/', getconversionList);

    this.router.post('/', postConversion);

    this.router.put('/', putConversion);

    this.router.delete('/', deleteConversion);

  }
}

export default new ConversionsRouter().router;