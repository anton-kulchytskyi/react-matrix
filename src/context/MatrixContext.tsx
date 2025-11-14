import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import type { ReactNode } from 'react';
import type {
  MatrixData,
  MatrixParams,
  MatrixState,
} from '../types/matrix.types';

import {
  mutateGenerateNewMatrix,
  mutateUpdateParams,
  mutateIncreaseCellValue,
  mutateRemoveRow,
  mutateAddRow,
} from '../utils/matrixMutators';

interface MatrixContextType {
  matrix: MatrixData;
  params: MatrixParams;
  generateNewMatrix: (m: number, n: number, x: number) => void;
  updateParams: (newParams: Partial<MatrixParams>) => void;
  increaseCellValue: (cellId: number) => void;
  removeRow: (rowIndex: number) => void;
  addRow: () => void;
}

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

interface MatrixProviderProps {
  children: ReactNode;
}

const initialState: MatrixState = {
  matrix: [],
  params: { m: 0, n: 0, x: 0 },
};

export const MatrixProvider: React.FC<MatrixProviderProps> = ({ children }) => {
  const [state, setState] = useState<MatrixState>(initialState);

  const generateNewMatrix = useCallback((m: number, n: number, x: number) => {
    const newState = mutateGenerateNewMatrix(m, n, x);
    setState(newState);
  }, []);

  const updateParams = useCallback((newParams: Partial<MatrixParams>) => {
    setState((prevState) => mutateUpdateParams(prevState, newParams));
  }, []);

  const increaseCellValue = useCallback((cellId: number) => {
    setState((prevState) => mutateIncreaseCellValue(prevState, cellId));
  }, []);

  const removeRow = useCallback((rowIndex: number) => {
    setState((prevState) => mutateRemoveRow(prevState, rowIndex));
  }, []);

  const addRow = useCallback(() => {
    setState((prevState) => mutateAddRow(prevState));
  }, []);

  const contextValue = useMemo(
    () => ({
      matrix: state.matrix,
      params: state.params,
      generateNewMatrix,
      updateParams,
      increaseCellValue,
      removeRow,
      addRow,
    }),
    [
      state.matrix,
      state.params,
      generateNewMatrix,
      updateParams,
      increaseCellValue,
      removeRow,
      addRow,
    ]
  );

  return (
    <MatrixContext.Provider value={contextValue}>
      {children}
    </MatrixContext.Provider>
  );
};
/**
 * Accesses the global matrix state and actions.
 *
 * Provides:
 * - current matrix data
 * - matrix parameters (M, N, X)
 * - actions for generating, updating, and mutating the matrix
 *
 * @throws Error if used outside of MatrixProvider.
 */

// eslint-disable-next-line react-refresh/only-export-components
export const useMatrix = (): MatrixContextType => {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error('useMatrix must be used within a MatrixProvider');
  }
  return context;
};
