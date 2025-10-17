import { useState } from "react";

const JacobiMethod: React.FC = () => {
  const [matrix, setMatrix] = useState([
    [10, -1, 2],
    [-1, 11, -1],
    [2, -1, 10],
  ]);
  const [b, setB] = useState([6, 25, -11]);
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

  const jacobiSolve = () => {
    const n = matrix.length;
    let X = Array(n).fill(0);
    let Xnew = Array(n).fill(0);
    let iter = 0;

    while (iter < maxIter) {
      for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
          if (i !== j) sum += matrix[i][j] * X[j];
        }
        Xnew[i] = (b[i] - sum) / matrix[i][i];
      }

      // Check convergence
      let error = Xnew.map((val, i) => Math.abs(val - X[i]));
      if (Math.max(...error) < tolerance) break;

      X = [...Xnew];
      iter++;
    }

    setResult(Xnew);
    setIterations(iter);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Jacobi Iteration Method</h1>

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
        onClick={jacobiSolve}
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

export default JacobiMethod;
