import { useState } from "react";
import Plot from "react-plotly.js";

const TrapezoidalSingle: React.FC = () => {
  const [funcStr, setFuncStr] = useState("x**2"); // ตัวอย่าง f(x)=x^2
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [result, setResult] = useState<number | null>(null);

  // Evaluate function safely
  const f = (x: number) => {
    try {
      // eslint-disable-next-line no-new-func
      return new Function("x", `return ${funcStr}`)(x);
    } catch (e) {
      return NaN;
    }
  };

  const calculateTrapezoid = () => {
    const integral = ((b - a) / 2) * (f(a) + f(b));
    setResult(integral);
  };

  const generatePlotData = () => {
    const step = (b - a) / 100;
    const xs = Array.from({ length: 101 }, (_, i) => a + i * step);
    const ys = xs.map(f);
    return [
      {
        x: xs,
        y: ys,
        type: "scatter",
        mode: "lines",
        name: `f(x)`,
        line: { color: "blue" },
      },
      {
        x: [a, b, b, a],
        y: [0, 0, f(b), f(a)],
        type: "scatter",
        mode: "lines",
        fill: "toself",
        fillcolor: "rgba(255, 0, 0, 0.3)",
        name: "Trapezoid Area",
      },
    ];
  };

  return (
    <div className="container">
      <h1>Single Trapezoidal Rule</h1>

      <div>
        f(x):{" "}
        <input
          type="text"
          value={funcStr}
          onChange={(e) => setFuncStr(e.target.value)}
          style={{ width: "150px" }}
        />
      </div>
      <div>
        a:{" "}
        <input
          type="number"
          value={a}
          onChange={(e) => setA(parseFloat(e.target.value))}
          style={{ width: "60px", marginRight: "10px" }}
        />
        b:{" "}
        <input
          type="number"
          value={b}
          onChange={(e) => setB(parseFloat(e.target.value))}
          style={{ width: "60px" }}
        />
      </div>

      <button className="button"
        onClick={calculateTrapezoid}
       
      >
        คำนวณ Integral
      </button>

      {result !== null && (
        <h2>ค่าประมาณ Integral ≈ {result.toFixed(6)}</h2>
      )}

      <div style={{ marginTop: "30px" }}>
        <Plot
          data={generatePlotData() as any[]}
          layout={{
            width: 700,
            height: 500,
            title: "Single Trapezoidal Rule Graph",
          } as any}
        />
      </div>
    </div>
  );
};

export default TrapezoidalSingle;
