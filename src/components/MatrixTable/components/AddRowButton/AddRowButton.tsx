import './AddRowButton.css';

export interface AddRowButtonProps {
  onAdd: () => void;
}

export const AddRowButton = ({ onAdd }: AddRowButtonProps) => {
  return (
    <div className="matrix-table-actions">
      <button
        className="btn-add-row"
        onClick={onAdd}
        title="Add a new row at the end"
      >
        ➕ Add Row
      </button>
    </div>
  );
};
