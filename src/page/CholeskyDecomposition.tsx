import { useState } from "react";
import Plot from "react-plotly.js";

const CholeskyDecomposition: React.FC = () => {
  const [matrix, setMatrix] = useState([
    [4, 2],
    [2, 3],
  ]); // Symmetric positive definite
  const [b, setB] = useState([6, 5]);
  const [result, setResult] = useState<number[]>([]);

  const handleChangeA = (r: number, c: number, value: string) => {
    const newMatrix = [...matrix];
    newMatrix[r][c] = parseFloat(value);
    if (r !== c) newMatrix[c][r] = parseFloat(value); // ให้ symmetric อัตโนมัติ
    setMatrix(newMatrix);
  };

  const handleChangeB = (r: number, value: string) => {
    const newB = [...b];
    newB[r] = parseFloat(value);
    setB(newB);
  };

  const choleskyDecompose = (A: number[][]) => {
    const n = A.length;
    const L = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= i; j++) {
        let sum = 0;
        for (let k = 0; k < j; k++) sum += L[i][k] * L[j][k];

        if (i === j) {
          const val = A[i][i] - sum;
          if (val <= 0) throw new Error("Matrix is not positive definite");
          L[i][j] = Math.sqrt(val);
        } else {
          L[i][j] = (A[i][j] - sum) / L[j][j];
        }
      }
    }

    return L;
  };

  const forwardSubstitution = (L: number[][], B: number[]) => {
    const n = L.length;
    const Y = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < i; j++) sum += L[i][j] * Y[j];
      Y[i] = (B[i] - sum) / L[i][i];
    }
    return Y;
  };

  const backSubstitution = (LT: number[][], Y: number[]) => {
    const n = LT.length;
    const X = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) sum += LT[j][i] * X[j]; // LT = L^T
      X[i] = (Y[i] - sum) / LT[i][i];
    }
    return X;
  };

  const solveCholesky = () => {
    try {
      const L = choleskyDecompose(matrix);
      const Y = forwardSubstitution(L, b);
      const X = backSubstitution(L, Y); // L^T ใช้ backSubstitution แบบ transpose
      setResult(X);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Cholesky Decomposition Solver</h1>

      <h3>กรอกค่า Matrix A และ B (Symmetric Positive Definite)</h3>
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
                disabled={c > r} // ป้องกันแก้ upper triangle
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
        onClick={solveCholesky}
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
            title: { text: "กราฟสมการ 2 เส้น (Cholesky Decomposition)" },
            xaxis: { title: { text: "x₁" } },
            yaxis: { title: { text: "x₂" } },
          }}
        />
      )}
    </div>
  );
};

export default CholeskyDecomposition;
