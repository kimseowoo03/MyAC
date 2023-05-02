import { useCallback, useState, ChangeEvent } from "react";

export type InputEvent = ChangeEvent<HTMLInputElement>;

interface UseInputReturn {
  value: string;
  inputVaild: boolean;
  inputTouched: boolean;
  onChange: (event: InputEvent) => void;
  onBlurTouch: (touched: boolean) => void;
  checkVaild: (touched: boolean) => void;
  reset: () => void;
}

const useInput = (initialForm: string): UseInputReturn => {
  const [value, setValue] = useState(initialForm);
  const [inputTouched, setInputTouched] = useState(false);
  const [inputVaild, setInputVaild] = useState(false);

  const onBlurTouch = (touched: boolean) => {
    setInputTouched(touched);
  };

  const checkVaild = (touched:boolean) => {
    setInputVaild(touched)
  }

  const onChange = useCallback(
    (event: InputEvent) => {
      setValue(event.target.value);
    },
    [value]
  );

  const reset = useCallback(() => setValue(initialForm), [initialForm]);

  return { inputVaild, checkVaild, value, inputTouched, onChange, onBlurTouch, reset };
};

export default useInput;
