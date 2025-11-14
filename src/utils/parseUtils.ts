/**
 * Safely parses a string into an integer using base 10.
 *
 * @param value - String to parse.
 * @returns Parsed integer or NaN if invalid.
 */
export const parseIntValue = (value: string): number => {
  return parseInt(value, 10);
};

/**
 * Checks whether a number is a valid integer (not NaN and whole number).
 *
 * @param value - Number to validate.
 * @returns True if the value is a valid integer.
 */
export const isValidInteger = (value: number): boolean => {
  return !isNaN(value) && Number.isInteger(value);
};

/**
 * Determines whether a number falls within an inclusive range.
 *
 * @param value - Number to check.
 * @param min - Lower boundary (inclusive).
 * @param max - Upper boundary (inclusive).
 * @returns True if value is between min and max.
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};
