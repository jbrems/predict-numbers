import express from 'express';
import { predictNumber } from './predict.controller';

export function getPredictRoutes () {
  const router = express.Router();

  router.post('/', express.json(), predictNumber);

  return router;
}
