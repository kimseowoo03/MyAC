import { useCallback, useState, ChangeEvent } from "react";

type InputEvent = ChangeEvent<HTMLInputElement>;

interface UseInputReturn {
  value: string;
  onChange: (event: InputEvent) => void;
  reset: () => void;
}

const useInput = (initialForm: string): UseInputReturn => {
  const [value, setValue] = useState(initialForm);

  const onChange = useCallback(
    (event: InputEvent) => {
      setValue(event.target.value);
    },
    [value]
  );

  const reset = useCallback(() => setValue(initialForm), [initialForm]);

  return { value, onChange, reset };
};


export default useInput;
