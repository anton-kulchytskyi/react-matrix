import { describe, it, expect } from 'vitest';
import { parseIntValue, isValidInteger, isInRange } from '../parseUtils';

describe('parseUtils', () => {
  it('parses integers correctly', () => {
    expect(parseIntValue('42')).toBe(42);
  });

  it('returns NaN for invalid input', () => {
    expect(parseIntValue('abc')).toBeNaN();
  });

  it('validates integers', () => {
    expect(isValidInteger(10)).toBe(true);
    expect(isValidInteger(NaN)).toBe(false);
  });

  it('checks range correctly', () => {
    expect(isInRange(5, 0, 10)).toBe(true);
    expect(isInRange(11, 0, 10)).toBe(false);
  });
});
