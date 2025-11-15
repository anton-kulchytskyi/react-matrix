import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMatrixHover } from '../useMatrixHover';
import type { MatrixData } from '@/types/matrix.types';

const cell = (id: number, amount: number) => ({ id, amount });
const makeMatrix = (): MatrixData => [
  [cell(1, 100), cell(2, 110), cell(3, 95)],
  [cell(4, 103), cell(5, 140), cell(6, 101)],
];

describe('useMatrixHover', () => {
  it('initially has no hovered cell', () => {
    const matrix = makeMatrix();

    const { result } = renderHook(() => useMatrixHover(matrix, 2));

    expect(result.current.hoveredCellId).toBeNull();
    expect(result.current.nearestCellIds).toEqual([]);
  });

  it('sets hoveredCellId on mouse enter', () => {
    const matrix = makeMatrix();

    const { result } = renderHook(() => useMatrixHover(matrix, 2));

    act(() => {
      result.current.handleCellMouseEnter(1);
    });

    expect(result.current.hoveredCellId).toBe(1);
  });

  it('clears hoveredCellId on mouse leave', () => {
    const matrix = makeMatrix();

    const { result } = renderHook(() => useMatrixHover(matrix, 2));

    act(() => {
      result.current.handleCellMouseEnter(1);
      result.current.handleCellMouseLeave();
    });

    expect(result.current.hoveredCellId).toBeNull();
    expect(result.current.nearestCellIds).toEqual([]);
  });

  it('marks nearest cells correctly when hovering a cell', () => {
    const matrix = makeMatrix();

    const { result } = renderHook(() => useMatrixHover(matrix, 3));

    act(() => {
      result.current.handleCellMouseEnter(1);
    });

    expect(result.current.nearestCellIds.length).toBe(3);
    // перевіримо, що isCellNearest працює коректно
    const someNearestId = result.current.nearestCellIds[0];
    expect(result.current.isCellNearest(someNearestId)).toBe(true);
  });
});
