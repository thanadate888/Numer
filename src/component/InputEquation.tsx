import React from "react";

interface InputEquationProps {
  equation: string;
  onChange: (value: string) => void;
}

const InputEquation: React.FC<InputEquationProps> = ({ equation, onChange }) => (
  <div>
    <h3>กรอกสมการ f(x):</h3>
    <input
      type="text"
      value={equation}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: "300px", padding: "5px", textAlign: "center" }}
    />
  </div>
);

export default InputEquation;