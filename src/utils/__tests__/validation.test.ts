import { describe, it, expect } from 'vitest';
import { validateMatrixParams } from '../formValidation';

describe('validateMatrixParams', () => {
  it('rejects non-integer values', () => {
    const result = validateMatrixParams('x', '5', '3');
    expect(result.isValid).toBe(false);
  });

  it('validates valid M, N, X', () => {
    const result = validateMatrixParams('5', '5', '3');
    expect(result.isValid).toBe(true);
    expect(result.parsedValues).toEqual({ m: 5, n: 5, x: 3 });
  });

  it('rejects X > total cells', () => {
    const result = validateMatrixParams('2', '2', '10');
    expect(result.isValid).toBe(false);
  });
});
