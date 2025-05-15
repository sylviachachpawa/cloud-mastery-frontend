 
import { ReactNode } from "react";

type ButtonProps = {
  label: string;
  icon?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const Button = ({ label, icon, type = "button", onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="cursor-pointer border border-sky-50 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 p-1.5 font-medium rounded-md transition"
    >
      {label}
      {icon && icon}
    </button>
  );
};

export default Button;
