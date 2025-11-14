import { useState, useMemo } from 'react';
import type { MatrixData } from '@/types/matrix.types';
import { findNearestCells } from '@utils/findNearestCells';

interface UseMatrixHoverReturn {
  hoveredCellId: number | null;
  nearestCellIds: number[];
  handleCellMouseEnter: (cellId: number) => void;
  handleCellMouseLeave: () => void;
  isCellNearest: (cellId: number) => boolean;
}

/**
 * Manages hover logic for highlighting X nearest cells by value.
 *
 * Tracks:
 * - which cell is currently hovered
 * - calculates the nearest cells to the hovered one
 *
 * Provides:
 * - enter/leave handlers for cell hover
 * - helper to check if a cell belongs to the nearest list
 *
 * @param matrix - 2D matrix of cells.
 * @param x - Number of nearest cells to highlight.
 * @returns Hover state, nearest cell IDs, and interaction handlers.
 */
export const useMatrixHover = (
  matrix: MatrixData,
  x: number
): UseMatrixHoverReturn => {
  const [hoveredCellId, setHoveredCellId] = useState<number | null>(null);

  const nearestCellIds = useMemo(() => {
    if (hoveredCellId === null) {
      return [];
    }
    return findNearestCells(matrix, hoveredCellId, x);
  }, [matrix, hoveredCellId, x]);

  const handleCellMouseEnter = (cellId: number) => {
    setHoveredCellId(cellId);
  };

  const handleCellMouseLeave = () => {
    setHoveredCellId(null);
  };

  const isCellNearest = (cellId: number): boolean => {
    return nearestCellIds.includes(cellId);
  };

  return {
    hoveredCellId,
    nearestCellIds,
    handleCellMouseEnter,
    handleCellMouseLeave,
    isCellNearest,
  };
};
