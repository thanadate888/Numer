import { useState } from "react";
import Plot from "react-plotly.js";

const NewtonRaphson: React.FC = () => {
  const [x0, setX0] = useState(0);
  const [equation, setEquation] = useState("x**3 + 4*x**2 - 10"); // f(x)
  const [derivative, setDerivative] = useState("3*x**2 + 8*x");   // f'(x)
  const [XM, setXM] = useState(0);
  const [Result, setResult] = useState<any[]>([]);

  // สร้างข้อมูลกราฟ
  const generateGraphData = (equation: string, start: number, end: number, steps = 100) => {
    const f = new Function("x", "return " + equation + ";");
    const xValues: number[] = [];
    const yValues: number[] = [];
    const step = (end - start) / steps;

    for (let i = 0; i <= steps; i++) {
      const x = start + i * step;
      xValues.push(x);
      yValues.push(f(x));
    }

    return { xValues, yValues };
  };

  // ฟังก์ชันหลัก Newton-Raphson
  const NewtonRaphsonMethod = (
    equation: string,
    derivative: string,
    x0: number,
    Error = 1e-6,
    maxIter = 100
  ) => {
    const f = new Function("x", "return " + equation + ";");
    const fPrime = new Function("x", "return " + derivative + ";");

    let XM = x0;
    let iter = 0;
    const steps: any[] = [];

    while (iter < maxIter) {
      const fXM = f(XM);
      const fPrimeXM = fPrime(XM);

      if (fPrimeXM === 0) {
        alert("f'(x) = 0 ทำให้หารไม่ได้");
        break;
      }

      const xNext = XM - fXM / fPrimeXM;

      steps.push({ iter, XM, fXM, fPrimeXM, xNext });

      if (Math.abs(xNext - XM) < Error) break;

      XM = xNext;
      iter++;
    }

    setXM(XM);
    setResult(steps);
    return XM;
  };

  const graphData = generateGraphData(equation, x0 - 5, x0 + 5);

  return (
    <div className="container">
      <section className="center">
        <h1>Newton-Raphson Method</h1>

        <div>
          <h4>โจทย์ f(x)</h4>
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
          />
        </div>

        <div>
          <h4>f'(x)</h4>
          <input
            type="text"
            value={derivative}
            onChange={(e) => setDerivative(e.target.value)}
          />
        </div>

        <div>
          <h4>X₀</h4>
          <input
            type="number"
            value={x0}
            onChange={(e) => setX0(parseFloat(e.target.value))}
          />
        </div>

        <button onClick={() => NewtonRaphsonMethod(equation, derivative, x0)}>
          คำนวณราก
        </button>

        <h2>ผลลัพธ์ XM: {XM.toFixed(6)}</h2>

        {/* ตารางแสดงแต่ละรอบ */}
        <table className="center-table">
          <thead>
            <tr>
              <th>Iteration</th>
              <th>XM</th>
              <th>f(XM)</th>
              <th>f'(XM)</th>
              <th>X Next</th>
            </tr>
          </thead>
          <tbody>
            {Result.map((res: any, index: number) => (
              <tr key={index}>
                <td>{res.iter}</td>
                <td>{res.XM.toFixed(6)}</td>
                <td>{res.fXM.toExponential(6)}</td>
                <td>{res.fPrimeXM.toExponential(6)}</td>
                <td>{res.xNext.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* กราฟ f(x) และจุด XM */}
        <Plot
          data={[
            {
              x: graphData.xValues,
              y: graphData.yValues,
              type: "scatter",
              mode: "lines",
              marker: { color: "blue" },
              name: "f(x)",
            },
            {
              x: Result.map((res: any) => res.XM),
              y: Result.map((res: any) => res.fXM),
              type: "scatter",
              mode: "markers+text",
              marker: { color: "red", size: 10 },
              text: Result.map((_, i) => `XM${i}`),
              textposition: "top center",
              name: "XM Points",
            },
          ]}
          layout={{
            width: 700,
            height: 400,
            title: { text: "Graph of f(x) with XM" },
            xaxis: { title: { text: "x" } },
            yaxis: { title: { text: "f(x)" } },
          }}
        />
      </section>
    </div>
  );
};

export default NewtonRaphson;
