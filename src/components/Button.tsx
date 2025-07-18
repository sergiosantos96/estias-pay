interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button
      className="bg-teal-600 text-white text-base cursor-pointer rounded p-2"
      onClick={onClick}
    >
      {icon && <span className="">{icon}</span>}
      {text && <span className="">{text}</span>}
    </button>
  );
};

export default Button;
