import style from "../styles/Input.module.scss";
import { InputEvent } from "../hooks/useInput";

interface InputProps {
  label?: string;
  type: "text" | "email" | "password";
  value: string;
  placeholder?: string;
  onChange: (event: InputEvent) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  autoComplete: "off";
  innerIcon?: React.ReactNode
}

const Input = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  autoComplete,
  onBlur,
  innerIcon
}: InputProps) => {
  return (
    <div className={style["form-input"]}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        onBlur={onBlur}
      />
      {innerIcon}
    </div>
  );
};

export default Input;
