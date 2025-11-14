import type { MatrixState, MatrixParams, Cell } from '../types/matrix.types';
import { generateMatrix } from './matrixGenerator';
import { generateUniqueId, generateRandomAmount } from './idGenerators';

export const mutateGenerateNewMatrix = (
  m: number,
  n: number,
  x: number
): MatrixState => {
  const newMatrix = generateMatrix(m, n);
  return { matrix: newMatrix, params: { m, n, x } };
};

export const mutateUpdateParams = (
  currentState: MatrixState,
  newParams: Partial<MatrixParams>
): MatrixState => {
  const updatedParams = { ...currentState.params, ...newParams };

  if (newParams.m !== undefined || newParams.n !== undefined) {
    const newMatrix = generateMatrix(updatedParams.m, updatedParams.n);
    return { matrix: newMatrix, params: updatedParams };
  }

  return { ...currentState, params: updatedParams };
};

export const mutateIncreaseCellValue = (
  currentState: MatrixState,
  cellId: number
): MatrixState => {
  const newMatrix = currentState.matrix.map((row) =>
    row.map((cell) =>
      cell.id === cellId ? { ...cell, amount: cell.amount + 1 } : cell
    )
  );
  return { ...currentState, matrix: newMatrix };
};

export const mutateRemoveRow = (
  currentState: MatrixState,
  rowIndex: number
): MatrixState => {
  if (currentState.matrix.length <= 1) {
    console.warn('Cannot remove the last row');
    return currentState;
  }

  const newMatrix = currentState.matrix.filter(
    (_, index) => index !== rowIndex
  );
  const newParams = { ...currentState.params, m: currentState.params.m - 1 };

  return { matrix: newMatrix, params: newParams };
};

export const mutateAddRow = (currentState: MatrixState): MatrixState => {
  if (currentState.matrix.length === 0) {
    console.warn('Cannot add row to empty matrix');
    return currentState;
  }

  const numColumns = currentState.params.n;

  const newRow: Cell[] = [];
  for (let col = 0; col < numColumns; col++) {
    newRow.push({
      id: generateUniqueId(),
      amount: generateRandomAmount(),
    });
  }

  const newMatrix = [...currentState.matrix, newRow];
  const newParams = { ...currentState.params, m: currentState.params.m + 1 };

  return { matrix: newMatrix, params: newParams };
};
