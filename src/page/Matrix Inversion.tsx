import { useState } from "react";
import Plot from "react-plotly.js";

const MatrixInversion: React.FC = () => {
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

  // ฟังก์ชัน invert matrix (2x2 หรือ 3x3)
  const invertMatrix = (A: number[][]): number[][] => {
    const n = A.length;

    if (n === 2) {
      const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
      if (det === 0) throw new Error("Matrix is singular");
      return [
        [A[1][1] / det, -A[0][1] / det],
        [-A[1][0] / det, A[0][0] / det],
      ];
    } else if (n === 3) {
      const det =
        A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) -
        A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) +
        A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
      if (det === 0) throw new Error("Matrix is singular");

      const invDet = 1 / det;
      const inv = [
        [
          (A[1][1] * A[2][2] - A[1][2] * A[2][1]) * invDet,
          (A[0][2] * A[2][1] - A[0][1] * A[2][2]) * invDet,
          (A[0][1] * A[1][2] - A[0][2] * A[1][1]) * invDet,
        ],
        [
          (A[1][2] * A[2][0] - A[1][0] * A[2][2]) * invDet,
          (A[0][0] * A[2][2] - A[0][2] * A[2][0]) * invDet,
          (A[0][2] * A[1][0] - A[0][0] * A[1][2]) * invDet,
        ],
        [
          (A[1][0] * A[2][1] - A[1][1] * A[2][0]) * invDet,
          (A[0][1] * A[2][0] - A[0][0] * A[2][1]) * invDet,
          (A[0][0] * A[1][1] - A[0][1] * A[1][0]) * invDet,
        ],
      ];
      return inv;
    } else {
      throw new Error("Only 2x2 and 3x3 supported");
    }
  };

  // คูณ matrix กับ vector
  const multiplyMatrixVector = (A: number[][], B: number[]) => {
    return A.map((row) =>
      row.reduce((sum, val, i) => sum + val * B[i], 0)
    );
  };

  const solveMatrixInversion = () => {
    try {
      const invA = invertMatrix(matrix);
      const X = multiplyMatrixVector(invA, b);
      setResult(X);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Matrix Inversion Solver</h1>

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
        onClick={solveMatrixInversion}
        style={{ marginTop: "10px", padding: "5px 15px", borderRadius: "8px", cursor: "pointer" }}
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
            title: { text: "กราฟสมการ 2 เส้น (Matrix Inversion)" },
            xaxis: { title: { text: "x₁" } },
            yaxis: { title: { text: "x₂" } },
          }}
        />
      )}
    </div>
  );
};

export default MatrixInversion;