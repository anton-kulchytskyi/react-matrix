import { describe, it, expect } from 'vitest';
import {
  mutateGenerateNewMatrix,
  mutateUpdateParams,
  mutateIncreaseCellValue,
  mutateRemoveRow,
  mutateAddRow,
} from '../matrixMutators';

const mockCell = (id: number, amount: number) => ({ id, amount });
const mockRow = (startId: number, values: number[]) =>
  values.map((v, i) => mockCell(startId + i, v));

describe('matrixMutators', () => {
  it('mutateGenerateNewMatrix creates correct matrix state', () => {
    const result = mutateGenerateNewMatrix(2, 3, 5);

    expect(result.matrix.length).toBe(2);
    expect(result.matrix[0].length).toBe(3);
    expect(result.params).toEqual({ m: 2, n: 3, x: 5 });
  });

  it('mutateUpdateParams updates only params when x changes', () => {
    const initial = {
      matrix: [mockRow(1, [10, 20])],
      params: { m: 1, n: 2, x: 1 },
    };

    const result = mutateUpdateParams(initial, { x: 5 });

    expect(result.params.x).toBe(5);
    expect(result.matrix).toBe(initial.matrix); // same matrix
  });

  it('mutateUpdateParams regenerates matrix when m or n changes', () => {
    const initial = {
      matrix: [mockRow(1, [10, 20])],
      params: { m: 1, n: 2, x: 1 },
    };

    const result = mutateUpdateParams(initial, { m: 3 });

    expect(result.params.m).toBe(3);
    expect(result.matrix.length).toBe(3);
    expect(result.matrix[0].length).toBe(2); // n remains unchanged
  });

  it('mutateIncreaseCellValue increments the correct cell', () => {
    const initial = {
      matrix: [mockRow(1, [10, 20])],
      params: { m: 1, n: 2, x: 1 },
    };

    const result = mutateIncreaseCellValue(initial, 1);

    expect(result.matrix[0][0].amount).toBe(11);
    expect(result.matrix[0][1].amount).toBe(20);
  });

  it('mutateRemoveRow removes a row and updates params.m', () => {
    const initial = {
      matrix: [mockRow(1, [10, 20]), mockRow(10, [30, 40])],
      params: { m: 2, n: 2, x: 1 },
    };

    const result = mutateRemoveRow(initial, 0);

    expect(result.matrix.length).toBe(1);
    expect(result.params.m).toBe(1);
  });

  it('mutateRemoveRow prevents removal when only one row', () => {
    const initial = {
      matrix: [mockRow(1, [10, 20])],
      params: { m: 1, n: 2, x: 1 },
    };

    const result = mutateRemoveRow(initial, 0);

    expect(result.matrix.length).toBe(1); // unchanged
    expect(result.params.m).toBe(1);
  });

  it('mutateAddRow adds a new row and increments m', () => {
    const initial = {
      matrix: [mockRow(1, [10, 20])],
      params: { m: 1, n: 2, x: 1 },
    };

    const result = mutateAddRow(initial);

    expect(result.matrix.length).toBe(2);
    expect(result.matrix[1].length).toBe(2); // same number of columns
    expect(result.params.m).toBe(2);
  });
});
