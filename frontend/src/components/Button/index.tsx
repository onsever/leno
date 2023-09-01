import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
  const { children, className, ...rest } = props;
  return (
    <button
      className={`bg-primary text-white py-2 px-4 rounded-lg ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
