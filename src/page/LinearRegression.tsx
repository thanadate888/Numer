import { useState } from "react";
import Plot from "react-plotly.js";

const LinearRegressionPlot: React.FC = () => {
  const [xValues, setXValues] = useState([1, 2, 3, 4]);
  const [yValues, setYValues] = useState([2, 4, 5, 4.5]);
  const [slope, setSlope] = useState<number | null>(null);
  const [intercept, setIntercept] = useState<number | null>(null);

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

  const calculateRegression = () => {
    const n = xValues.length;
    const sumX = xValues.reduce((a, b) => a + b, 0);
    const sumY = yValues.reduce((a, b) => a + b, 0);
    const sumXY = xValues.reduce((sum, xi, i) => sum + xi * yValues[i], 0);
    const sumX2 = xValues.reduce((sum, xi) => sum + xi * xi, 0);

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const c = (sumY - m * sumX) / n;

    setSlope(m);
    setIntercept(c);
  };

  const generatePlotData = () => {
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

    // เส้น Linear Regression
    if (slope !== null && intercept !== null) {
      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);
      data.push({
        x: [minX, maxX],
        y: [slope * minX + intercept, slope * maxX + intercept],
        type: "scatter",
        mode: "lines",
        name: "Regression Line",
        line: { color: "red" },
      });
    }

    return data;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Linear Regression with Plotly</h1>

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

      <button
        onClick={calculateRegression}
        style={{ marginTop: "10px", padding: "5px 15px", borderRadius: "8px" }}
      >
        คำนวณ Regression
      </button>

      {slope !== null && intercept !== null && (
        <h2>
          เส้น Regression: y = {slope.toFixed(4)} x + {intercept.toFixed(4)}
        </h2>
      )}

      <div style={{ marginTop: "30px" }}>
        <Plot
          data={generatePlotData() as any[]}
          layout={{ width: 700, height: 500, title: "Linear Regression Graph" } as any}
        />
      </div>
    </div>
  );
};

export default LinearRegressionPlot;
