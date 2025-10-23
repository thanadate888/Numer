import { useState } from "react";
import InputEquation from "../component/InputEquation";
import GraphPlot from "../component/GraphPlot";
import ResultTable from "../component/ResultTable";
import SolveButton from "../component/SolveButton";

const BisectionPage: React.FC = () => {
  const [equation, setEquation] = useState("x**3 + 4*x**2 - 10");
  const [XL, setXL] = useState(0);
  const [XR, setXR] = useState(0);
  const [XM, setXM] = useState(0);
  const [error, setError] = useState(1e-6);
  const [Result, setResult] = useState<any[]>([]);

  const Bisection = () => {
    const safeEq = equation
      .replaceAll("^", "**")
      .replaceAll(";", "")
      .trim();
    const f = new Function("x", "with(Math) { return " + safeEq + " }");

    let xl = XL, xr = XR, i = 0, XM = (xl + xr) / 2;
    const steps: any[] = [];

    while (Math.abs(xr - xl) >= error) {
      XM = (xl + xr) / 2;
      steps.push({ Iter: i, XL: xl, XR: xr, XM: XM, fXM: f(XM) });
      if (f(xl) * f(XM) < 0) xr = XM;
      else xl = XM;
      i++;
    }

    setXM(XM);
    setResult(steps);
  };

  return (
    <div className="container">
      <section className="center">
        <h1>Bisection Method</h1>
        <InputEquation equation={equation} onChange={setEquation} />

        <div>
          <h4>XL</h4>
          <input
            type="number"
            value={XL}
            onChange={(e) => setXL(parseFloat(e.target.value))}
          />
          <h4>XR</h4>
          <input
            type="number"
            value={XR}
            onChange={(e) => setXR(parseFloat(e.target.value))}
          />
          <h4>Error</h4>
          <input
            type="number"
            value={error}
            onChange={(e) => setError(parseFloat(e.target.value))}
          />
        </div>

        <SolveButton onClick={Bisection} />

        <h3>ผลลัพธ์ XM : {isFinite(XM) ? XM.toFixed(6) : "—"}</h3>

        <ResultTable
          columns={["Iter", "XL", "XR", "XM", "fXM"]}
          data={Result}
        />

        <GraphPlot
          data={[
            {
              x: Array.from({ length: 200 }, (_, i) => i / 10 - 10),
              y: Array.from({ length: 200 }, (_, i) => {
                const safeEq = equation
                  .replaceAll("^", "**")
                  .replaceAll(";", "")
                  .trim();
                try {
                  return new Function(
                    "x",
                    "with(Math) { return " + safeEq + "; }"
                  )(i / 10 - 10);
                } catch {
                  return NaN;
                }
              }),
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

export default BisectionPage;
