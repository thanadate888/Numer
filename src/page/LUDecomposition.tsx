import { useState } from "react";
import Plot from "react-plotly.js";

const LUDecomposition: React.FC = () => {
  const [matrix, setMatrix] = useState([
    [2, 1],
    [1, -1],
  ]);
  const [b, setB] = useState([5, 1]);
  const [result, setResult] = useState<number[]>([]);

  const handleChangeA = (r: number, c: number, value: string) => {
    const newMatrix = [...matrix];
    newMatrix[r][c] = parseFloat(value);
    setMatrix(newMatrix);
  };

  const handleChangeB = (r: number, value: string) => {
    const newB = [...b];
    newB[r] = parseFloat(value);
    setB(newB);
  };

  // LU Decomposition (Doolittle method)
  const luDecompose = (A: number[][]) => {
    const n = A.length;
    const L = Array.from({ length: n }, () => Array(n).fill(0));
    const U = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      // Upper Triangular
      for (let k = i; k < n; k++) {
        let sum = 0;
        for (let j = 0; j < i; j++) sum += L[i][j] * U[j][k];
        U[i][k] = A[i][k] - sum;
      }

      // Lower Triangular
      for (let k = i; k < n; k++) {
        if (i === k) {
          L[i][i] = 1; // Diagonal = 1
        } else {
          let sum = 0;
          for (let j = 0; j < i; j++) sum += L[k][j] * U[j][i];
          L[k][i] = (A[k][i] - sum) / U[i][i];
        }
      }
    }
    return { L, U };
  };

  const forwardSubstitution = (L: number[][], B: number[]) => {
    const n = L.length;
    const Y = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < i; j++) sum += L[i][j] * Y[j];
      Y[i] = B[i] - sum;
    }
    return Y;
  };

  const backSubstitution = (U: number[][], Y: number[]) => {
    const n = U.length;
    const X = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) sum += U[i][j] * X[j];
      X[i] = (Y[i] - sum) / U[i][i];
    }
    return X;
  };

  const solveLU = () => {
    try {
      const { L, U } = luDecompose(matrix);
      const Y = forwardSubstitution(L, b);
      const X = backSubstitution(U, Y);
      setResult(X);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>LU Decomposition Solver</h1>

      <h3>กรอกค่า Matrix A และ B</h3>
      <div style={{ display: "inline-block", textAlign: "center" }}>
        {matrix.map((row, r) => (
          <div key={r}>
            {row.map((val, c) => (
              <input
                key={c}
                type="number"
                value={val}
                onChange={(e) => handleChangeA(r, c, e.target.value)}
                style={{ width: "60px", margin: "3px", textAlign: "center" }}
              />
            ))}
            |{" "}
            <input
              type="number"
              value={b[r]}
              onChange={(e) => handleChangeB(r, e.target.value)}
              style={{ width: "60px", margin: "3px", textAlign: "center" }}
            />
          </div>
        ))}
      </div>

      <br />
      <button
        onClick={solveLU}
        style={{
          marginTop: "10px",
          padding: "5px 15px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        คำนวณคำตอบ
      </button>

      {result.length > 0 && (
        <>
          <h2>ผลลัพธ์:</h2>
          {result.map((x, i) => (
            <p key={i}>
              x{i + 1} = {x.toFixed(6)}
            </p>
          ))}
        </>
      )}

      {/* แสดงกราฟถ้าเป็น 2x2 */}
      {matrix.length === 2 && result.length === 2 && (
        <Plot
          data={[
            {
              x: [-10, 10],
              y: [-10, 10].map((x) => (b[0] - matrix[0][0] * x) / matrix[0][1]),
              type: "scatter",
              mode: "lines",
              name: "สมการ 1",
              line: { color: "blue" },
            },
            {
              x: [-10, 10],
              y: [-10, 10].map((x) => (b[1] - matrix[1][0] * x) / matrix[1][1]),
              type: "scatter",
              mode: "lines",
              name: "สมการ 2",
              line: { color: "red" },
            },
            {
              x: [result[0]],
              y: [result[1]],
              type: "scatter",
              mode: "markers+text",
              marker: { color: "green", size: 10 },
              text: ["จุดตัด (x₁, x₂)"],
              textposition: "top center",
            },
          ]}
          layout={{
            width: 700,
            height: 400,
            title: { text: "กราฟสมการ 2 เส้น (LU Decomposition)" },
            xaxis: { title: { text: "x₁" } },
            yaxis: { title: { text: "x₂" } },
          }}
        />
      )}
    </div>
  );
};

export default LUDecomposition;
