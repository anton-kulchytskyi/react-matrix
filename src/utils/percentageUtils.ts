import type { Cell } from '../types/matrix.types';

export const calculateRowPercentages = (
  row: Cell[],
  rowSum: number
): number[] => {
  if (rowSum === 0) {
    return row.map(() => 0);
  }

  return row.map((cell) => (cell.amount / rowSum) * 100);
};

export const calculateRowHeatmap = (row: Cell[]): number[] => {
  const maxValue = Math.max(...row.map((cell) => cell.amount));

  if (maxValue === 0) {
    return row.map(() => 0);
  }

  return row.map((cell) => (cell.amount / maxValue) * 100);
};

export const getHeatmapColor = (intensity: number): string => {
  const minColor = { r: 227, g: 242, b: 253 };
  const maxColor = { r: 25, g: 118, b: 210 };

  const ratio = intensity / 100;

  const r = Math.round(minColor.r + (maxColor.r - minColor.r) * ratio);
  const g = Math.round(minColor.g + (maxColor.g - minColor.g) * ratio);
  const b = Math.round(minColor.b + (maxColor.b - minColor.b) * ratio);

  return `rgb(${r}, ${g}, ${b})`;
};

export const getHeatmapTextColor = (intensity: number): string => {
  return intensity > 50 ? '#ffffff' : '#333333';
};
