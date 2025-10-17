import { useState } from "react";
import Plot from "react-plotly.js";

const GaussianElimination: React.FC = () => {
  const [matrix, setMatrix] = useState([
    [2, 1],
    [1, -1],
  ]);
  const [b, setB] = useState([5, 1]);
  const [result, setResult] = useState<number[]>([]);

  // เปลี่ยนค่าใน Matrix A
  const handleChangeA = (r: number, c: number, value: string) => {
    const newMatrix = [...matrix];
    newMatrix[r][c] = parseFloat(value);
    setMatrix(newMatrix);
  };

  // เปลี่ยนค่าใน Vector B
  const handleChangeB = (r: number, value: string) => {
    const newB = [...b];
    newB[r] = parseFloat(value);
    setB(newB);
  };

  // ฟังก์ชัน Gaussian Elimination
  const solveGaussian = () => {
    const n = matrix.length;
    const A = matrix.map((row) => [...row]);
    const B = [...b];

    // Forward Elimination
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
          maxRow = k;
        }
      }

      [A[i], A[maxRow]] = [A[maxRow], A[i]];
      [B[i], B[maxRow]] = [B[maxRow], B[i]];

      for (let k = i + 1; k < n; k++) {
        const factor = A[k][i] / A[i][i];
        for (let j = i; j < n; j++) {
          A[k][j] -= factor * A[i][j];
        }
        B[k] -= factor * B[i];
      }
    }

    // Back Substitution
    const X = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) {
        sum += A[i][j] * X[j];
      }
      X[i] = (B[i] - sum) / A[i][i];
    }

    setResult(X);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Gaussian Elimination Solver</h1>

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
                style={{
                  width: "60px",
                  margin: "3px",
                  textAlign: "center",
                }}
              />
            ))}
            |{" "}
            <input
              type="number"
              value={b[r]}
              onChange={(e) => handleChangeB(r, e.target.value)}
              style={{
                width: "60px",
                margin: "3px",
                textAlign: "center",
              }}
            />
          </div>
        ))}
      </div>

      <br />
      <button
        onClick={solveGaussian}
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
              y: [-10, 10].map(
                (x) => (b[0] - matrix[0][0] * x) / matrix[0][1]
              ),
              type: "scatter",
              mode: "lines",
              name: "สมการ 1",
              line: { color: "blue" },
            },
            {
              x: [-10, 10],
              y: [-10, 10].map(
                (x) => (b[1] - matrix[1][0] * x) / matrix[1][1]
              ),
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
            title: { text: "กราฟสมการ 2 เส้น (Gaussian Elimination)" },
            xaxis: { title: { text: "x₁" } },
            yaxis: { title: { text: "x₂" } },
          }}
        />
      )}
    </div>
  );
};

export default GaussianElimination;
