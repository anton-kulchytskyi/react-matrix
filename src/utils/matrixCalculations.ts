import type { Cell, MatrixData } from '../types/matrix.types';

export const calculateRowSum = (row: Cell[]): number => {
  return row.reduce((sum, cell) => sum + cell.amount, 0);
};

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

export const calculateAllRowSums = (matrix: MatrixData): number[] => {
  return matrix.map((row) => calculateRowSum(row));
};

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
