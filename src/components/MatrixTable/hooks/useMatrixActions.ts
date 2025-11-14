import type { MatrixData } from '@/types/matrix.types';

interface UseMatrixActionsReturn {
  canRemoveRows: boolean;
  handleCellClick: (cellId: number) => void;
  handleRemoveRow: (rowIndex: number) => void;
  handleAddRow: () => void;
}

/**
 * Provides matrix interaction actions such as:
 * - incrementing cell value
 * - removing a row (with safety check)
 * - adding a new row
 *
 * Also exposes a flag indicating whether row removal is allowed.
 *
 * @param matrix - Current 2D matrix data.
 * @param increaseCellValue - Callback to increment a cell.
 * @param removeRow - Callback to remove a row by index.
 * @param addRow - Callback to append a new row.
 * @returns Action handlers and removal availability flag.
 */
export const useMatrixActions = (
  matrix: MatrixData,
  increaseCellValue: (cellId: number) => void,
  removeRow: (rowIndex: number) => void,
  addRow: () => void
): UseMatrixActionsReturn => {
  const canRemoveRows = matrix.length > 1;

  const handleCellClick = (cellId: number) => {
    increaseCellValue(cellId);
  };

  const handleRemoveRow = (rowIndex: number) => {
    if (!canRemoveRows) {
      alert('Cannot remove the last row');
      return;
    }
    removeRow(rowIndex);
  };

  const handleAddRow = () => {
    addRow();
  };

  return {
    canRemoveRows,
    handleCellClick,
    handleRemoveRow,
    handleAddRow,
  };
};
