import tf from '@tensorflow/tfjs-node';

export class Image {
  /**
   * Creates a 28 by 28 pixel image from an array of grayscale pixel values with an optional label.
   * @param {number[]} data The array of grayscale pixel values (must contain 784 values)
   * @param {number} [label] The optional label of the image
   */
  constructor (data, label) {
    this.data = data;
    this.label = label;
  }

  /**
   *
   * @return {Tensor2D} The image data as a 2D tensor with shape 1 x 784
   */
  get tensor () {
    return tf.tensor2d(this.data, [1, 28 * 28], 'int32');
  }

  /**
   * @return {number[]} An array (of size 10) of numbers between 0.0 and 1.0 holding the distribution for labels 0 through 9
   */
  get labelDistribution () {
    if (!this.label) return undefined;

    const distributionArray = Array(10).fill(0.0);
    distributionArray[this.label] = 1.0;
    return distributionArray;
  }
}
