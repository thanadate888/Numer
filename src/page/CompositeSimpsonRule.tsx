import { useState } from "react";
import Plot from "react-plotly.js";

const CompositeSimpson: React.FC = () => {
  const [funcStr, setFuncStr] = useState("x**2"); // ตัวอย่าง f(x)=x^2
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [n, setN] = useState(4); // ต้องเป็นเลขคู่
  const [result, setResult] = useState<number | null>(null);

  const f = (x: number) => {
    try {
      // eslint-disable-next-line no-new-func
      return new Function("x", `return ${funcStr}`)(x);
    } catch {
      return NaN;
    }
  };

  const calculateCompositeSimpson = () => {
    if (n % 2 !== 0) {
      alert("จำนวนช่วง n ต้องเป็นเลขคู่สำหรับ Composite Simpson’s Rule");
      return;
    }

    const h = (b - a) / n;
    let sum = f(a) + f(b);

    for (let i = 1; i < n; i++) {
      const x = a + i * h;
      sum += i % 2 === 0 ? 2 * f(x) : 4 * f(x);
    }

    setResult((h / 3) * sum);
  };

  const generatePlotData = () => {
    const step = (b - a) / 100;
    const xs = Array.from({ length: 101 }, (_, i) => a + i * step);
    const ys = xs.map(f);

    // แสดง trapezoids ของแต่ละช่วง
    const h = (b - a) / n;
    const trapezoids: any[] = [];
    for (let i = 0; i < n; i++) {
      const x0 = a + i * h;
      const x1 = x0 + h;
      trapezoids.push({
        x: [x0, x1, x1, x0],
        y: [0, 0, f(x1), f(x0)],
        type: "scatter",
        mode: "lines",
        fill: "toself",
        fillcolor: "rgba(255,0,0,0.3)",
        showlegend: i === 0,
        name: i === 0 ? "Sub-intervals" : undefined,
      });
    }

    return [
      {
        x: xs,
        y: ys,
        type: "scatter",
        mode: "lines",
        name: "f(x)",
        line: { color: "blue" },
      },
      ...trapezoids,
    ];
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Composite Simpson’s Rule</h1>

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
        onClick={calculateCompositeSimpson}
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
            title: "Composite Simpson’s Rule Graph",
          } as any}
        />
      </div>
    </div>
  );
};

export default CompositeSimpson;
