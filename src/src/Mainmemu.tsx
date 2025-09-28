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
        <Link to="/bisection">Bisection Method</Link>
        <Link to="/falseposition">False Position Method</Link>
      </nav>
      </section>
      
    </div>
  );
};

export default Main;