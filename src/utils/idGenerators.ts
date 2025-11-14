let currentId = 1000;

/**
 * Generates a random three-digit integer (100–999).
 *
 * @returns Random integer between 100 and 999.
 */
export const generateRandomAmount = (): number => {
  return Math.floor(Math.random() * 900) + 100;
};

/**
 * Generates a unique incremental ID.
 *
 * @returns Sequential unique number starting from 1000.
 */
export const generateUniqueId = (): number => {
  return currentId++;
};
