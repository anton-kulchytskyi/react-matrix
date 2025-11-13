import React from 'react';
import { useMatrix } from '@context/MatrixContext';
import './MatrixTable.css';

export const MatrixTable: React.FC = () => {
  const { matrix, params } = useMatrix();

  // If no matrix generated yet, show message
  if (matrix.length === 0) {
    return (
      <div className="matrix-table-empty">
        <p>Generate a matrix to see the data</p>
      </div>
    );
  }

  const numColumns = matrix[0]?.length || 0;

  return (
    <div className="matrix-table-container">
      <div className="matrix-table-info">
        <h3>
          Matrix {params.m}×{params.n}
        </h3>
        <span className="matrix-params">X = {params.x}</span>
      </div>

      <div className="matrix-table-wrapper">
        <table className="matrix-table">
          <thead>
            <tr>
              <th className="matrix-header-corner"></th>
              {Array.from({ length: numColumns }, (_, i) => (
                <th
                  key={`col-header-${i}`}
                  className="matrix-header-col"
                >
                  Col {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                <th className="matrix-header-row">Row {rowIndex + 1}</th>
                {row.map((cell) => (
                  <td
                    key={cell.id}
                    className="matrix-cell"
                  >
                    {cell.amount}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
