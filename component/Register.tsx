import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import useInput from "../hooks/useInput";

function Register() {
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");

  const [showPassword, setShowPassword] = useState(false);

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const allInputValuesReset = () => {
    name.reset();
    email.reset();
    password.reset();
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(name.value, email.value, password.value)
    allInputValuesReset()
  };

  return (
    <div>
      <p>회원가입</p>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>이름</label>
          <input type="text" name="name" value={name.value} onChange={name.onChange} />
        </div>
        <div>
          <label>이메일</label>
          <input type="email" name="email" value={email.value} onChange={email.onChange} />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password.value}
            onChange={password.onChange}
          />
          {showPassword ? (
            <AiFillEye onClick={showPasswordToggle} />
          ) : (
            <AiFillEyeInvisible onClick={showPasswordToggle} />
          )}
        </div>
        <div>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
