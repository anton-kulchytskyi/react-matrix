import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMatrixActions } from '../useMatrixActions';
import type { MatrixData } from '@/types/matrix.types';

const cell = (id: number, amount: number) => ({ id, amount });

describe('useMatrixActions', () => {
  it('exposes canRemoveRows = false when only one row', () => {
    const matrix: MatrixData = [[cell(1, 10), cell(2, 20)]];
    const { result } = renderHook(() =>
      useMatrixActions(matrix, vi.fn(), vi.fn(), vi.fn())
    );

    expect(result.current.canRemoveRows).toBe(false);
  });

  it('calls increaseCellValue on handleCellClick', () => {
    const matrix: MatrixData = [[cell(1, 10)]];
    const increaseCellValue = vi.fn();

    const { result } = renderHook(() =>
      useMatrixActions(matrix, increaseCellValue, vi.fn(), vi.fn())
    );

    act(() => {
      result.current.handleCellClick(1);
    });

    expect(increaseCellValue).toHaveBeenCalledWith(1);
  });

  it('prevents removing last row and shows alert', () => {
    const matrix: MatrixData = [[cell(1, 10)]];
    const removeRow = vi.fn();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const { result } = renderHook(() =>
      useMatrixActions(matrix, vi.fn(), removeRow, vi.fn())
    );

    act(() => {
      result.current.handleRemoveRow(0);
    });

    expect(removeRow).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  it('removes row when allowed', () => {
    const matrix: MatrixData = [[cell(1, 10)], [cell(2, 20)]];
    const removeRow = vi.fn();

    const { result } = renderHook(() =>
      useMatrixActions(matrix, vi.fn(), removeRow, vi.fn())
    );

    act(() => {
      result.current.handleRemoveRow(1);
    });

    expect(removeRow).toHaveBeenCalledWith(1);
  });

  it('calls addRow on handleAddRow', () => {
    const matrix: MatrixData = [[cell(1, 10)]];
    const addRow = vi.fn();

    const { result } = renderHook(() =>
      useMatrixActions(matrix, vi.fn(), vi.fn(), addRow)
    );

    act(() => {
      result.current.handleAddRow();
    });

    expect(addRow).toHaveBeenCalled();
  });
});
