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
