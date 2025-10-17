import React from "react";
import { Link } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <div >
      <head>
        <title>Main Menu</title>
      </head>
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
        </section>
      </nav>
      </section>
      
    </div>
  );
};

export default Main;