import type { ValidationResult } from '@/types/matrix.types';
import { parseIntValue, isValidInteger, isInRange } from './parseUtils';

export function getParsedParams(mStr: string, nStr: string, xStr: string) {
  return {
    m: parseInt(mStr) || 0,
    n: parseInt(nStr) || 0,
    x: parseInt(xStr) || 0,
  };
}

const MIN_MNX = 0;
const MAX_MN = 100;

const validateSingleParam = (
  strValue: string,
  paramName: 'M' | 'N' | 'X',
  maxLimit: number
): { value: number; result: ValidationResult } => {
  const value = parseIntValue(strValue);

  if (!isValidInteger(value)) {
    return {
      value: NaN,
      result: {
        isValid: false,
        error: `Please enter a valid integer for ${paramName}.`,
      },
    };
  }

  if (!isInRange(value, MIN_MNX, maxLimit)) {
    return {
      value: value,
      result: {
        isValid: false,
        error: `${paramName} must be between ${MIN_MNX} and ${maxLimit}.`,
      },
    };
  }

  return { value: value, result: { isValid: true } };
};

export const validateMatrixParams = (
  m: string,
  n: string,
  x: string
): ValidationResult => {
  const mCheck = validateSingleParam(m, 'M', MAX_MN);
  if (!mCheck.result.isValid) return mCheck.result;
  const mValue = mCheck.value;

  const nCheck = validateSingleParam(n, 'N', MAX_MN);
  if (!nCheck.result.isValid) return nCheck.result;
  const nValue = nCheck.value;

  const totalCells = mValue * nValue;
  const maxLimitX = Math.min(totalCells, MAX_MN);

  const xCheck = validateSingleParam(x, 'X', maxLimitX);

  if (!xCheck.result.isValid) {
    if (xCheck.result.error?.includes('between') && totalCells > 0) {
      return {
        isValid: false,
        error: `X must be between ${MIN_MNX} and ${maxLimitX} (total cells: ${totalCells}).`,
      };
    }
    return xCheck.result;
  }
  const xValue = xCheck.value;

  return {
    isValid: true,
    parsedValues: { m: mValue, n: nValue, x: xValue },
  };
};
