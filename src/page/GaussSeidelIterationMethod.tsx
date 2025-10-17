import { useState } from "react";

const GaussSeidel: React.FC = () => {
  const [matrix, setMatrix] = useState([
    [4, 1, 2],
    [3, 5, 1],
    [1, 1, 3],
  ]);
  const [b, setB] = useState([4, 7, 3]);
  const [result, setResult] = useState<number[]>([]);
  const [iterations, setIterations] = useState<number>(0);
  const [tolerance, setTolerance] = useState(1e-6);
  const [maxIter, setMaxIter] = useState(100);

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

  const gaussSeidelSolve = () => {
    const n = matrix.length;
    let X = Array(n).fill(0);
    let iter = 0;

    while (iter < maxIter) {
      let Xold = [...X];

      for (let i = 0; i < n; i++) {
        let sum1 = 0;
        for (let j = 0; j < i; j++) sum1 += matrix[i][j] * X[j]; // ใช้ค่าใหม่ทันที
        let sum2 = 0;
        for (let j = i + 1; j < n; j++) sum2 += matrix[i][j] * Xold[j];
        X[i] = (b[i] - sum1 - sum2) / matrix[i][i];
      }

      // ตรวจสอบ convergence
      const error = X.map((val, i) => Math.abs(val - Xold[i]));
      if (Math.max(...error) < tolerance) break;

      iter++;
    }

    setResult(X);
    setIterations(iter);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Gauss-Seidel Iteration Method</h1>

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
      <div style={{ marginTop: "10px" }}>
        <label>
          Tolerance:{" "}
          <input
            type="number"
            step="1e-6"
            value={tolerance}
            onChange={(e) => setTolerance(parseFloat(e.target.value))}
            style={{ width: "100px" }}
          />
        </label>
        &nbsp;&nbsp;
        <label>
          Max Iteration:{" "}
          <input
            type="number"
            value={maxIter}
            onChange={(e) => setMaxIter(parseInt(e.target.value))}
            style={{ width: "80px" }}
          />
        </label>
      </div>

      <button
        onClick={gaussSeidelSolve}
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
          <p>จำนวน Iteration: {iterations}</p>
        </>
      )}
    </div>
  );
};

export default GaussSeidel;
