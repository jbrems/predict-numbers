import * as tf from '@tensorflow/tfjs-node';
import { MnistService } from './mnist/mnist.service';
import { getModel, saveModel } from './model';

(async () => {
  const model = getModel();

  const mnistService = new MnistService();
  await mnistService.init();

  const trainingBatch = mnistService.getTrainingBatch(64000);
  await train(model, trainingBatch);

  trainingBatch.xs.dispose();
  trainingBatch.ys.dispose();

  await saveModel(model);
})();

async function train (model, trainingBatch) {
  console.log('Training model');

  await model.fit(trainingBatch.xs, trainingBatch.ys, {
    batchSize: 512,
    validationSplit: 0.2,
    epochs: 1,
    shuffle: true,
  });
  console.log('Training done');
}
