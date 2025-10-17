import { useState } from "react";

const ConjugateGradient: React.FC = () => {
  const [matrix, setMatrix] = useState([
    [4, 1],
    [1, 3],
  ]); // Symmetric positive definite
  const [b, setB] = useState([1, 2]);
  const [result, setResult] = useState<number[]>([]);
  const [iterations, setIterations] = useState<number>(0);
  const [tolerance, setTolerance] = useState(1e-6);
  const [maxIter, setMaxIter] = useState(100);

  const handleChangeA = (r: number, c: number, value: string) => {
    const newMatrix = [...matrix];
    newMatrix[r][c] = parseFloat(value);
    if (r !== c) newMatrix[c][r] = parseFloat(value); // ให้ symmetric
    setMatrix(newMatrix);
  };

  const handleChangeB = (r: number, value: string) => {
    const newB = [...b];
    newB[r] = parseFloat(value);
    setB(newB);
  };

  const dot = (v1: number[], v2: number[]) =>
    v1.reduce((sum, val, i) => sum + val * v2[i], 0);

  const matVecMul = (A: number[][], x: number[]) =>
    A.map((row) => dot(row, x));

  const conjugateGradientSolve = () => {
    const n = matrix.length;
    let x = Array(n).fill(0); // เริ่มจาก x0 = 0
    let r = b.map((val, i) => val - dot(matrix[i], x));
    let p = [...r];
    let iter = 0;

    while (iter < maxIter) {
      const Ap = matVecMul(matrix, p);
      const alpha = dot(r, r) / dot(p, Ap);

      x = x.map((xi, i) => xi + alpha * p[i]);
      const r_new = r.map((ri, i) => ri - alpha * Ap[i]);

      if (Math.sqrt(dot(r_new, r_new)) < tolerance) {
        r = r_new;
        break;
      }

      const beta = dot(r_new, r_new) / dot(r, r);
      p = r_new.map((ri, i) => ri + beta * p[i]);
      r = r_new;
      iter++;
    }

    setResult(x);
    setIterations(iter);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Conjugate Gradient Method</h1>

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
                disabled={c > r} // upper triangle disable
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
        onClick={conjugateGradientSolve}
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

export default ConjugateGradient;
