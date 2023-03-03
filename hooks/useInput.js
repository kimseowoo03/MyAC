import { useCallback, useState } from "react";

const useInput = (initialForm) => {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setForm({ ...form, [name]: value });
    },
    [form]
  );
  const reset = () => setForm(initialForm);
  return [form, onChange, reset];
};

export default useInput;
