import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import '@testing-library/jest-dom';
// jest.setup.js
const { createCanvas } = require('canvas');

global.HTMLCanvasElement.prototype.getContext = function() {
  return createCanvas().getContext('2d');
};

expect.extend(matchers);

afterEach(() => {
  cleanup();
});