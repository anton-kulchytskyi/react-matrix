import { useMemo } from 'react';
import { useMatrix } from '@context/MatrixContext';
import {
  calculateAllRowSums,
  calculateAllColumnPercentiles,
} from '@utils/matrixCalculations';
import { useMatrixActions, useMatrixHover, useMatrixPercentage } from './hooks';
import './MatrixTable.css';

export const MatrixTable = () => {
  const { matrix, params, increaseCellValue, removeRow, addRow } = useMatrix();

  // Calculate row sums and column percentiles
  const rowSums = useMemo(() => calculateAllRowSums(matrix), [matrix]);
  const columnPercentiles = useMemo(
    () => calculateAllColumnPercentiles(matrix),
    [matrix]
  );

  const {
    hoveredCellId,
    handleCellMouseEnter,
    handleCellMouseLeave,
    isCellNearest,
  } = useMatrixHover(matrix, params.x);

  const {
    hoveredSumRowIndex,
    handleSumMouseEnter,
    handleSumMouseLeave,
    getCellDisplayValue,
    getCellStyle,
  } = useMatrixPercentage(matrix, rowSums);

  const { canRemoveRows, handleCellClick, handleRemoveRow, handleAddRow } =
    useMatrixActions(matrix, increaseCellValue, removeRow, addRow);

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
        <span className="matrix-params">
          X = {params.x}
          {hoveredCellId !== null && (
            <span className="highlight-indicator">
              {' '}
              (highlighting {params.x} nearest)
            </span>
          )}
          {hoveredSumRowIndex !== null && (
            <span className="percentage-indicator"> (showing percentages)</span>
          )}
        </span>
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
              <th className="matrix-header-sum">Sum</th>
              <th className="matrix-header-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                <th className="matrix-header-row">Row {rowIndex + 1}</th>
                {row.map((cell, cellIndex) => {
                  const isNearest = isCellNearest(cell.id);
                  const isHovered = hoveredCellId === cell.id;
                  const showingPercentage = hoveredSumRowIndex === rowIndex;

                  return (
                    <td
                      key={cell.id}
                      className={`matrix-cell ${isNearest ? 'cell-nearest' : ''} ${isHovered ? 'cell-hovered' : ''} ${showingPercentage ? 'cell-percentage' : ''}`}
                      onClick={() => handleCellClick(cell.id)}
                      onMouseEnter={() => handleCellMouseEnter(cell.id)}
                      onMouseLeave={handleCellMouseLeave}
                      style={getCellStyle(rowIndex, cellIndex)}
                      title={
                        showingPercentage
                          ? `${cell.amount} (${getCellDisplayValue(rowIndex, cellIndex)})`
                          : 'Click to increase value'
                      }
                    >
                      {getCellDisplayValue(rowIndex, cellIndex)}
                    </td>
                  );
                })}
                <td
                  className={`matrix-sum-cell ${hoveredSumRowIndex === rowIndex ? 'sum-cell-hovered' : ''}`}
                  onMouseEnter={() => handleSumMouseEnter(rowIndex)}
                  onMouseLeave={handleSumMouseLeave}
                  title="Hover to show percentages and heatmap"
                >
                  {rowSums[rowIndex]}
                </td>
                <td className="matrix-actions-cell">
                  <button
                    className="btn-remove-row"
                    onClick={() => handleRemoveRow(rowIndex)}
                    disabled={!canRemoveRows}
                    title={
                      canRemoveRows
                        ? 'Remove this row'
                        : 'Cannot remove the last row'
                    }
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
            <tr className="matrix-percentile-row">
              <th className="matrix-header-row">60th percentile</th>
              {columnPercentiles.map((percentile, colIndex) => (
                <td
                  key={`percentile-${colIndex}`}
                  className="matrix-percentile-cell"
                >
                  {percentile.toFixed(2)}
                </td>
              ))}
              <td className="matrix-header-corner"></td>
              <td className="matrix-header-corner"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="matrix-table-actions">
        <button
          className="btn-add-row"
          onClick={handleAddRow}
          title="Add a new row at the end"
        >
          ➕ Add Row
        </button>
      </div>
    </div>
  );
};
