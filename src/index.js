import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { getPredictRoutes } from './predict/predict.routes.js';

const app = express();

app.use('/', express.static(join(dirname(fileURLToPath(import.meta.url)), 'public')));
app.use('/predict', getPredictRoutes());

app.listen(3000, console.log('Server running on port 3000'));
