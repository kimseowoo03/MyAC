import { useState } from "react";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Register() {
  const [inputValue, setInputValue] = useState({
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
    console.log("회원가입 버튼 클릭");
  };

  const onChange = (event) => {
    const { value, name } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <div>
      <p>회원가입</p>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={inputValue.name}
            onChange={onChange}
          />
        </div>
        <div>
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={inputValue.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={inputValue.password}
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
