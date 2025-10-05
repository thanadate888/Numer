import { useState } from "react";
import Plot from "react-plotly.js";

const OnePointIteration: React.FC = () => {
  const [x0, setX0] = useState(0);
  const [equation, setEquation] = useState("Math.cos(x)"); // g(x)
  const [XM, setXM] = useState(0);
  const [Result, setResult] = useState<any[]>([]);

  const generateGraphData = (
    equation: string,
    start: number,
    end: number,
    steps = 100
  ) => {
    const g = new Function("x", "return " + equation + ";");
    const xValues: number[] = [];
    const yValues: number[] = [];
    const step = (end - start) / steps;

    for (let i = 0; i <= steps; i++) {
      const x = start + i * step;
      xValues.push(x);
      yValues.push(g(x));
    }

    return { xValues, yValues };
  };

  const OnePointIterationMethod = (
    equation: string,
    x0: number,
    Error = 1e-6,
    maxIter = 100
  ) => {
    const g = new Function("x", "return " + equation + ";");
    let iter = 0;
    let XM = x0;
    const steps: any[] = [];

    while (iter < maxIter) {
      const xNext = g(XM);

      steps.push({ iter, XM, gXM: xNext });

      if (Math.abs(xNext - XM) < Error) break;

      XM = xNext;
      iter++;
    }

    setXM(XM);
    setResult(steps);
    return XM;
  };

  const graphData = generateGraphData(equation, x0 - 2, x0 + 2);


  return (
    <div className="container">
      <section className="center">
        <h1>One Point Iteration</h1>

        <div>
          <h4>โจทย์ (g(x))</h4>
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
          />
        </div>

        <div>
          <h4>X0</h4>
          <input
            type="number"
            value={x0}
            onChange={(e) => setX0(parseFloat(e.target.value))}
          />
        </div>

        <button onClick={() => OnePointIterationMethod(equation, x0)}>
          คำนวณราก
        </button>

        <h2>ผลลัพธ์ XM: {XM.toFixed(6)}</h2>

      
        <table className="center-table">
          <thead>
            <tr>
              <th>Iteration</th>
              <th>XM</th>
              <th>g(XM)</th>
            </tr>
          </thead>
          <tbody>
            {Result.map((res: any, index: number) => (
              <tr key={index}>
                <td>{res.iter}</td>
                <td>{res.XM.toFixed(6)}</td>
                <td>{res.gXM.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Plot
          data={[
            {
              x: graphData.xValues,
              y: graphData.yValues,
              type: "scatter",
              mode: "lines",
              marker: { color: "blue" },
              name: "g(x)",
            },
            {
              x: Result.map((res: any) => res.XM),
              y: Result.map((res: any) => res.gXM),
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
            title: { text: "Graph of g(x) with XM" },
            xaxis: { title: { text: "x" } },
            yaxis: { title: { text: "g(x)" } },
          }}
        />
      </section>
    </div>
  );
};

export default OnePointIteration;
