import { useState } from "react";
import InputEquation from "../component/InputEquation";
import ResultTable from "../component/ResultTable";
import GraphPlot from "../component//GraphPlot";
import SolveButton from "../component/SolveButton";

const FalsePosition: React.FC = () => {
  const [XL, setXL] = useState(0);
  const [XR, setXR] = useState(0);
  const [XM, setXM] = useState(0);
  const [error, setError] = useState(1e-6);
  const [equation, setEquation] = useState("x**3 + 4*x**2 - 10");
  const [Result, setResult] = useState<any[]>([]);

  function FalsePositionMethod(equation: string, XL: number, XR: number,  maxIter = 100) {
    const safeEq = equation
      .replaceAll("^", "**")
      .replaceAll(";", "")
      .trim();
    const f = new Function("x", "with(Math) { return " + safeEq + " }");
    let iter = 0;
    let XM = XL;
    const steps: any[] = [];

    while (iter < maxIter) {
      XM = (XL * f(XR) - XR * f(XL)) / (f(XR) - f(XL));
      steps.push({ iter, XL, XR, XM, fXM: f(XM) });

      if (Math.abs(f(XM)) < error) break;

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
      <section className="center">
      <h1>False Position Method</h1>

      {/* Input สมการ */}
      <InputEquation equation={equation} onChange={setEquation} />

      {/* Input XL / XR */}
      <div>
        <h4>XL</h4>
        <input type="number" value={XL} onChange={(e) => setXL(parseFloat(e.target.value))} />
        <h4>XR</h4>
        <input type="number" value={XR} onChange={(e) => setXR(parseFloat(e.target.value))} />
        <h4>Error</h4>
        <input type="number" value={error} onChange={(e) => setError(parseFloat(e.target.value))} />
      </div>

      {/* ปุ่มคำนวณ */}
      <SolveButton onClick={() => FalsePositionMethod(equation, XL, XR)} />

      <h2>ผลลัพธ์ XM: {XM}</h2>

      {/* แสดงผล */}
      <ResultTable 
      columns={["Iter", "XL", "XR", "XM", "fXM"]}
      data={Result} 
      />
      <GraphPlot data={[
          {
            x: Array.from({ length: 200 }, (_, i) => i / 10 - 10),
            y: Array.from({ length: 200 }, (_, i) =>
              new Function("x", "with(Math){ return "  + " }")(i / 10 - 10)
            ),
            type: "scatter",
            mode: "lines",
            name: "f(x)",
          },
        ]}
        title="Graph of f(x)" />
        </section>
    </div>
  );
};

export default FalsePosition;