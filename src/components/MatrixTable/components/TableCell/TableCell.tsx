import type { Cell } from '@/types/matrix.types';
import './TableCell.css';

export interface TableCellProps {
  cell: Cell;
  rowIndex: number;
  cellIndex: number;

  isNearest: boolean;
  isHovered: boolean;
  showingPercentage: boolean;

  displayValue: string | number;
  style: React.CSSProperties;

  onClick: () => void;
  onEnter: () => void;
  onLeave: () => void;
}

export const TableCell = ({
  cell,
  // rowIndex,
  // cellIndex,
  isNearest,
  isHovered,
  showingPercentage,
  displayValue,
  style,
  onClick,
  onEnter,
  onLeave,
}: TableCellProps) => {
  return (
    <td
      className={`
        matrix-cell
        ${isNearest ? 'cell-nearest' : ''}
        ${isHovered ? 'cell-hovered' : ''}
        ${showingPercentage ? 'cell-percentage' : ''}
      `}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={style}
      title={
        showingPercentage
          ? `${cell.amount} (${displayValue})`
          : 'Click to increase value'
      }
    >
      {displayValue}
    </td>
  );
};
