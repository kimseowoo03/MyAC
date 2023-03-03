import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import useInput from "../hooks/useInput";

function Register() {
  const [{ name, email, password }, onChange, reset] = useInput({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(name, email, password);
    reset();
  };

  return (
    <div>
      <p>회원가입</p>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>이름</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div>
          <label>이메일</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={onChange}
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
