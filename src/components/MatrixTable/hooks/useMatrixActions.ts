import type { MatrixData } from '@/types/matrix.types';

interface UseMatrixActionsReturn {
  canRemoveRows: boolean;
  handleCellClick: (cellId: number) => void;
  handleRemoveRow: (rowIndex: number) => void;
  handleAddRow: () => void;
}

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
