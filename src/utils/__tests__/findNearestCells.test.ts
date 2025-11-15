import { describe, it, expect } from 'vitest';
import { findNearestCells } from '../findNearestCells';

const createCell = (id: number, amount: number) => ({ id, amount });

describe('findNearestCells', () => {
  it('returns empty array if target cell not found', () => {
    const matrix = [[createCell(1, 100)]];
    const result = findNearestCells(matrix, 999, 3);
    expect(result).toEqual([]);
  });

  it('returns the X nearest cells by amount', () => {
    const matrix = [
      [createCell(1, 100), createCell(2, 110), createCell(3, 95)],
      [createCell(4, 103), createCell(5, 140), createCell(6, 101)],
    ];

    const result = findNearestCells(matrix, 1, 3);
    // nearest to 100 are: 101, 103, 95
    expect(result).toEqual([6, 4, 3]);
  });

  it('does not include the target cell itself', () => {
    const matrix = [[createCell(1, 100), createCell(2, 101)]];
    const result = findNearestCells(matrix, 1, 1);

    expect(result).not.toContain(1);
  });

  it('limits results to X cells', () => {
    const matrix = [
      [createCell(1, 100), createCell(2, 101), createCell(3, 102)],
      [createCell(4, 99), createCell(5, 98), createCell(6, 95)],
    ];

    const result = findNearestCells(matrix, 1, 2);
    expect(result.length).toBe(2);
  });
});
