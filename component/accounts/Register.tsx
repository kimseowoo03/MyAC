import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import useInput from "../../hooks/useInput";
import Input from "../Input";

import axios, { AxiosError } from "axios";

import style from "../../styles/Register.module.scss";

function Register() {
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");

  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const  handleConfirmPasswordBlur = () => {
    setPasswordMatch(password.value === confirmPassword.value)
  }

  const  handlePasswordBlur = () => {
    let reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/
    setIsPasswordValid(reg.test(password.value.toString()))
  }

  const handleEmailExistence = async () => {
    try {
      const emailRegex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{3,3}$/i;
      if (email.value.trim() === "" || !emailRegex.test(email.value))
        return setIsEmailValid(true)

      const res = await axios.post("/api/check-email-exist", {
        email: email.value,
      });

      switch (res.status) {
        case 200:
          setDuplicateEmail(false);
          break;
        default:
          console.warn(`status code: ${res.status}`);
          break;
      }
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) {
        console.log("response가 없습니다.");
      } else if (err.response.status === 409) {
        setDuplicateEmail(true);
      } else {
        console.warn(`error: ${err.message}`);
      }
    }
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(name.value, email.value, password.value);
    try {
      const res = await axios.post('/api/register', {
        "name": "김유나",
        "email": "kimyuna@gmail.com",
        "password": "1234567890"
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  const renderInnerIcon =() => {
    if (showPassword) {
      return (
        <AiFillEye
          className={style["show-password-icon"]}
          onClick={showPasswordToggle}
        />
      );
    } else {
      return (
        <AiFillEyeInvisible
          className={style["show-password-icon"]}
          onClick={showPasswordToggle}
        />
      );
    }
  }

  return (
    <div className={style.layout}>
      <div className={style.content}>
        <h1>회원가입</h1>
        <form className={style.form} onSubmit={onSubmitHandler}>
          <Input
            label={"이름"}
            type={"text"}
            value={name.value}
            onChange={name.onChange}
            autoComplete={"off"}
          />
          <Input
            label={"이메일"}
            type={"email"}
            value={email.value}
            onChange={email.onChange}
            autoComplete={"off"}
            onBlur={handleEmailExistence}
          />
          {isEmailValid && <p className={style.alert}>이메일 양식에 맞지 않습니다.</p>}
          {duplicateEmail && <p className={style.alert}>이미 사용중이거나 탈퇴한 아이디입니다.</p>}

          <Input
            label={"비밀번호"}
            type={showPassword ? "text" : "password"}
            value={password.value}
            onChange={password.onChange}
            autoComplete={"off"}
            innerIcon={renderInnerIcon()}
            onBlur={handlePasswordBlur}
          />
          {!isPasswordValid && <p className={style.success}>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</p>}
          <Input
            label={"비밀번호 확인"}
            type={"password"}
            value={confirmPassword.value}
            onChange={confirmPassword.onChange}
            autoComplete={"off"}
            onBlur={handleConfirmPasswordBlur}
          />
          {!passwordMatch && <p className={style.alert}>비밀번호가 일치하지 않습니다.</p>}
          <button type="submit">회원가입</button>
          <p>
            회원인가요?<a href="/login">로그인</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
