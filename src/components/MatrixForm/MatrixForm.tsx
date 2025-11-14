import { useMatrix } from '@context/MatrixContext';
import { useMatrixForm } from './hooks/useMatrixForm';
import { FormInput } from './components';
import './MatrixForm.css';

export const MatrixForm = () => {
  const { generateNewMatrix } = useMatrix();
  const { params, updateParam, handleSubmit, error, maxXLimit } =
    useMatrixForm();

  const currentLimitX = `0-${maxXLimit}`;
  const isError = !!error;

  const buttonText = isError ? error : 'Generate Matrix';

  return (
    <form
      className="matrix-form"
      onSubmit={(e) => handleSubmit(e, generateNewMatrix)}
    >
      <h2>Matrix Parameters</h2>

      <FormInput
        id="m-input"
        label="M (rows):"
        value={params.m}
        onChange={(value) => updateParam('m', value)}
        hint="0-100"
        required
      />

      <FormInput
        id="n-input"
        label="N (columns):"
        value={params.n}
        onChange={(value) => updateParam('n', value)}
        hint="0-100"
        required
      />

      <FormInput
        id="x-input"
        label="X (nearest cells):"
        value={params.x}
        onChange={(value) => updateParam('x', value)}
        hint={currentLimitX}
        required
      />

      <button
        type="submit"
        className="generate-btn"
        disabled={isError}
      >
        {buttonText}
      </button>
    </form>
  );
};
