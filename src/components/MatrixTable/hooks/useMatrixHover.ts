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
