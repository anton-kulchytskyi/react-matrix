import './TableInfo.css';

export interface TableInfoProps {
  params: {
    m: number;
    n: number;
    x: number;
  };
  hoveredCellId: number | null;
  hoveredSumRowIndex: number | null;
}

export const TableInfo = ({
  params,
  hoveredCellId,
  hoveredSumRowIndex,
}: TableInfoProps) => {
  return (
    <div className="matrix-table-info">
      <h3>
        Matrix {params.m}×{params.n}
      </h3>

      <span className="matrix-params">
        X = {params.x}
        {hoveredCellId !== null && (
          <span className="highlight-indicator">
            (highlighting {params.x} nearest)
          </span>
        )}
        {hoveredSumRowIndex !== null && (
          <span className="percentage-indicator">(showing percentages)</span>
        )}
      </span>
    </div>
  );
};
