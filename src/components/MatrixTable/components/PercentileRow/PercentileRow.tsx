import './PercentileRow.css';

export interface PercentileRowProps {
  percentiles: number[];
  // numColumns: number;
}

export const PercentileRow = ({
  percentiles,
  // numColumns,
}: PercentileRowProps) => {
  return (
    <tr className="matrix-percentile-row">
      <th className="matrix-header-row">60th percentile</th>

      {percentiles.map((value, colIndex) => (
        <td
          key={`percentile-${colIndex}`}
          className="matrix-percentile-cell"
        >
          {value.toFixed(2)}
        </td>
      ))}

      {/* Empty cells for Sum and Actions columns */}
      <td className="matrix-header-corner"></td>
      <td className="matrix-header-corner"></td>
    </tr>
  );
};
