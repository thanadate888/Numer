import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Mainmemu";
import Bisection from "./page/Bisection";
import FalsePosition from "./page/FalsePosition";
import OnePointIteration from "./page/One-point-Iteration";
import NewTonRaphson from "./page/newtonraphson";
import Secant from "./page/secant";
import Cramer from "./page/Cramer";
import GaussianElimination from "./page/GaussianElimination";

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
