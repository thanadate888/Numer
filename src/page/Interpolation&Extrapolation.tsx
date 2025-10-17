import { useState } from "react";
import Plot from "react-plotly.js";

const InterpolationExtrapolationPlot: React.FC = () => {
  const [xValues, setXValues] = useState([1, 2, 3]);
  const [yValues, setYValues] = useState([2, 4, 6]);
  const [targetX, setTargetX] = useState(2.5);
  const [result, setResult] = useState<number | null>(null);
  const [mode, setMode] = useState<"interpolation" | "extrapolation">("interpolation");

  const handleChangeX = (i: number, value: string) => {
    const arr = [...xValues];
    arr[i] = parseFloat(value);
    setXValues(arr);
  };

  const handleChangeY = (i: number, value: string) => {
    const arr = [...yValues];
    arr[i] = parseFloat(value);
    setYValues(arr);
  };

  const linearInterpExtrap = () => {
    const n = xValues.length;
    let y: number;

    if (mode === "interpolation") {
      let i = 0;
      while (i < n - 1 && targetX > xValues[i + 1]) i++;
      if (i >= n - 1) i = n - 2;
      const x0 = xValues[i];
      const x1 = xValues[i + 1];
      const y0 = yValues[i];
      const y1 = yValues[i + 1];
      y = y0 + ((y1 - y0) / (x1 - x0)) * (targetX - x0);
    } else {
      const x0 = xValues[n - 2];
      const x1 = xValues[n - 1];
      const y0 = yValues[n - 2];
      const y1 = yValues[n - 1];
      y = y0 + ((y1 - y0) / (x1 - x0)) * (targetX - x0);
    }

    setResult(y);
  };

  // สร้าง Plotly data
  const generatePlotData = () => {
    const n = xValues.length;
    const data: any[] = [];

    // จุดข้อมูล
    data.push({
      x: xValues,
      y: yValues,
      type: "scatter",
      mode: "markers",
      name: "Data Points",
      marker: { color: "blue", size: 10 },
    });

    // เส้น Interpolation / Extrapolation
    if (mode === "interpolation") {
      for (let i = 0; i < n - 1; i++) {
        data.push({
          x: [xValues[i], xValues[i + 1]],
          y: [yValues[i], yValues[i + 1]],
          type: "scatter",
          mode: "lines",
          name: i === 0 ? "Interpolation" : undefined,
          line: { color: "red" },
        });
      }
    } else {
      data.push({
        x: [xValues[n - 2], xValues[n - 1]],
        y: [yValues[n - 2], yValues[n - 1]],
        type: "scatter",
        mode: "lines",
        name: "Extrapolation",
        line: { color: "red" },
      });
    }

    // จุด Target
    if (result !== null) {
      data.push({
        x: [targetX],
        y: [result],
        type: "scatter",
        mode: "markers+text",
        name: "Target Point",
        marker: { color: "green", size: 12 },
        text: ["Target"],
        textposition: "top center",
      });
    }

    return data;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Interpolation & Extrapolation with Plotly</h1>

      <h3>กรอกค่าข้อมูล</h3>
      {xValues.map((x, i) => (
        <div key={i}>
          X{i}:{" "}
          <input
            type="number"
            value={x}
            onChange={(e) => handleChangeX(i, e.target.value)}
            style={{ width: "60px", marginRight: "10px" }}
          />
          Y{i}:{" "}
          <input
            type="number"
            value={yValues[i]}
            onChange={(e) => handleChangeY(i, e.target.value)}
            style={{ width: "60px" }}
          />
        </div>
      ))}

      <div style={{ marginTop: "10px" }}>
        Target X:{" "}
        <input
          type="number"
          value={targetX}
          onChange={(e) => setTargetX(parseFloat(e.target.value))}
          style={{ width: "80px" }}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>
          <input
            type="radio"
            checked={mode === "interpolation"}
            onChange={() => setMode("interpolation")}
          />{" "}
          Interpolation
        </label>
        &nbsp;&nbsp;
        <label>
          <input
            type="radio"
            checked={mode === "extrapolation"}
            onChange={() => setMode("extrapolation")}
          />{" "}
          Extrapolation
        </label>
      </div>

      <button
        onClick={linearInterpExtrap}
        style={{ marginTop: "10px", padding: "5px 15px", borderRadius: "8px" }}
      >
        คำนวณ
      </button>

      {result !== null && (
        <h2>ผลลัพธ์: Y({targetX}) = {result.toFixed(6)}</h2>
      )}

      <div style={{ marginTop: "30px" }}>
  <Plot
    data={generatePlotData() as any[]}  // cast data เป็น any[]
    layout={{
      width: 700,
      height: 500,
      title: "Interpolation & Extrapolation Graph",
    } as any} // cast layout เป็น any
  />
</div>
    </div>
  );
};

export default InterpolationExtrapolationPlot;