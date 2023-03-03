import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("회원가입 버튼 클릭");
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <p>회원가입</p>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>이름</label>
          <input type="text" name="name" value={name} onChange={onNameChange} />
        </div>
        <div>
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onEmailChange}
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={onPasswordChange}
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
