import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMatrixPercentage } from '../useMatrixPercentage';
import type { MatrixData } from '@/types/matrix.types';

const cell = (id: number, amount: number) => ({ id, amount });

const matrix: MatrixData = [
  [cell(1, 50), cell(2, 50)],
  [cell(3, 10), cell(4, 30)],
];

const rowSums = [100, 40];

describe('useMatrixPercentage', () => {
  it('has no hovered sum row initially', () => {
    const { result } = renderHook(() => useMatrixPercentage(matrix, rowSums));

    expect(result.current.hoveredSumRowIndex).toBeNull();
  });

  it('sets hoveredSumRowIndex on mouse enter', () => {
    const { result } = renderHook(() => useMatrixPercentage(matrix, rowSums));

    act(() => {
      result.current.handleSumMouseEnter(0);
    });

    expect(result.current.hoveredSumRowIndex).toBe(0);
  });

  it('clears hoveredSumRowIndex on mouse leave', () => {
    const { result } = renderHook(() => useMatrixPercentage(matrix, rowSums));

    act(() => {
      result.current.handleSumMouseEnter(0);
      result.current.handleSumMouseLeave();
    });

    expect(result.current.hoveredSumRowIndex).toBeNull();
  });

  it('returns percentage display when row is hovered', () => {
    const { result } = renderHook(() => useMatrixPercentage(matrix, rowSums));

    act(() => {
      result.current.handleSumMouseEnter(0);
    });

    const value = result.current.getCellDisplayValue(0, 0);
    expect(value).toBe('50%');
  });

  it('returns original value when row is not hovered', () => {
    const { result } = renderHook(() => useMatrixPercentage(matrix, rowSums));

    const value = result.current.getCellDisplayValue(0, 0);
    expect(value).toBe('50');
  });

  it('returns style with background when row is hovered', () => {
    const { result } = renderHook(() => useMatrixPercentage(matrix, rowSums));

    act(() => {
      result.current.handleSumMouseEnter(0);
    });

    const style = result.current.getCellStyle(0, 0);
    expect(style.backgroundColor).toBeDefined();
  });
});
