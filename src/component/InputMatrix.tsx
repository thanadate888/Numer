import React from "react";

interface InputMatrixProps {
  matrix: number[][];
  onChange: (r: number, c: number, value: string) => void;
  symmetric?: boolean; // true = แก้เฉพาะ lower triangle
}

const InputMatrix: React.FC<InputMatrixProps> = ({ matrix, onChange, symmetric = false }) => (
  <div style={{ display: "inline-block", textAlign: "center" }}>
    {matrix.map((row, r) => (
      <div key={r}>
        {row.map((val, c) => (
          <input
            key={c}
            type="number"
            value={val}
            onChange={(e) => onChange(r, c, e.target.value)}
            style={{ width: "60px", margin: "3px", textAlign: "center" }}
            disabled={symmetric && c > r}
          />
        ))}
      </div>
    ))}
  </div>
);

export default InputMatrix;