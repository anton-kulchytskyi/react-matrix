import './TableHeader.css';

export interface TableHeaderProps {
  numColumns: number;
}

export const TableHeader = ({ numColumns }: TableHeaderProps) => {
  return (
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
  );
};
