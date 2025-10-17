import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Mainmemu";
import Bisection from "./Bisection";
import FalsePosition from "./FalsePosition";
import OnePointIteration from "./One-point-Iteration";
import NewTonRaphson from "./newtonraphson";
import Secant from "./secant";
import Cramer from "./Cramer";
import GaussianElimination from "./GaussianElimination";

function App() {
  return (
    <BrowserRouter basename="/Numer">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/bisection" element={<Bisection />} />
        <Route path="/falseposition" element={<FalsePosition />} />
        <Route path="/onepointiteration" element={<OnePointIteration />} />
        <Route path="/newtonraphson" element={<NewTonRaphson />} />
        <Route path="/secant" element={<Secant />} />
        <Route path="/cramer" element={<Cramer />} />
        <Route path="/GaussianElimination" element={<GaussianElimination />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
