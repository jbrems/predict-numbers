import { MnistService } from './mnist/mnist.service';
import { getModel } from './model';

(async () => {
  const mnistService = new MnistService();
  await mnistService.init();

  const index = Math.floor(Math.random() * 65000);

  // console.log(`Saving image for index ${index}`);
  // const image = mnistService.getSingleImage(index);
  // await image.write(`mnist_image_${index}_${mnistService.getSingleLabel(index)}.png`);

  const model = getModel();

  const trainingBatch = mnistService.getTrainingBatch(65000);
  // const validationBatch = mnistService.getTrainingBatch(15000);

  console.log('Training model');
  await model.fit(trainingBatch.xs, trainingBatch.ys, {
    batchSize: 512,
    // validationData: [validationBatch.xs, validationBatch.ys],
    validationSplit: 0.2,
    epochs: 10,
    shuffle: true,
  });
  console.log('Training done');

  console.log('Saving model');
  await model.save('file:///devenv/mean/playground/predict-numbers/src/train/models/latest');

  console.log(`Generating tensor for index ${index}`);
  const tensor = mnistService.getSingleTensor(index);
  const prediction = model.predict(tensor.x.reshape([1, 28, 28, 1]));
  console.log(`Expectation: ${tensor.y.indexOf(1)}`);
  console.log(`PREDICTION: ${prediction.argMax(-1).arraySync()[0]}`);
})();
