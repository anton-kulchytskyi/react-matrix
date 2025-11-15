import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MatrixProvider, useMatrix } from '../MatrixContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MatrixProvider>{children}</MatrixProvider>
);

describe('MatrixContext', () => {
  it('generates a new matrix and updates state correctly', () => {
    const { result } = renderHook(() => useMatrix(), { wrapper });

    act(() => {
      result.current.generateNewMatrix(2, 3, 1);
    });

    expect(result.current.matrix.length).toBe(2);
    expect(result.current.matrix[0].length).toBe(3);
    expect(result.current.params).toEqual({ m: 2, n: 3, x: 1 });
  });

  it('increments cell value', () => {
    const { result } = renderHook(() => useMatrix(), { wrapper });

    act(() => {
      result.current.generateNewMatrix(1, 1, 0);
    });

    const id = result.current.matrix[0][0].id;
    const before = result.current.matrix[0][0].amount;

    act(() => {
      result.current.increaseCellValue(id);
    });

    const after = result.current.matrix[0][0].amount;
    expect(after).toBe(before + 1);
  });

  it('adds and removes rows', () => {
    const { result } = renderHook(() => useMatrix(), { wrapper });

    act(() => {
      result.current.generateNewMatrix(2, 2, 0);
    });

    // add row
    act(() => {
      result.current.addRow();
    });

    expect(result.current.matrix.length).toBe(3);

    // remove row
    act(() => {
      result.current.removeRow(0);
    });

    expect(result.current.matrix.length).toBe(2);
  });
});
