import type { Cell, MatrixData } from '@/types/matrix.types';

let currentId = 0;

/**
 * Generates a random three-digit number (100-999)
 */
const generateRandomAmount = (): number => {
  return Math.floor(Math.random() * 900) + 100;
};

/**
 * Generates a unique ID for each cell
 */
const generateUniqueId = (): number => {
  return currentId++;
};

/**
 * Generates a matrix M×N with random cell data
 * @param m - number of rows
 * @param n - number of columns
 * @returns MatrixData (2D array of cells)
 */
export const generateMatrix = (m: number, n: number): MatrixData => {
  const matrix: MatrixData = [];

  for (let row = 0; row < m; row++) {
    const rowData: Cell[] = [];

    for (let col = 0; col < n; col++) {
      const cell: Cell = {
        id: generateUniqueId(),
        amount: generateRandomAmount(),
      };
      rowData.push(cell);
    }

    matrix.push(rowData);
  }

  return matrix;
};

/**
 * Resets the ID counter (useful for testing)
 */
export const resetIdCounter = (): void => {
  currentId = 0;
};
