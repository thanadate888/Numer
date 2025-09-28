
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Mainmemu";
import Bisection from "./Bisection";
import FalsePosition from "./FalsePosition";

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/bisection" element={<Bisection />} />
        <Route path="/falseposition" element={<FalsePosition />} />
      </Routes>
    </Router>
  );
}

export default App;