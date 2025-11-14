import type { Cell, MatrixData } from '@/types/matrix.types';
import { generateUniqueId, generateRandomAmount } from './idGenerators';

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
