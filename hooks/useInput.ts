import { useCallback, useState, ChangeEvent } from "react";

export type InputEvent = ChangeEvent<HTMLInputElement>;

interface UseInputReturn {
  value: string;
  inputTouched: boolean;
  onChange: (event: InputEvent) => void;
  onBlurTouch: (x: boolean) => void;
  reset: () => void;
}

const useInput = (initialForm: string): UseInputReturn => {
  const [value, setValue] = useState(initialForm);
  const [inputTouched, setInputTouched] = useState(false);

  const onBlurTouch = (touched: boolean) => {
    setInputTouched(touched);
  };

  const onChange = useCallback(
    (event: InputEvent) => {
      setValue(event.target.value);
    },
    [value]
  );

  const reset = useCallback(() => setValue(initialForm), [initialForm]);

  return { value, inputTouched, onChange, onBlurTouch, reset };
};

export default useInput;
