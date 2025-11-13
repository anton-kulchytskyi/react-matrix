import React, { useState } from 'react';
import { useMatrix } from '@context/MatrixContext';
import './MatrixControls.css';

export const MatrixControls: React.FC = () => {
  const { params, updateParams, generateNewMatrix } = useMatrix();
  const [showFullForm, setShowFullForm] = useState(false);

  const [tempM, setTempM] = useState(params.m.toString());
  const [tempN, setTempN] = useState(params.n.toString());
  const [tempX, setTempX] = useState(params.x.toString());

  const handleQuickUpdate = (type: 'm' | 'n' | 'x', value: string) => {
    const numValue = parseInt(value, 10);

    if (isNaN(numValue) || numValue < 0 || numValue > 100) return;

    if (type === 'm') {
      setTempM(value);
      updateParams({ m: numValue });
    } else if (type === 'n') {
      setTempN(value);
      updateParams({ n: numValue });
    } else if (type === 'x') {
      setTempX(value);
      updateParams({ x: numValue });
    }
  };

  const handleGenerateNew = () => {
    setShowFullForm(true);
  };

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();

    const m = parseInt(tempM, 10);
    const n = parseInt(tempN, 10);
    const x = parseInt(tempX, 10);

    if (isNaN(m) || isNaN(n) || isNaN(x)) {
      alert('Please enter valid numbers');
      return;
    }

    if (m < 0 || m > 100 || n < 0 || n > 100 || x < 0 || x > 100) {
      alert('Values must be between 0 and 100');
      return;
    }

    generateNewMatrix(m, n, x);
    setShowFullForm(false);
  };

  if (showFullForm) {
    return (
      <div className="matrix-controls full-form">
        <h3>Generate New Matrix</h3>
        <form onSubmit={handleSubmitNew}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="m-full">M (Rows):</label>
              <input
                id="m-full"
                type="number"
                min="0"
                max="100"
                value={tempM}
                onChange={(e) => setTempM(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="n-full">N (Columns):</label>
              <input
                id="n-full"
                type="number"
                min="0"
                max="100"
                value={tempN}
                onChange={(e) => setTempN(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="x-full">X (Nearest):</label>
              <input
                id="x-full"
                type="number"
                min="0"
                max="100"
                value={tempX}
                onChange={(e) => setTempX(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
            >
              Generate
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowFullForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="matrix-controls compact">
      <div className="control-group">
        <label>M:</label>
        <input
          type="number"
          min="0"
          max="100"
          value={tempM}
          onChange={(e) => handleQuickUpdate('m', e.target.value)}
          className="control-input"
        />
      </div>

      <div className="control-group">
        <label>N:</label>
        <input
          type="number"
          min="0"
          max="100"
          value={tempN}
          onChange={(e) => handleQuickUpdate('n', e.target.value)}
          className="control-input"
        />
      </div>

      <div className="control-group">
        <label>X:</label>
        <input
          type="number"
          min="0"
          max="100"
          value={tempX}
          onChange={(e) => handleQuickUpdate('x', e.target.value)}
          className="control-input"
        />
      </div>

      <button
        className="btn-generate-new"
        onClick={handleGenerateNew}
      >
        Generate New Matrix
      </button>
    </div>
  );
};
