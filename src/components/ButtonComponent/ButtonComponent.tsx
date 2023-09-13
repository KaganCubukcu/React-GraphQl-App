import React from "react";

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => (
  <button disabled={disabled} onClick={onClick}>
    {text}
  </button>
);

export default Button;
