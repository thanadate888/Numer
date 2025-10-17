import { useState } from "react";
import Plot from "react-plotly.js";

const MultipleLinearRegression: React.FC = () => {
  // สมมติ 2 ตัวแปร x1, x2 สำหรับเริ่มต้น
  const [x1Values, setX1Values] = useState([1, 2, 3, 4]);
  const [x2Values, setX2Values] = useState([2, 3, 4, 5]);
  const [yValues, setYValues] = useState([3, 5, 7, 9]);
  const [coeffs, setCoeffs] = useState<number[] | null>(null);

  const handleChangeX1 = (i: number, value: string) => {
    const arr = [...x1Values];
    arr[i] = parseFloat(value);
    setX1Values(arr);
  };

  const handleChangeX2 = (i: number, value: string) => {
    const arr = [...x2Values];
    arr[i] = parseFloat(value);
    setX2Values(arr);
  };

  const handleChangeY = (i: number, value: string) => {
    const arr = [...yValues];
    arr[i] = parseFloat(value);
    setYValues(arr);
  };

  // Solve MLR using Least Squares: (X^T * X) * b = X^T * Y
  const calculateMLR = () => {
    const n = yValues.length;
    const X: number[][] = [];

    for (let i = 0; i < n; i++) {
      X.push([1, x1Values[i], x2Values[i]]); // เพิ่ม 1 สำหรับ intercept
    }

    const XT = transpose(X);
    const XTX = multiplyMatrices(XT, X);
    const XTY = multiplyMatrixVector(XT, yValues);
    const b = gaussJordan(XTX, XTY);

    setCoeffs(b);
  };

  const transpose = (matrix: number[][]) =>
    matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

  const multiplyMatrices = (A: number[][], B: number[][]) => {
    const rows = A.length, cols = B[0].length, common = B.length;
    const C: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < rows; i++)
      for (let j = 0; j < cols; j++)
        for (let k = 0; k < common; k++)
          C[i][j] += A[i][k] * B[k][j];
    return C;
  };

  const multiplyMatrixVector = (A: number[][], v: number[]) =>
    A.map(row => row.reduce((sum, val, i) => sum + val * v[i], 0));

  const gaussJordan = (A: number[][], b: number[]) => {
    const n = A.length;
    const M = A.map((row, i) => [...row, b[i]]);
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++)
        if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
      [M[i], M[maxRow]] = [M[maxRow], M[i]];

      const pivot = M[i][i];
      for (let j = i; j <= n; j++) M[i][j] /= pivot;

      for (let k = 0; k < n; k++) {
        if (k === i) continue;
        const factor = M[k][i];
        for (let j = i; j <= n; j++) M[k][j] -= factor * M[i][j];
      }
    }
    return M.map(row => row[n]);
  };

  const generatePlotData = () => {
    const data: any[] = [];

    // จุดข้อมูล (x1 vs y) สำหรับดูตัวอย่าง
    data.push({
      x: x1Values,
      y: yValues,
      type: "scatter",
      mode: "markers",
      name: "Data Points",
      marker: { color: "blue", size: 10 },
    });

    // เส้น regression (แสดงเฉพาะ x1 vs y โดยถือ x2 เฉลี่ย)
    if (coeffs) {
      const meanX2 = x2Values.reduce((a, b) => a + b, 0) / x2Values.length;
      const minX1 = Math.min(...x1Values);
      const maxX1 = Math.max(...x1Values);
      const plotX = Array.from({ length: 50 }, (_, i) => minX1 + (i / 49) * (maxX1 - minX1));
      const plotY = plotX.map(x1 => coeffs[0] + coeffs[1] * x1 + coeffs[2] * meanX2);

      data.push({
        x: plotX,
        y: plotY,
        type: "scatter",
        mode: "lines",
        name: "Regression Line (x2=mean)",
        line: { color: "red" },
      });
    }

    return data;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Multiple Linear Regression</h1>

      {x1Values.map((_, i) => (
        <div key={i} style={{ marginBottom: "5px" }}>
          X1{i}:{" "}
          <input
            type="number"
            value={x1Values[i]}
            onChange={(e) => handleChangeX1(i, e.target.value)}
            style={{ width: "60px", marginRight: "5px" }}
          />
          X2{i}:{" "}
          <input
            type="number"
            value={x2Values[i]}
            onChange={(e) => handleChangeX2(i, e.target.value)}
            style={{ width: "60px", marginRight: "5px" }}
          />
          Y{i}:{" "}
          <input
            type="number"
            value={yValues[i]}
            onChange={(e) => handleChangeY(i, e.target.value)}
            style={{ width: "60px" }}
          />
        </div>
      ))}

      <button
        onClick={calculateMLR}
        style={{ marginTop: "10px", padding: "5px 15px", borderRadius: "8px" }}
      >
        คำนวณ MLR
      </button>

      {coeffs && (
        <h2>
          Coefficients: {coeffs.map((c, i) => `b${i}=${c.toFixed(4)}`).join(", ")}
        </h2>
      )}

      <div style={{ marginTop: "30px" }}>
        <Plot
          data={generatePlotData() as any[]}
          layout={{ width: 700, height: 500, title: "Multiple Linear Regression Graph" } as any}
        />
      </div>
    </div>
  );
};

export default MultipleLinearRegression;
