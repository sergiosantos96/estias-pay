interface ButtonProps {
  text?: string;
  type?: "button" | "submit";
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type,
  icon,
  onClick,
  className = "",
}) => {
  const baseClass =
    "bg-teal-500 hover:bg-teal-700 transition duration-200 ease-in-out text-white text-base cursor-pointer rounded p-2 px-4 flex justify-center items-center gap-2 rounded-full border border-teal-500";

  return (
    <button
      className={`${baseClass} ${className}`}
      type={type}
      onClick={onClick}
    >
      {icon && <span className="">{icon}</span>}
      {text && <span className="">{text}</span>}
    </button>
  );
};

export default Button;
