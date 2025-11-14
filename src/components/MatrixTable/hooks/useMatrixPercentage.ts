import { useState } from 'react';
import type { MatrixData } from '@/types/matrix.types';
import {
  calculateRowPercentages,
  calculateRowHeatmap,
  getHeatmapColor,
  getHeatmapTextColor,
} from '@utils/percentageUtils';

interface UseMatrixPercentageReturn {
  hoveredSumRowIndex: number | null;
  handleSumMouseEnter: (rowIndex: number) => void;
  handleSumMouseLeave: () => void;
  getCellDisplayValue: (rowIndex: number, cellIndex: number) => string;
  getCellStyle: (rowIndex: number, cellIndex: number) => React.CSSProperties;
}

/**
 * Handles percentage view and heatmap styling when hovering over a row's sum cell.
 *
 * Provides:
 * - tracking of which row is currently hovered
 * - percentage display for each cell in the hovered row
 * - heatmap-based background/text color styling
 *
 * @param matrix - 2D matrix data.
 * @param rowSums - Precomputed sums for each row.
 * @returns Handlers and helpers for percentage mode and heatmap styling.
 */
export const useMatrixPercentage = (
  matrix: MatrixData,
  rowSums: number[]
): UseMatrixPercentageReturn => {
  const [hoveredSumRowIndex, setHoveredSumRowIndex] = useState<number | null>(
    null
  );

  const handleSumMouseEnter = (rowIndex: number) => {
    setHoveredSumRowIndex(rowIndex);
  };

  const handleSumMouseLeave = () => {
    setHoveredSumRowIndex(null);
  };

  const getCellDisplayValue = (rowIndex: number, cellIndex: number): string => {
    if (hoveredSumRowIndex === rowIndex) {
      const row = matrix[rowIndex];
      const rowSum = rowSums[rowIndex];
      const percentages = calculateRowPercentages(row, rowSum);
      return `${percentages[cellIndex].toFixed(0)}%`;
    }
    return matrix[rowIndex][cellIndex].amount.toString();
  };

  const getCellStyle = (
    rowIndex: number,
    cellIndex: number
  ): React.CSSProperties => {
    if (hoveredSumRowIndex === rowIndex) {
      const row = matrix[rowIndex];
      const heatmapIntensities = calculateRowHeatmap(row);
      const intensity = heatmapIntensities[cellIndex];

      return {
        backgroundColor: getHeatmapColor(intensity),
        color: getHeatmapTextColor(intensity),
        fontWeight: 600,
      };
    }
    return {};
  };

  return {
    hoveredSumRowIndex,
    handleSumMouseEnter,
    handleSumMouseLeave,
    getCellDisplayValue,
    getCellStyle,
  };
};
