import { MnistService } from '../train/mnist/mnist.service';
import { loadBestModel } from '../train/model';

(async () => {
  const model = await loadBestModel();

  const mnistSerive = new MnistService();
  await mnistSerive.init();

  const randomUntrainedIndex = Math.floor(Math.random() * 1000) + 64000;
  const tensor = mnistSerive.getSingleTensor(randomUntrainedIndex);

  const prediction = model.predict(tensor.x.reshape([1, 28, 28, 1]));
  console.log(`Expectation: ${tensor.y.indexOf(1)}`);
  console.log(`PREDICTION: ${prediction.argMax(-1).arraySync()[0]} (${prediction.arraySync()[0].map(n => n.toFixed(2))})`);
})();
