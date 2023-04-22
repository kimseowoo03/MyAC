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
}

const Input = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  autoComplete,
  onBlur,
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
    </div>
  );
};

export default Input;
