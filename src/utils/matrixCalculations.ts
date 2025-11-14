import type { Cell, MatrixData } from '../types/matrix.types';

/**
 * Calculates the total sum of a single row.
 *
 * @param row - Array of Cell objects.
 * @returns Sum of all cell amounts in the row.
 */
export const calculateRowSum = (row: Cell[]): number => {
  return row.reduce((sum, cell) => sum + cell.amount, 0);
};

/**
 * Calculates the 60th percentile value for a specific column in the matrix.
 *
 * Uses linear interpolation when the percentile position is not an integer index.
 *
 * @param matrix - 2D matrix of cells.
 * @param columnIndex - Index of the column to calculate the percentile for.
 * @returns The 60th percentile value of the column.
 */
export const calculateColumnPercentile = (
  matrix: MatrixData,
  columnIndex: number
): number => {
  const columnValues = matrix.map((row) => row[columnIndex].amount);
  const sortedValues = [...columnValues].sort((a, b) => a - b);
  const position = (60 / 100) * (sortedValues.length - 1);

  if (Number.isInteger(position)) {
    return sortedValues[position];
  }

  const lowerIndex = Math.floor(position);
  const upperIndex = Math.ceil(position);
  const fraction = position - lowerIndex;

  const lowerValue = sortedValues[lowerIndex];
  const upperValue = sortedValues[upperIndex];

  return lowerValue + fraction * (upperValue - lowerValue);
};

/**
 * Calculates the sum for every row in the matrix.
 *
 * @param matrix - 2D matrix of cells.
 * @returns Array of row sums in order.
 */
export const calculateAllRowSums = (matrix: MatrixData): number[] => {
  return matrix.map((row) => calculateRowSum(row));
};

/**
 * Calculates the 60th percentile for each column in the matrix.
 *
 * @param matrix - 2D matrix of cells.
 * @returns Array of percentile values for all columns.
 */
export const calculateAllColumnPercentiles = (matrix: MatrixData): number[] => {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return [];
  }

  const numColumns = matrix[0].length;
  const percentiles: number[] = [];

  for (let colIndex = 0; colIndex < numColumns; colIndex++) {
    percentiles.push(calculateColumnPercentile(matrix, colIndex));
  }

  return percentiles;
};
