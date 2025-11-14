import { useMemo } from 'react';
import { useMatrix } from '@context/MatrixContext';

import {
  TableInfo,
  TableHeader,
  TableRow,
  PercentileRow,
  AddRowButton,
} from './components';

import {
  calculateAllRowSums,
  calculateAllColumnPercentiles,
} from '@utils/matrixCalculations';

import { useMatrixActions, useMatrixHover, useMatrixPercentage } from './hooks';

import './MatrixTable.css';

export const MatrixTable = () => {
  const { matrix, params, increaseCellValue, removeRow, addRow } = useMatrix();

  // ---- Calculations ----
  const rowSums = useMemo(() => calculateAllRowSums(matrix), [matrix]);
  const columnPercentiles = useMemo(
    () => calculateAllColumnPercentiles(matrix),
    [matrix]
  );

  // ---- Hover logic (nearest cells) ----
  const hover = useMatrixHover(matrix, params.x);

  // ---- Percentages & heatmap ----
  const percentage = useMatrixPercentage(matrix, rowSums);

  // ---- Actions (clicks, row CRUD) ----
  const actions = useMatrixActions(
    matrix,
    increaseCellValue,
    removeRow,
    addRow
  );

  // ---- If empty matrix ----
  if (matrix.length === 0) {
    return (
      <div className="matrix-table-empty">
        <p>Generate a matrix to see the data</p>
      </div>
    );
  }

  const numColumns = matrix[0].length;

  return (
    <div className="matrix-table-container">
      <TableInfo
        params={params}
        hoveredCellId={hover.hoveredCellId}
        hoveredSumRowIndex={percentage.hoveredSumRowIndex}
      />

      <div className="matrix-table-wrapper">
        <table className="matrix-table">
          <TableHeader numColumns={numColumns} />
          <tbody>
            {matrix.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                row={row}
                rowIndex={rowIndex}
                rowSum={rowSums[rowIndex]}
                hoveredSumRowIndex={percentage.hoveredSumRowIndex}
                onSumEnter={percentage.handleSumMouseEnter}
                onSumLeave={percentage.handleSumMouseLeave}
                onRemove={actions.handleRemoveRow}
                canRemoveRows={actions.canRemoveRows}
                hover={hover}
                percentage={percentage}
                actions={actions}
              />
            ))}
            <PercentileRow percentiles={columnPercentiles} />
          </tbody>
        </table>
      </div>

      <AddRowButton onAdd={actions.handleAddRow} />
    </div>
  );
};
