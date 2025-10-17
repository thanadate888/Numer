import { useState } from "react";
import Plot from "react-plotly.js";

const PolynomialRegressionPlot: React.FC = () => {
  const [xValues, setXValues] = useState([1, 2, 3, 4]);
  const [yValues, setYValues] = useState([1, 4, 9, 16]);
  const [degree, setDegree] = useState(2);
  const [coeffs, setCoeffs] = useState<number[] | null>(null);

  const handleChangeX = (i: number, value: string) => {
    const arr = [...xValues];
    arr[i] = parseFloat(value);
    setXValues(arr);
  };

  const handleChangeY = (i: number, value: string) => {
    const arr = [...yValues];
    arr[i] = parseFloat(value);
    setYValues(arr);
  };

  // ฟังก์ชันคำนวณ Polynomial Regression (Least Squares)
  const calculatePolynomial = () => {
    const n = xValues.length;
    const deg = degree;
    const X: number[][] = [];
    const Y: number[] = [...yValues];

    for (let i = 0; i < n; i++) {
      const row: number[] = [];
      for (let j = 0; j <= deg; j++) {
        row.push(Math.pow(xValues[i], j));
      }
      X.push(row);
    }

    // Solve (X^T * X) * a = X^T * Y
    const XT = transpose(X);
    const XTX = multiplyMatrices(XT, X);
    const XTY = multiplyMatrixVector(XT, Y);
    const a = gaussJordan(XTX, XTY); // a = coefficients

    setCoeffs(a);
  };

  // Helper: transpose matrix
  const transpose = (matrix: number[][]) =>
    matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

  // Helper: multiply matrices
  const multiplyMatrices = (A: number[][], B: number[][]) => {
    const rows = A.length, cols = B[0].length, common = B.length;
    const C: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = 0; i < rows; i++)
      for (let j = 0; j < cols; j++)
        for (let k = 0; k < common; k++)
          C[i][j] += A[i][k] * B[k][j];
    return C;
  };

  // Helper: multiply matrix x vector
  const multiplyMatrixVector = (A: number[][], v: number[]) =>
    A.map(row => row.reduce((sum, val, i) => sum + val * v[i], 0));

  // Helper: solve linear system by Gauss-Jordan
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

  // สร้าง Plotly data
  const generatePlotData = () => {
    const data: any[] = [];

    // จุดข้อมูล
    data.push({
      x: xValues,
      y: yValues,
      type: "scatter",
      mode: "markers",
      name: "Data Points",
      marker: { color: "blue", size: 10 },
    });

    // เส้น Polynomial Regression
    if (coeffs) {
      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);
      const plotX = Array.from({ length: 100 }, (_, i) => minX + (i / 99) * (maxX - minX));
      const plotY = plotX.map(x => coeffs.reduce((sum, a, j) => sum + a * Math.pow(x, j), 0));

      data.push({
        x: plotX,
        y: plotY,
        type: "scatter",
        mode: "lines",
        name: "Polynomial Fit",
        line: { color: "red" },
      });
    }

    return data;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Polynomial Regression with Plotly</h1>

      <h3>กรอกค่าข้อมูล</h3>
      {xValues.map((x, i) => (
        <div key={i}>
          X{i}:{" "}
          <input
            type="number"
            value={x}
            onChange={(e) => handleChangeX(i, e.target.value)}
            style={{ width: "60px", marginRight: "10px" }}
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

      <div style={{ marginTop: "10px" }}>
        Degree:{" "}
        <input
          type="number"
          value={degree}
          min={1}
          max={10}
          onChange={(e) => setDegree(parseInt(e.target.value))}
          style={{ width: "60px" }}
        />
      </div>

      <button
        onClick={calculatePolynomial}
        style={{ marginTop: "10px", padding: "5px 15px", borderRadius: "8px" }}
      >
        คำนวณ Polynomial Regression
      </button>

      {coeffs && (
        <h2>
          Coefficients: {coeffs.map((c, i) => `a${i}=${c.toFixed(4)}`).join(", ")}
        </h2>
      )}

      <div style={{ marginTop: "30px" }}>
        <Plot
          data={generatePlotData() as any[]}
          layout={{ width: 700, height: 500, title: "Polynomial Regression Graph" } as any}
        />
      </div>
    </div>
  );
};

export default PolynomialRegressionPlot;
