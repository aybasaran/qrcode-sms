import { FC } from "react";
import cn from "../assets/utils/cn.util";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({ label, isLoading, className, ...props }) => {
  return (
    <button
      className={cn(
        "font-bold py-2 px-4 rounded",
        {
          "cursor-not-allowed": isLoading,
        },
        className
      )}
      {...props}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;
