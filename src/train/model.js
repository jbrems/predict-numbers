import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as tf from '@tensorflow/tfjs-node';

export function getModel () {
  const model = tf.sequential();

  const convolution_1 = tf.layers.conv2d({
    inputShape: [28, 28, 1],
    filters: 8,
    kernelSize: 5,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling',
  });

  const maxPooling_1 = tf.layers.maxPooling2d({
    poolSize: 2,
    strides: 2,
  });

  const convolution_2 = tf.layers.conv2d({
    filters: 16,
    kernelSize: 5,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling',
  });

  const maxPooling_2 = tf.layers.maxPooling2d({
    poolSize: 2,
    strides: 2,
  });

  const dense = tf.layers.dense({
    units: 10,
    activation: 'softmax',
    kernelInitializer: 'varianceScaling',
  });

  model.add(convolution_1);
  model.add(maxPooling_1);
  model.add(convolution_2);
  model.add(maxPooling_2);
  model.add(tf.layers.flatten());
  model.add(dense);

  model.compile({
    optimizer: tf.train.adam(),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
}

export async function saveModel (model) {
  console.log('Saving model');
  const location = join(dirname(fileURLToPath(import.meta.url)), 'models', 'latest').replace('C:\\', 'file:\\\\\\').replace(/\\/g, '/');
  console.log(`Saving model to ${location}`);
  return model.save(location);
}

export async function loadBestModel () {
  const location = join(dirname(fileURLToPath(import.meta.url)), 'models', 'best', 'model.json').replace('C:\\', 'file:\\\\\\').replace(/\\/g, '/');
  return tf.loadLayersModel(location);
}
