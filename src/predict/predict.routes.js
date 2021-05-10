import express from 'express';
import { predictNumber, saveAnswer } from './predict.controller';

export function getPredictRoutes () {
  const router = express.Router();

  router.post('/', express.json(), predictNumber);

  router.put('/answer', express.json(), saveAnswer);

  return router;
}
