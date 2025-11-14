import type { MatrixState, MatrixParams, Cell } from '../types/matrix.types';
import { generateMatrix } from './matrixGenerator';
import { generateUniqueId, generateRandomAmount } from './idGenerators';

/**
 * Creates a completely new matrix and updates the state with new M, N, and X values.
 *
 * @param m - Number of rows to generate.
 * @param n - Number of columns to generate.
 * @param x - Nearest-cells parameter.
 * @returns New matrix state with regenerated matrix and updated params.
 */
export const mutateGenerateNewMatrix = (
  m: number,
  n: number,
  x: number
): MatrixState => {
  const newMatrix = generateMatrix(m, n);
  return { matrix: newMatrix, params: { m, n, x } };
};

/**
 * Updates matrix parameters (M, N, X) and regenerates the matrix
 * only if M or N values change.
 *
 * @param currentState - Current full matrix state.
 * @param newParams - Partial set of parameters to update.
 * @returns Updated state with possibly regenerated matrix.
 */
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

/**
 * Increases the amount of a specific cell by 1.
 *
 * @param currentState - Current matrix state.
 * @param cellId - ID of the cell to increment.
 * @returns New matrix state with updated cell value.
 */
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

/**
 * Removes a row at the specified index and decrements M.
 *
 * Prevents removal if only one row remains.
 *
 * @param currentState - Current matrix state.
 * @param rowIndex - Index of the row to remove.
 * @returns Updated matrix state with the row removed.
 */
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

/**
 * Adds a new row at the bottom of the matrix and increments M.
 *
 * @param currentState - Current matrix state.
 * @returns Updated matrix state with the new generated row.
 */
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
