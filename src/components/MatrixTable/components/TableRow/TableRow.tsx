import type { Cell } from '@/types/matrix.types';
// import { TableCell } from '../TableCell/TableCell';
import { TableCell } from '../TableCell/TableCell';
import './TableRow.css';

export interface TableRowProps {
  row: Cell[];
  rowIndex: number;
  rowSum: number;

  hoveredSumRowIndex: number | null;

  onSumEnter: (rowIndex: number) => void;
  onSumLeave: () => void;

  onRemove: (rowIndex: number) => void;
  canRemoveRows: boolean;

  hover: {
    hoveredCellId: number | null;
    handleCellMouseEnter: (cellId: number) => void;
    handleCellMouseLeave: () => void;
    isCellNearest: (cellId: number) => boolean;
  };

  percentage: {
    hoveredSumRowIndex: number | null;
    handleSumMouseEnter: (rowIndex: number) => void;
    handleSumMouseLeave: () => void;
    getCellDisplayValue: (
      rowIndex: number,
      cellIndex: number
    ) => string | number;
    getCellStyle: (rowIndex: number, cellIndex: number) => React.CSSProperties;
  };

  actions: {
    handleCellClick: (cellId: number) => void;
  };
}

export const TableRow = ({
  row,
  rowIndex,
  rowSum,
  hoveredSumRowIndex,
  onSumEnter,
  onSumLeave,
  onRemove,
  canRemoveRows,
  hover,
  percentage,
  actions,
}: TableRowProps) => {
  const { handleCellClick } = actions;
  const { handleCellMouseEnter, handleCellMouseLeave, isCellNearest } = hover;
  const { getCellDisplayValue, getCellStyle } = percentage;

  return (
    <tr>
      {/* Row label */}
      <th className="matrix-header-row">Row {rowIndex + 1}</th>

      {/* Cells */}
      {row.map((cell, cellIndex) => (
        <TableCell
          key={cell.id}
          cell={cell}
          rowIndex={rowIndex}
          cellIndex={cellIndex}
          isNearest={isCellNearest(cell.id)}
          isHovered={hover.hoveredCellId === cell.id}
          showingPercentage={hoveredSumRowIndex === rowIndex}
          displayValue={getCellDisplayValue(rowIndex, cellIndex)}
          style={getCellStyle(rowIndex, cellIndex)}
          onClick={() => handleCellClick(cell.id)}
          onEnter={() => handleCellMouseEnter(cell.id)}
          onLeave={handleCellMouseLeave}
        />
      ))}

      {/* SUM CELL */}
      <td
        className={`matrix-sum-cell ${
          hoveredSumRowIndex === rowIndex ? 'sum-cell-hovered' : ''
        }`}
        onMouseEnter={() => onSumEnter(rowIndex)}
        onMouseLeave={onSumLeave}
      >
        {rowSum}
      </td>

      {/* ACTIONS */}
      <td className="matrix-actions-cell">
        <button
          className="btn-remove-row"
          onClick={() => onRemove(rowIndex)}
          disabled={!canRemoveRows}
        >
          ❌
        </button>
      </td>
    </tr>
  );
};
