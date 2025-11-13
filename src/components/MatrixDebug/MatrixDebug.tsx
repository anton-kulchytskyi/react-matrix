/* eslint-disable no-console */
/**
 * MatrixDebug Component
 *
 * Development utility component for debugging matrix generation.
 * Displays matrix parameters and logs detailed matrix data to browser console.
 *
 * Features:
 * - Shows matrix dimensions (M×N) and X parameter
 * - Logs full matrix structure to console
 * - Displays matrix data in table format for easy inspection
 * - Auto-updates when matrix regenerates
 *
 * Usage: Keep enabled during development, can be removed in production build
 */

import React, { useEffect } from 'react';
import { useMatrix } from '@context/MatrixContext';

export const MatrixDebug: React.FC = () => {
  const { matrix, params } = useMatrix();

  useEffect(() => {
    if (matrix.length > 0) {
      console.log('Generated Matrix:');
      console.log('Params:', params);
      console.log('Matrix Data:', matrix);
      console.table(matrix.map((row) => row.map((cell) => cell.amount)));
    }
  }, [matrix, params]);

  if (matrix.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        margin: '20px auto',
        maxWidth: '800px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
      }}
    >
      <h3>
        Generated Matrix {params.m}×{params.n} (X={params.x})
      </h3>
      <p>Open browser console (F12) to see details</p>
      <p>Total cells: {matrix.length * (matrix[0]?.length || 0)}</p>
    </div>
  );
};
