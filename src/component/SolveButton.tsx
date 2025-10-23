interface SolveButtonProps {
  onClick: () => void;
  label?: string;
}

const SolveButton: React.FC<SolveButtonProps> = ({ onClick, label = "คำนวณ" }) => (
  <button className="button"
    onClick={onClick}
  >
    {label}
  </button>
);

export default SolveButton;