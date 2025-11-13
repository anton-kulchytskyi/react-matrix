import React, { useState } from 'react';
import { useMatrix } from '@context/MatrixContext';
import './MatrixForm.css';

export const MatrixForm: React.FC = () => {
  const { generateNewMatrix } = useMatrix();

  const [m, setM] = useState<string>('5');
  const [n, setN] = useState<string>('5');
  const [x, setX] = useState<string>('3');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mValue = parseInt(m, 10);
    const nValue = parseInt(n, 10);
    const xValue = parseInt(x, 10);

    // Validation
    if (isNaN(mValue) || isNaN(nValue) || isNaN(xValue)) {
      alert('Please enter valid numbers');
      return;
    }

    if (mValue < 0 || mValue > 100) {
      alert('M must be between 0 and 100');
      return;
    }

    if (nValue < 0 || nValue > 100) {
      alert('N must be between 0 and 100');
      return;
    }

    if (xValue < 0 || xValue > 100) {
      alert('X must be between 0 and 100');
      return;
    }

    generateNewMatrix(mValue, nValue, xValue);
  };

  return (
    <form
      className="matrix-form"
      onSubmit={handleSubmit}
    >
      <h2>Matrix Parameters</h2>

      <div className="form-group">
        <label htmlFor="m-input">
          M (rows):
          <span className="range-hint">0-100</span>
        </label>
        <input
          id="m-input"
          type="number"
          min="0"
          max="100"
          value={m}
          onChange={(e) => setM(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="n-input">
          N (columns):
          <span className="range-hint">0-100</span>
        </label>
        <input
          id="n-input"
          type="number"
          min="0"
          max="100"
          value={n}
          onChange={(e) => setN(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="x-input">
          X (nearest cells):
          <span className="range-hint">0-100</span>
        </label>
        <input
          id="x-input"
          type="number"
          min="0"
          max="100"
          value={x}
          onChange={(e) => setX(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="generate-btn"
      >
        Generate Matrix
      </button>
    </form>
  );
};
