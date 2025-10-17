import { useState } from "react";
import Plot from "react-plotly.js";

const CramersRule: React.FC = () => {
  const [size, setSize] = useState(2);
  const [matrixA, setMatrixA] = useState([
    [2, -1],
    [1, 3],
  ]);
  const [matrixB, setMatrixB] = useState([1, 7]);
  const [result, setResult] = useState<number[]>([]);

  const determinant = (m: number[][]): number => {
    if (m.length === 2) {
      return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    } else if (m.length === 3) {
      return (
        m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
        m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
        m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
      );
    } else {
      alert("รองรับเฉพาะ 2x2 หรือ 3x3 เท่านั้น");
      return 0;
    }
  };

  const solveCramer = () => {
    const detA = determinant(matrixA);
    if (detA === 0) {
      alert("ดีเทอร์มิแนนต์ของ A = 0 → ไม่มีคำตอบหรือมีหลายคำตอบ");
      return;
    }

    const results: number[] = [];
    for (let i = 0; i < matrixA.length; i++) {
      const temp = matrixA.map((row, rIdx) =>
        row.map((val, cIdx) => (cIdx === i ? matrixB[rIdx] : val))
      );
      const detAi = determinant(temp);
      results.push(detAi / detA);
    }

    setResult(results);
  };

  const handleChangeA = (r: number, c: number, value: string) => {
    const newMatrix = [...matrixA];
    newMatrix[r][c] = parseFloat(value);
    setMatrixA(newMatrix);
  };

  const handleChangeB = (r: number, value: string) => {
    const newB = [...matrixB];
    newB[r] = parseFloat(value);
    setMatrixB(newB);
  };


  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    setMatrixA(Array.from({ length: newSize }, () => Array(newSize).fill(0)));
    setMatrixB(Array(newSize).fill(0));
    setResult([]);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Cramer’s Rule Solver</h1>

      <div style={{ marginBottom: "10px" }}>
        <label>ขนาดเมทริกซ์: </label>
        <select
          value={size}
          onChange={(e) => handleSizeChange(parseInt(e.target.value))}
        >
          <option value={2}>2×2</option>
          <option value={3}>3×3</option>
        </select>
      </div>

      <h3>กรอกค่า Matrix A และ B</h3>
      <div style={{ display: "inline-block", textAlign: "center" }}>
        {matrixA.map((row, r) => (
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
              value={matrixB[r]}
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
        onClick={solveCramer}
        style={{ marginTop: "10px", padding: "5px 15px" }}
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

      {matrixA.length === 2 && result.length === 2 && (
        <Plot
          data={[
            {
              x: [-10, 10],
              y: [-10, 10].map(
                (x) => (matrixB[0] - matrixA[0][0] * x) / matrixA[0][1]
              ),
              type: "scatter",
              mode: "lines",
              name: "สมการ 1",
              line: { color: "blue" },
            },
            {
              x: [-10, 10],
              y: [-10, 10].map(
                (x) => (matrixB[1] - matrixA[1][0] * x) / matrixA[1][1]
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
              text: ["จุดตัด (x₁,x₂)"],
              textposition: "top center",
            },
          ]}
          layout={{
            width: 700,
            height: 400,
            title: { text: "กราฟสมการ 2 เส้น (Cramer’s Rule)" },
            xaxis: { title: { text: "x₁" } },
            yaxis: { title: { text: "x₂" } },
          }}
        />
      )}
    </div>
  );
};

export default CramersRule;
