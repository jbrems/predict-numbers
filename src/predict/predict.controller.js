import { promises } from 'fs';
import * as tf from '@tensorflow/tfjs-node';
import { loadBestModel } from '../train/model.js';
import { printRedChannel } from '../train/mnist/mnist.service.js';

export async function predictNumber (req, res) {
  console.log(`Predicting number for pixels ${req.body}`);

  printRedChannel(req.body);

  const model = await loadBestModel();
  const tensor = tf.tensor2d(req.body, [28 * 28, 1]);
  const prediction = model.predict(tensor.reshape([1, 28, 28, 1]));

  res.json(prediction.arraySync()[0]);
}

export async function saveAnswer (req, res) {
  console.log(`Saving answer for number ${req.body.label}`);

  printRedChannel(req.body.image);

  const answersFileR = await promises.open('src/predict/answers.json', 'r');
  const content = await answersFileR.readFile();
  await answersFileR.close();

  const json = JSON.parse(content || []);
  json.push({ label: req.body.label, image: req.body.image });
  const answersFileW = await promises.open('src/predict/answers.json', 'w');
  await answersFileW.writeFile(JSON.stringify(json, null, 2));
  await answersFileW.close();

  res.sendStatus(201);
}
