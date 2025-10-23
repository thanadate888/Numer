import { useState } from "react";
import Plot from "react-plotly.js";

const SimpsonRule: React.FC = () => {
  const [funcStr, setFuncStr] = useState("x**2"); 
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [n, setN] = useState(4); // ต้องเป็นคู่
  const [result, setResult] = useState<number | null>(null);

  const f = (x: number) => {
    try {
      return new Function("x", `return ${funcStr}`)(x);
    } catch {
      return NaN;
    }
  };

  const calculateSimpson = () => {
    if (n % 2 !== 0) {
      alert("จำนวนช่วง n ต้องเป็นเลขคู่สำหรับ Simpson's Rule");
      return;
    }

    const h = (b - a) / n;
    let sum = f(a) + f(b);

    for (let i = 1; i < n; i++) {
      if (i % 2 === 0) sum += 2 * f(a + i * h);
      else sum += 4 * f(a + i * h);
    }

    const integral = (h / 3) * sum;
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
        name: "f(x)",
        line: { color: "blue" },
      },
    ];
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Simpson's Rule (Composite)</h1>

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
          style={{ width: "60px", marginRight: "10px" }}
        />
        n:{" "}
        <input
          type="number"
          value={n}
          min={2}
          step={2}
          onChange={(e) => setN(parseInt(e.target.value))}
          style={{ width: "60px" }}
        />
      </div>

      <button
        onClick={calculateSimpson}
        style={{ marginTop: "10px", padding: "5px 15px", borderRadius: "8px" }}
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
            title: "Simpson's Rule Graph",
          } as any}
        />
      </div>
    </div>
  );
};

export default SimpsonRule;
