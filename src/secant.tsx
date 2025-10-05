import { useState } from "react";
import Plot from "react-plotly.js";

const Secant: React.FC = () => {
  const [x0, setX0] = useState(0);     // ค่าเริ่มต้น x0
  const [x1, setX1] = useState(1);     // ค่าเริ่มต้น x1
  const [equation, setEquation] = useState("x**3 + 4*x**2 - 10"); // f(x)
  const [XM, setXM] = useState(0);     // ค่ารากสุดท้าย
  const [Result, setResult] = useState<any[]>([]); // เก็บข้อมูลแต่ละรอบ

  // สร้างข้อมูลสำหรับกราฟ
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

  // 🔹 ฟังก์ชันหลัก Secant Method
  const SecantMethod = (
    equation: string,
    x0: number,
    x1: number,
    Error = 1e-6,
    maxIter = 100
  ) => {
    const f = new Function("x", "return " + equation + ";");

    let iter = 0;
    const steps: any[] = [];
    let XM = x1;

    while (iter < maxIter) {
      const fX0 = f(x0);
      const fX1 = f(x1);

      if (fX1 - fX0 === 0) {
        alert("เกิดการหารด้วยศูนย์ (f(x1) - f(x0) = 0)");
        break;
      }

      XM = x1 - (fX1 * (x1 - x0)) / (fX1 - fX0); // สูตร Secant

      steps.push({ iter, x0, x1, XM, fX0, fX1 });

      if (Math.abs(XM - x1) < Error) break;

      x0 = x1;
      x1 = XM;
      iter++;
    }

    setXM(XM);
    setResult(steps);
    return XM;
  };

  const graphData = generateGraphData(equation, x0 - 5, x1 + 5);

  return (
    <div className="container">
      <section className="center">
        <h1>Secant Method</h1>

        <div>
          <h4>โจทย์ f(x)</h4>
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
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

        <div>
          <h4>X₁</h4>
          <input
            type="number"
            value={x1}
            onChange={(e) => setX1(parseFloat(e.target.value))}
          />
        </div>

        <button onClick={() => SecantMethod(equation, x0, x1)}>
          คำนวณราก
        </button>

        <h2>ผลลัพธ์ XM: {XM.toFixed(6)}</h2>

        {/* ตารางแสดงผลลัพธ์แต่ละรอบ */}
        <table className="center-table">
          <thead>
            <tr>
              <th>Iteration</th>
              <th>X₀</th>
              <th>X₁</th>
              <th>XM</th>
              <th>f(X₀)</th>
              <th>f(X₁)</th>
            </tr>
          </thead>
          <tbody>
            {Result.map((res: any, index: number) => (
              <tr key={index}>
                <td>{res.iter}</td>
                <td>{res.x0.toFixed(6)}</td>
                <td>{res.x1.toFixed(6)}</td>
                <td>{res.XM.toFixed(6)}</td>
                <td>{res.fX0.toExponential(6)}</td>
                <td>{res.fX1.toExponential(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* กราฟแสดง f(x) และจุด XM */}
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
            title: { text: "Graph of f(x) with XM (Secant Method)" },
            xaxis: { title: { text: "x" } },
            yaxis: { title: { text: "f(x)" } },
          }}
        />
      </section>
    </div>
  );
};

export default Secant;
