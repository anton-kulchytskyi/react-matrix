let currentId = 1000;

export const generateRandomAmount = (): number => {
  return Math.floor(Math.random() * 900) + 100;
};

export const generateUniqueId = (): number => {
  return currentId++;
};
