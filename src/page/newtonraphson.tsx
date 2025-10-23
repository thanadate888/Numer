import { useState } from "react";
import InputEquation from "../component/InputEquation";
import GraphPlot from "../component/GraphPlot";
import ResultTable from "../component/ResultTable";
import SolveButton from "../component/SolveButton";

const NewtonRaphson: React.FC = () => {
  const [x0, setX0] = useState(0);
  const [equation, setEquation] = useState("x**3 + 4*x**2 - 10"); // f(x)
  const [derivative, setDerivative] = useState("3*x**2 + 8*x");   // f'(x)
  const [XM, setXM] = useState(0);
  const [error, setError] = useState(1e-6);
  const [Result, setResult] = useState<any[]>([]);

  const NewtonRaphsonMethod = (
    equation: string,
    derivative: string,
    x0: number,
    maxIter = 100
  ) => {
    const safeEq = equation
      .replaceAll("^", "**")
      .replaceAll(";", "")
      .trim();
    const f = new Function("x", "with(Math) { return " + safeEq + " }");
    const fPrime = new Function("x", "return " + derivative + ";");

    let XM = x0;
    let iter = 0;
    const steps: any[] = [];

    while (iter < maxIter) {
      const fXM = f(XM);
      const fPrimeXM = fPrime(XM);

      if (fPrimeXM === 0) {
        alert("f'(x) = 0 ทำให้หารไม่ได้");
        break;
      }

      const xNext = XM - fXM / fPrimeXM;

      steps.push({ iter, XM, fXM, fPrimeXM, xNext });

      if (Math.abs(xNext - XM) < error) break;

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
        <h1>Newton-Raphson Method</h1>

        <div>
          <h4>โจทย์ f(x)</h4>
          <InputEquation equation={equation} onChange={setEquation} />
        </div>

        <div>
          <h4>f'(x)</h4>
          <input
            type="text"
            value={derivative}
            onChange={(e) => setDerivative(e.target.value)}
          />
        </div>

        <div>
          <h4>X₀</h4>
          <input
            type="number"
            value={x0}
            onChange={(e) => setX0(parseFloat(e.target.value))}
          />
          <h4>Error</h4>
        <input type="number" value={error} onChange={(e) => setError(parseFloat(e.target.value))} />
        </div>

        <SolveButton
          onClick={() => NewtonRaphsonMethod(equation, derivative, x0)}
        />

        <h2>ผลลัพธ์ XM: {XM.toFixed(6)}</h2>

        <ResultTable
          columns={["iter", "XM", "fXM", "fPrimeXM", "xNext"]}
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

export default NewtonRaphson;
