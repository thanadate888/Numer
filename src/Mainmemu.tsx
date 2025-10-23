import React from "react";
import { Link } from "react-router-dom";

const Main: React.FC = () => {
  return (
    
    <div >
      
      <section className="container">
        <h1 className="center">Numer Menu</h1>
      <nav className="nav-links">
        <section className="column"> 
        <Link to="/bisection">Bisection Method</Link>
        <Link to="/falseposition">False Position Method</Link>
        <Link to="/onepointiteration">One-point Iteration Method</Link>
        <Link to="/newtonraphson">Newton Raphson Method</Link>
        <Link to="/secant">Secant Method</Link>
        <Link to="/cramer">Cramer's Rule</Link>
        <Link to="/GaussianElimination">GaussianElimination</Link>
        <Link to="/MatrixInversion">Matrix Inversion</Link>
        <Link to="/LUDecomposition">LU Decomposition</Link>
        <Link to="/CholeskyDecomposition">CholeskyDecomposition</Link>
        <Link to="/JacobiIterationMethod">Jacobi Iteration Method</Link>
        <Link to="/GaussSeidel">GaussSeidel</Link>
        <Link to="/ConjugateGradientMethod">ConjugateGradientMethod</Link>
        <Link to="/Interpolationextrapolation">Interpolation&Extrapolation</Link>
        <Link to="/LinearRegression">LinearRegression</Link>
        <Link to="/PolynomialRegression">PolynomialRegression</Link>
        <Link to="/MultipleLinearRegression">MultipleLinearRegression</Link>
        <Link to="/SingleTrapezoidalRule">SingleTrapezoidalRule</Link>
        <Link to="/CompositeTrapezoidalRule">CompositeTrapezoidalRule</Link>
        <Link to="/SimpsonRule">SimpsonRule</Link>
        <Link to="/CompositesimpsonRule">CompositesimpsonRule</Link>
        <Link to="/Ordinarydifferentialequations">Ordinarydifferentialequations</Link>
        <Link to="/SecondDerivative">SecondDerivative</Link>
        
        </section>
      </nav>
      </section>
      
    </div>
  );
};

export default Main;