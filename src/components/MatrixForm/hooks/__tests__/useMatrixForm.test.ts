import { describe, it, expect, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useMatrixForm } from '../useMatrixForm';

describe('useMatrixForm', () => {
  it('initializes with default params', () => {
    const { result } = renderHook(() => useMatrixForm());

    expect(result.current.params.m).toBe('5');
    expect(result.current.params.n).toBe('5');
    expect(result.current.params.x).toBe('3');
  });

  it('updates params via updateParam', () => {
    const { result } = renderHook(() => useMatrixForm());

    act(() => {
      result.current.updateParam('m', '10');
    });

    expect(result.current.params.m).toBe('10');
  });

  it('sets error when validation fails', () => {
    const { result } = renderHook(() => useMatrixForm());

    act(() => {
      result.current.updateParam('m', 'abc');
    });

    expect(result.current.error).not.toBeNull();
  });

  it('calls onSuccess with parsed values on valid submit', () => {
    const { result } = renderHook(() => useMatrixForm());
    const onSuccess = vi.fn();

    act(() => {
      const event = { preventDefault: () => {} } as React.FormEvent;
      result.current.handleSubmit(event, onSuccess);
    });

    expect(onSuccess).toHaveBeenCalledWith(5, 5, 3);
  });

  it('does not call onSuccess when validation fails', async () => {
    const { result } = renderHook(() => useMatrixForm());
    const onSuccess = vi.fn();

    act(() => {
      result.current.updateParam('m', 'abc');
    });

    // чекаємо поки useMemo перерахує validationResult
    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });

    act(() => {
      const event = { preventDefault: () => {} } as React.FormEvent;
      result.current.handleSubmit(event, onSuccess);
    });

    expect(onSuccess).not.toHaveBeenCalled();
  });
});
