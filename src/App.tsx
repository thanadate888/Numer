import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Mainmemu";
import Bisection from "./page/Bisection";
import FalsePosition from "./page/FalsePosition";
import OnePointIteration from "./page/One-point-Iteration";
import NewTonRaphson from "./page/newtonraphson";
import Secant from "./page/secant";
import Cramer from "./page/Cramer";
import GaussianElimination from "./page/GaussianElimination";
import MatrixInversion from "./page/Matrix Inversion";
import LUDecomposition from "./page/LUDecomposition";
import CholeskyDecomposition from "./page/CholeskyDecomposition";
import JacobiIterationMethod from "./page/JacobiIterationMethod";
import GaussSeidel from "./page/GaussSeidelIterationMethod";
import Conjugategradientmethod from "./page/ConjugateGradientMethod";
import Interpolationextrapolation from "./page/Interpolation&Extrapolation";
import Linearregression from "./page/LinearRegression";
import Polynomialregression from "./page/PolynomialRegression";
import Multiplelinearregression from "./page/MultipleLinearRegression";
import SingleTrapezoidalRule from "./page/SingleTrapezoidalRule";
import CompositeTrapezoidalRule from "./page/CompositeTrapezoidalRule";
import SimpsonRule from "./page/SimpsonRule";
import CompositesimpsonRule from "./page/CompositeSimpsonRule"; 
import Ordinarydifferentialequations from "./page/OrdinaryDifferentialEquations";
import SecondDerivative from "./page/SecondDerivative";
function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/bisection" element={<Bisection />} />
        <Route path="/falseposition" element={<FalsePosition />} />
        <Route path="/onepointiteration" element={<OnePointIteration />} />
        <Route path="/newtonraphson" element={<NewTonRaphson />} />
        <Route path="/secant" element={<Secant />} />
        <Route path="/cramer" element={<Cramer />} />
        <Route path="/GaussianElimination" element={<GaussianElimination />} />
        <Route path="/MatrixInversion" element={<MatrixInversion />} />
        <Route path="/LUDecomposition" element={<LUDecomposition />} />
        <Route path="/CholeskyDecomposition" element={<CholeskyDecomposition />} />
        <Route path="/JacobiIterationMethod" element={<JacobiIterationMethod />} />
        <Route path="/GaussSeidel" element={<GaussSeidel />} />
        <Route path="/ConjugateGradientMethod" element={<Conjugategradientmethod />} />
        <Route path="/InterpolationExtrapolation" element={<Interpolationextrapolation />} />
        <Route path="/LinearRegression" element={<Linearregression />} />
        <Route path="/Polynomialregression" element={<Polynomialregression />} />
        <Route path="/Multiplelinearregression" element={<Multiplelinearregression />} />
        <Route path="/SingleTrapezoidalRule" element={<SingleTrapezoidalRule />} />
        <Route path="/CompositeTrapezoidalRule" element={<CompositeTrapezoidalRule />} />
        <Route path="/SimpsonRule" element={<SimpsonRule />} />
        <Route path="/CompositesimpsonRule" element={<CompositesimpsonRule />} />
        <Route path="/Ordinarydifferentialequations" element={<Ordinarydifferentialequations />} />
        <Route path="/SecondDerivative" element={<SecondDerivative />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
