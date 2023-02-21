// "use client";
import { useState } from "react";

import style from "./Header.module.css";
import classNames from "classnames";
import { FiMenu } from "react-icons/fi";
const Header = () => {
  const [isToggleBtn, setIsToggleBtn] = useState(true);

  const onClickMenuBtn = () => {
    setIsToggleBtn(!isToggleBtn);
  };
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <h1>MyAC</h1>
        <ul
          className={classNames(style.nav_menu, {
            [style.display_none]: isToggleBtn,
          })}
        >
          <li>
            <a>홈</a>
          </li>
          <li>
            <a>학점이수계획표</a>
          </li>
          <li>
            <a>학점성적계산기</a>
          </li>
        </ul>
        <ul
          className={classNames(
            style.nav_userMenu,
            // [style.display_none]: isToggleBtn,
            isToggleBtn && style.display_none
          )}
        >
          <li>
            <a>로그인</a>
          </li>
        </ul>
        <FiMenu onClick={onClickMenuBtn} className={style.nav_toogleBtn} />
      </nav>
    </header>
  );
};

export default Header;
