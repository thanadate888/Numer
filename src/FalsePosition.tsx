import { useState } from "react";

const FalsePosition: React.FC = () => {
  const [XL, setXL] = useState(0);
  const [XR, setXR] = useState(0);
  const [XM, setXM] = useState(0);
  const [equation, setEquation] = useState("x**3 + 4*x**2 - 10");
  const [Result, setResult] = useState<any[]>([]);

  function FalsePositionMethod(
    equation: string,
    XL: number,
    XR: number,
    Error = 1e-6,
    maxIter = 100
  ) {
    const f = new Function("x", "return " + equation + ";");
    let iter = 0;
    let XM = XL;
    const steps: any[] = [];

    while (iter < maxIter) {
      XM = (XL * f(XR) - XR * f(XL)) / (f(XR) - f(XL)); // สูตร False Position

      steps.push({ iter, XL, XR, XM, fXM: f(XM) });

      if (Math.abs(f(XM)) < Error) break;

      if (f(XL) * f(XM) < 0) XR = XM;
      else XL = XM;

      iter++;
    }

    setXM(XM);
    setResult(steps);
    return XM;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>False Position Method</h1>
      <input
        type="text"
        value={equation}
        onChange={(e) => setEquation(e.target.value)}
      />
      <div>
        <h4>XL</h4>
        <input
          type="number"
          value={XL}
          onChange={(e) => setXL(parseFloat(e.target.value))}
        />
        <h4>XR</h4>
        <input
          type="number"
          value={XR}
          onChange={(e) => setXR(parseFloat(e.target.value))}
        />
      </div>
      <button onClick={() => FalsePositionMethod(equation, XL, XR)}>
        คำนวณราก
      </button>

      <h2>ผลลัพธ์ XM: {XM} </h2>

      <table border={1}>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>XL</th>
            <th>XR</th>
            <th>XM</th>
            <th>f(XM)</th>
          </tr>
        </thead>
        <tbody>
          {Result.map((res, index) => (
            <tr key={index}>
              <td>{res.iter}</td>
              <td>{res.XL.toFixed(6)}</td>
              <td>{res.XR.toFixed(6)}</td>
              <td>{res.XM.toFixed(6)}</td>
              <td>{res.fXM.toExponential(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FalsePosition;