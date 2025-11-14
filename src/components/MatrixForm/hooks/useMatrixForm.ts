import { useState, useMemo, useCallback } from 'react';
import { validateMatrixParams } from '@utils/formValidation';

import { parseIntValue } from '@/utils/parseUtils';

interface MatrixFormParams {
  m: string;
  n: string;
  x: string;
}

interface UseMatrixFormReturn {
  params: MatrixFormParams;
  updateParam: (key: keyof MatrixFormParams, value: string) => void;
  handleSubmit: (
    e: React.FormEvent,
    onSuccess: (m: number, n: number, x: number) => void
  ) => void;
  error: string | null;
  maxXLimit: number;
}

const DEFAULT_PARAMS: MatrixFormParams = {
  m: '5',
  n: '5',
  x: '3',
};

export const useMatrixForm = (): UseMatrixFormReturn => {
  const [params, setParams] = useState<MatrixFormParams>(DEFAULT_PARAMS);

  const validationResult = useMemo(() => {
    return validateMatrixParams(params.m, params.n, params.x);
  }, [params.m, params.n, params.x]);

  const error = validationResult.isValid
    ? null
    : validationResult.error || 'Please correct the errors before generating.';

  const maxXLimit = useMemo(() => {
    const m = parseIntValue(params.m);
    const n = parseIntValue(params.n);

    if (isNaN(m) || isNaN(n) || m < 0 || n < 0) {
      return 100;
    }

    const totalCells = m * n;

    return Math.min(totalCells, 100);
  }, [params.m, params.n]);

  const updateParam = (key: keyof MatrixFormParams, value: string) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = useCallback(
    (
      e: React.FormEvent,
      onSuccess: (m: number, n: number, x: number) => void
    ) => {
      e.preventDefault();

      if (!validationResult.isValid) {
        return;
      }

      const { m, n, x } = validationResult.parsedValues!;
      onSuccess(m, n, x);
    },
    [validationResult]
  );

  return {
    params,
    updateParam,
    handleSubmit,
    error,
    maxXLimit,
  };
};
