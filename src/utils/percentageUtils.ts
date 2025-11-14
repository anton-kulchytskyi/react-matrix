import type { Cell } from '../types/matrix.types';

/**
 * Calculates percentage contribution of each cell in a row.
 *
 * @param row - Array of Cell objects.
 * @param rowSum - Total sum of the row.
 * @returns Array of percentages for each cell (0–100).
 */
export const calculateRowPercentages = (
  row: Cell[],
  rowSum: number
): number[] => {
  if (rowSum === 0) {
    return row.map(() => 0);
  }

  return row.map((cell) => (cell.amount / rowSum) * 100);
};

/**
 * Calculates heatmap intensity for each cell based on the max value in the row.
 *
 * @param row - Array of Cell objects.
 * @returns Array of intensity values (0–100) for heatmap shading.
 */
export const calculateRowHeatmap = (row: Cell[]): number[] => {
  const maxValue = Math.max(...row.map((cell) => cell.amount));

  if (maxValue === 0) {
    return row.map(() => 0);
  }

  return row.map((cell) => (cell.amount / maxValue) * 100);
};

/**
 * Generates a heatmap background color based on intensity.
 *
 * @param intensity - Value from 0 to 100.
 * @returns RGB color string representing heatmap level.
 */
export const getHeatmapColor = (intensity: number): string => {
  const start = { r: 227, g: 242, b: 253 };
  const end = { r: 25, g: 118, b: 210 };

  const ratio = Math.min(Math.max(intensity / 100, 0), 1);

  const interpolate = (a: number, b: number): number =>
    Math.round(a + (b - a) * ratio);

  const r = interpolate(start.r, end.r);
  const g = interpolate(start.g, end.g);
  const b = interpolate(start.b, end.b);

  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Determines appropriate text color depending on heatmap intensity.
 *
 * @param intensity - Value from 0 to 100.
 * @returns Text color for visibility against heatmap background.
 */
export const getHeatmapTextColor = (intensity: number): string => {
  return intensity > 50 ? '#ffffff' : '#333333';
};
