export const parseIntValue = (value: string): number => {
  return parseInt(value, 10);
};

export const isValidInteger = (value: number): boolean => {
  return !isNaN(value) && Number.isInteger(value);
};

export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};
