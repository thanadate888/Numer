import { useState } from "react";
import InputEquation from "../component/InputEquation";
import GraphPlot from "../component/GraphPlot";
import ResultTable from "../component/ResultTable";
import SolveButton from "../component/SolveButton";

const OnePointIteration: React.FC = () => {
  const [x0, setX0] = useState(0);
  const [equation, setEquation] = useState("Math.cos(x)"); // g(x)
  const [XM, setXM] = useState(0);
  const [error, setError] = useState(1e-6);
  const [Result, setResult] = useState<any[]>([]);

  const OnePointIterationMethod = (
    equation: string,
    x0: number,
    Error = 1e-6,
    maxIter = 100
  ) => {
    const safeEq = equation
      .replaceAll("^", "**")
      .replaceAll(";", "")
      .trim();
    const g = new Function("x", "with(Math) { return " + safeEq + " }");
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


  return (
    <div className="container">
      <section className="center">
        <h1>One Point Iteration</h1>

        <div>
          <h4>โจทย์ (g(x))</h4>
          <InputEquation equation={equation} onChange={setEquation} />
        </div>

        <div>
          <h4>X0</h4>
          <input
            type="number"
            value={x0}
            onChange={(e) => setX0(parseFloat(e.target.value))}
          />
          <h4>Error</h4>
        <input type="number" value={error} onChange={(e) => setError(parseFloat(e.target.value))} />
        </div>

        <SolveButton
          onClick={() => OnePointIterationMethod(equation, x0)}
        />

        <h2>ผลลัพธ์ XM: {XM.toFixed(6)}</h2>

      
        <ResultTable 
        columns={["iter", "XM", "gXM"]} 
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

export default OnePointIteration;
