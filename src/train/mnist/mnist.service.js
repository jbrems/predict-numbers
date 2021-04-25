import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import Jimp from 'jimp';
import * as tf from '@tensorflow/tfjs-node';

export class MnistService {
  constructor () {
    this.imageCache = [];
    this.tensorCache = [];
  }

  async init () {
    console.log('Initializing Mnist data');
    const dir = dirname(fileURLToPath(import.meta.url));

    this.masterImage = await Jimp.read(join(dir, 'mnist_images.png'));

    const labelsBuffer = await fs.readFile(join(dir, 'mnist_labels_uint8'));
    this.labels = new Uint8Array(labelsBuffer);

    console.log('Initialization complete');
  }

  getSingleImage (index) {
    if (!this.imageCache[index]) {
      const image = this.masterImage.clone();
      image.crop(0, index, 28 * 28, 1);
      image.bitmap.height = 28;
      image.bitmap.width = 28;
      this.imageCache[index] = image;
    }

    return this.imageCache[index];
  }

  getSingleLabelDistribution (index) {
    return this.labels.slice(index * 10, (index + 1) * 10);
  }

  getSingleLabel (index) {
    return this.getSingleLabelDistribution(index).indexOf(1);
  }

  getSingleTensor (index) {
    if (!this.tensorCache[index]) {
      const image = this.masterImage.clone();
      image.crop(0, index, 28 * 28, 1);
      const redChannel = image.bitmap.data.filter((val , index) => index % 4 === 0).slice(0, 28 * 28);
      this.printRedChannel(redChannel);
      this.tensorCache[index] = tf.tensor2d(redChannel, [1, 28 * 28]);
    }

    return { x: this.tensorCache[index], y: this.getSingleLabelDistribution(index) };
  }

  getTrainingBatch (batchSize, offset = 0) {
    console.log(`Getting training batch ${offset} - ${offset + batchSize}`);

    const image = this.masterImage.clone();
    image.crop(0, offset, 28 * 28, batchSize);
    const redChannel = image.bitmap.data.filter((val , index) => index % 4 === 0).slice(0, 28 * 28 * batchSize);
    // this.printRedChannel(redChannel, batchSize);
    const images = tf.tensor2d(redChannel, [batchSize, 28 * 28]);
    const xs = images.reshape([batchSize, 28, 28, 1]);

    const labels = this.labels.slice(offset * 10, (offset + batchSize) * 10);
    const ys = tf.tensor2d(labels, [batchSize, 10]);

    return { xs, ys };
  }
}

export function printRedChannel (redChannel, batchSize = 1) {
  for (let nr = 0; nr < batchSize; nr++) {
    console.log('╔════════════════════════════════════════════════════════════════════════════════════╗');
    let logline = '';
    for (let i = nr * 28 * 28; i < (nr + 1) * 28 * 28; i++) {
      if (redChannel[i] === 0) logline += '   ';
      else if (redChannel[i] < 64) logline += '░░░';
      else if (redChannel[i] < 128) logline += '▒▒▒';
      else if (redChannel[i] < 172) logline += '▓▓▓';
      else logline += '███';

      if (logline.length === 28 * 3) {
        console.log('║' + logline + '║');
        logline = '';
      }
    }
    console.log('╚════════════════════════════════════════════════════════════════════════════════════╝');
  }
}
