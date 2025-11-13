import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { MatrixData, MatrixParams } from '../types/matrix.types';
import { generateMatrix } from '@utils/matrixGenerator';

interface MatrixContextType {
  matrix: MatrixData;
  params: MatrixParams;
  generateNewMatrix: (m: number, n: number, x: number) => void;
  updateParams: (newParams: Partial<MatrixParams>) => void;
}

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

interface MatrixProviderProps {
  children: ReactNode;
}

export const MatrixProvider: React.FC<MatrixProviderProps> = ({ children }) => {
  const [matrix, setMatrix] = useState<MatrixData>([]);
  const [params, setParams] = useState<MatrixParams>({
    m: 0,
    n: 0,
    x: 0,
  });

  const generateNewMatrix = (m: number, n: number, x: number) => {
    const newMatrix = generateMatrix(m, n);
    setMatrix(newMatrix);
    setParams({ m, n, x });
  };

  const updateParams = (newParams: Partial<MatrixParams>) => {
    const updatedParams = { ...params, ...newParams };

    // If M or N changed, regenerate matrix
    if (newParams.m !== undefined || newParams.n !== undefined) {
      const newMatrix = generateMatrix(updatedParams.m, updatedParams.n);
      setMatrix(newMatrix);
    }

    setParams(updatedParams);
  };

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        params,
        generateNewMatrix,
        updateParams,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMatrix = (): MatrixContextType => {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error('useMatrix must be used within a MatrixProvider');
  }
  return context;
};
