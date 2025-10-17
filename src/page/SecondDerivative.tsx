import { useState } from "react";
import Plot from "react-plotly.js";

const SecondDerivative: React.FC = () => {
  const [funcStr, setFuncStr] = useState("x**3"); // ตัวอย่าง f(x)=x^3
  const [x0, setX0] = useState(1); // จุดที่ต้องการหาอนุพันธ์
  const [h, setH] = useState(0.1); // step size
  const [forward, setForward] = useState<number | null>(null);
  const [backward, setBackward] = useState<number | null>(null);
  const [central, setCentral] = useState<number | null>(null);

  const f = (x: number) => {
    try {
      // eslint-disable-next-line no-new-func
      return new Function("x", `return ${funcStr}`)(x);
    } catch {
      return NaN;
    }
  };

  const calculateSecondDerivatives = () => {
    setForward((f(x0) - 2 * f(x0 + h) + f(x0 + 2 * h)) / (h * h));
    setBackward((f(x0) - 2 * f(x0 - h) + f(x0 - 2 * h)) / (h * h));
    setCentral(
      (-f(x0 + 2 * h) + 16 * f(x0 + h) - 30 * f(x0) + 16 * f(x0 - h) - f(x0 - 2 * h)) /
        (12 * h * h)
    );
  };

  const generatePlotData = () => {
    const xs = Array.from({ length: 101 }, (_, i) => x0 - 5 + i * 0.1);
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
      {
        x: [x0],
        y: [f(x0)],
        type: "scatter",
        mode: "markers+text",
        text: ["x₀"],
        textposition: "top center",
        marker: { color: "red", size: 10 },
        name: "x₀",
      },
    ];
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Second Derivative Methods</h1>

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
        x₀:{" "}
        <input
          type="number"
          value={x0}
          onChange={(e) => setX0(parseFloat(e.target.value))}
          style={{ width: "60px", marginRight: "10px" }}
        />
        h:{" "}
        <input
          type="number"
          value={h}
          onChange={(e) => setH(parseFloat(e.target.value))}
          style={{ width: "60px" }}
        />
      </div>

      <button
        onClick={calculateSecondDerivatives}
        style={{ marginTop: "10px", padding: "5px 15px", borderRadius: "8px" }}
      >
        คำนวณอนุพันธ์ลำดับ 2
      </button>

      {forward !== null && backward !== null && central !== null && (
        <>
          <h2>ผลลัพธ์อนุพันธ์ลำดับ 2 ที่ x₀ = {x0}</h2>
          <p>Forward O(h²): {forward.toFixed(6)}</p>
          <p>Backward O(h²): {backward.toFixed(6)}</p>
          <p>Central O(h⁴): {central.toFixed(6)}</p>
        </>
      )}

      <div style={{ marginTop: "30px" }}>
        <Plot
          data={generatePlotData() as any[]}
          layout={{ width: 700, height: 500, title: "f(x) Graph" } as any}
        />
      </div>
    </div>
  );
};

export default SecondDerivative;
