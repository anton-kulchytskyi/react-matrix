import type { Cell, MatrixData } from '../types/matrix.types';

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
