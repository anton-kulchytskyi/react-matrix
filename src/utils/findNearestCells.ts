import type { Cell, MatrixData } from '../types/matrix.types';

/**
 * Finds X cells whose values are closest to the target cell's value.
 *
 * @param matrix - 2D matrix of cells.
 * @param targetCellId - ID of the cell used as the reference point.
 * @param x - Number of nearest cells to return.
 * @returns Array of cell IDs sorted by closeness to the target.
 */
export const findNearestCells = (
  matrix: MatrixData,
  targetCellId: number,
  x: number
): number[] => {
  const allCells: Cell[] = matrix.flat();

  const targetCell = allCells.find((cell) => cell.id === targetCellId);

  if (!targetCell) {
    return [];
  }

  const cellsWithDistance = allCells
    .filter((cell) => cell.id !== targetCellId)
    .map((cell) => ({
      id: cell.id,
      distance: Math.abs(cell.amount - targetCell.amount),
    }));

  const nearestCells = cellsWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, x)
    .map((item) => item.id);

  return nearestCells;
};
