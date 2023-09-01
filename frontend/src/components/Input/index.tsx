import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  const { className, ...rest } = props;
  return (
    <input
      className={`rounded-lg py-2 px-4 border border-b-gray-300 ${className} outline-none focus:border-primary`}
      {...rest}
    />
  );
}
