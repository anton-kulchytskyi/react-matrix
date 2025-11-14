import type { Cell, MatrixData } from '@/types/matrix.types';
import { generateUniqueId, generateRandomAmount } from './idGenerators';

/**
 * Generates a 2D matrix of size M×N filled with random cells.
 *
 * Each cell receives a unique ID and a random three-digit amount.
 *
 * @param m - Number of rows to generate.
 * @param n - Number of columns to generate.
 * @returns A newly created M×N matrix of Cell objects.
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
