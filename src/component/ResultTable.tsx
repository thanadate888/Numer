import React from "react";

interface ResultTableProps {
  columns: string[];
  data: any[];
}

const ResultTable: React.FC<ResultTableProps> = ({ columns, data }) => (
  <table className="center-table">
    <thead>
      <tr>
        {columns.map((col, i) => (
          <th key={i}>{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {columns.map((col, j) => (
            <td key={j}>{row[col] ?? "-"}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default ResultTable;