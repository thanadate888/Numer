import { useState } from "react";
import unicon from "./69c66c1d409f30ac80152738ef529e4d.jpg";
import kuromi from "./1A9CBFE4-5E4F-4444-BE85-FC80369749CF.jpg";

function App() {
  const [XL, setXL] = useState(0);
  const [XR, setXR] = useState(0);
  const [XM, setXM] = useState(0);
  const [equation, setEquation] = useState("x**3 + 4*x**2 - 10");
  const [Result, setResult] = useState<any[]>([]);

  function Bisection(
    equation: string,
    XL: number,
    XR: number,
    Error = 1e-6,
    maxIter = 100
  ) {
    const f = new Function("x", "return " + equation + ";");
    let iter = 0;
    let XM = (XL + XR) / 2;
    const steps: any[] = [];

    while (iter < maxIter) {
      XM = (XL + XR) / 2;

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
    <div className="container">
      <section className="center-heading">
        <h2>Thanadate Sahayunyung 6704062612103</h2>
      </section>
      <section className="center">
        <h1>Bisection</h1>
        <div>
          <h3>โจทย์</h3>
        </div>
        <input
          type="text"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
        />
        <div className="flex-container">
          <img
            src={kuromi}
            alt="kuromi"
            className="center-image"
            height={100}
          />
          <div>
            <h4>XL</h4>
            <input
              type="number"
              value={XL}
              onChange={(e) => setXL(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <h4>XR</h4>
            <input
              type="number"
              value={XR}
              onChange={(e) => setXR(parseFloat(e.target.value))}
            />
          </div>
          <img src={unicon} alt="Logo" className="center-image" height={100} />
        </div>
        <button onClick={() => Bisection(equation, XL, XR)}>คำนวณราก</button>

        <h2>ผลลัพธ์ XM: {XM} </h2>

        <div>
          <table className="center-table">
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
      </section>
    </div>
  );
}

export default App;