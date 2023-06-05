import { useState } from "react";
import style from "../../styles/Login.module.scss";
import axios, { AxiosError } from "axios";
import useInput from "../../hooks/useInput";

import Input from "../Input";


function Login() {
  const email = useInput("");
  const password = useInput("");

  const [errorText, setErrorText] = useState(false);

  const isForm = email.inputVaild && password.value

  const handleEmailBlur = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email.value)) {
      email.onBlurTouch(true)
      email.checkVaild(false)
    } else {
      email.checkVaild(true)
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/login", {
        email: email.value,
        password: password.value,
      });
      setErrorText(false)
      if(res.status === 200){
        alert("로그인 성공")
      }
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        console.warn("response가 없습니다.");
      } else {
        setErrorText(true)
        password.reset()
        console.warn(`error: ${err.message}`);
      }
    }
  };

  return (
    <div className={style.layout}>
      <div className={style.content}>
        <h1>로그인</h1>
        <form onSubmit={handleSubmit} className={style.form}>
          <Input
            label={"이메일"}
            type={"email"}
            value={email.value}
            placeholder={"이메일"}
            onChange={email.onChange}
            autoComplete={"off"}
            onBlur={handleEmailBlur}
          />
          {!email.inputVaild && email.inputTouched && <p className={style.alert}>이메일 양식에 맞게 입력해주세요</p>}
          <Input
            label={"비밀번호"}
            type={"password"}
            value={password.value}
            placeholder={"비밀번호"}
            onChange={password.onChange}
            autoComplete={"off"}
          />
          {errorText && (
            <p className={style.alert}>
              이메일또는 비밀번호를 잘못 입력했습니다.
              <br /> 입력하신 내용을 다시 확인해주세요
            </p>
          )}
          <button disabled={!isForm} type="submit">로그인</button>
          <p>
            회원이 아니신가요?<a href="/register">회원가입</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
