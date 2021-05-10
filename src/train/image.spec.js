import { describe, beforeEach, it, expect } from '@jest/globals';
import { Image } from './image';

describe('Image class', () => {
  let testImage;

  beforeEach(() => {
    testImage = new Image(Array(784).fill(0).map(() => Math.floor(Math.random() * 256)), 8);
  });

  describe('constructor', () => {
    it('stores the pixel data', () => {
      expect(testImage.data).toBeDefined();
      expect(testImage.data.length).toBe(784);
    });

    it('stores the label if passed', () => {
      expect(testImage.label).toBe(8);
      const image = new Image(Array(784));
      expect(image.label).toBeUndefined();
    });
  });

  describe('Get tensor', () => {
    it('Returns the image data as a 2D tensor of integers', () => {
      expect(testImage.tensor.constructor.name).toBe('Tensor');
      expect(testImage.tensor.rankType).toBe('2');
      expect(testImage.tensor.shape).toEqual([1, 784]);
      expect(testImage.tensor.dataSync() instanceof Int32Array).toBe(true);
      expect(Array.from(testImage.tensor.dataSync())).toEqual(testImage.data);
    });
  });

  describe('Get label distribution', () => {
    it('returns the label as a distribution for labels 0 through 9', () => {
      expect(testImage.labelDistribution).toEqual([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0]);
    });

    it('returns undefined if there is no label', () => {
      const image = new Image(Array(784).fill(0));
      expect(image.label).toBeUndefined();
    });
  });
});
