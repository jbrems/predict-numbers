import * as tf from '@tensorflow/tfjs-node';
import { MnistService } from './mnist/mnist.service';
import { getModel, saveModel } from './model';

(async () => {
  const model = getModel();

  const mnistService = new MnistService();
  await mnistService.init();

  const trainingBatch = mnistService.getTrainingBatch(64000);

  let accuracyLossCounter = 0;
  let highestAccuracy = 0;
  while (accuracyLossCounter < 5) {
    const { history } = await train(model, trainingBatch);
    if (history.acc[0] < highestAccuracy) accuracyLossCounter++;
    highestAccuracy = Math.max(history.acc[0], highestAccuracy);
    console.log(`Highest accuracy: ${highestAccuracy}, Accuracy loss: ${accuracyLossCounter}/5`);
  }

  trainingBatch.xs.dispose();
  trainingBatch.ys.dispose();

  await saveModel(model);
})();

async function train (model, trainingBatch) {
  console.log('Training model');

  const result = await model.fit(trainingBatch.xs, trainingBatch.ys, {
    batchSize: 512,
    validationSplit: 0.2,
    epochs: 1,
    shuffle: true,
  });
  console.log('Training done');

  return result;
}
