import { useState } from "react";
import InputEquation from "../component/InputEquation";
import ResultTable from "../component/ResultTable";
import GraphPlot from "../component//GraphPlot";
import SolveButton from "../component/SolveButton";

const Secant: React.FC = () => {
  const [x0, setX0] = useState(0);     // ค่าเริ่มต้น x0
  const [x1, setX1] = useState(1);     // ค่าเริ่มต้น x1
  const [equation, setEquation] = useState("x**3 + 4*x**2 - 10"); // f(x)
  const [error, setError] = useState(1e-6);
  const [XM, setXM] = useState(0);     // ค่ารากสุดท้าย
  const [Result, setResult] = useState<any[]>([]); // เก็บข้อมูลแต่ละรอบ

  const SecantMethod = (
    equation: string,
    x0: number,
    x1: number,
    maxIter = 100
  ) => {
    const safeEq = equation
      .replaceAll("^", "**")
      .replaceAll(";", "")
      .trim();
    const f = new Function("x", "with(Math) { return " + safeEq + " }");

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

      if (Math.abs(XM - x1) < error) break;

      x0 = x1;
      x1 = XM;
      iter++;
    }

    setXM(XM);
    setResult(steps);
    return XM;
  };


  return (
    <div className="container">
      <section className="center">
        <h1>Secant Method</h1>

        <div>
          <h4>โจทย์ f(x)</h4>
          <InputEquation equation={equation} onChange={setEquation} />
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
          <h4>Error</h4>
        <input type="number" value={error} onChange={(e) => setError(parseFloat(e.target.value))} /> 
        </div>

        <SolveButton
          onClick={() => SecantMethod(equation, x0, x1)}
        />

        <h2>ผลลัพธ์ XM: {XM.toFixed(6)}</h2>

      <ResultTable
        columns={["iter", "x0", "x1", "XM", "fX0", "fX1"]}
        data={Result}
      />

        <GraphPlot
        data={[
          {
            x: Array.from({ length: 200 }, (_, i) => i / 10 - 10),
            y: Array.from({ length: 200 }, (_, i) =>
              new Function("x", "with(Math){ return " + " }")(i / 10 - 10)
            ),
            type: "scatter",
            mode: "lines",
            name: "f(x)",
          },
        ]}
        title="Graph of f(x)"
      />
      </section>
    </div>
  );
};

export default Secant;
