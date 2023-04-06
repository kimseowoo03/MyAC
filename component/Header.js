import { useState } from "react";

import style from "./Header.module.css";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isToggleBtn, setIsToggleBtn] = useState(true);

  const onClickMenuBtn = () => {
    setIsToggleBtn(!isToggleBtn);
  };

  const navMenuStyle = isToggleBtn ? style.nav_menu : style.display_none
  const navUserStyle = isToggleBtn ? style.nav_user : style.display_none

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.nav_loge}>
          <a href="">MyAC</a>
        </div>
        <ul className={navMenuStyle}>
          <li>
            <a>홈</a>
          </li>
          <li>
            <a>학점계획표</a>
          </li>
          <li>
            <a>학점계산기</a>
          </li>
        </ul>
        <div className={navUserStyle}>
          <a>로그인</a>
        </div>
        <a className={style.nav_toogleBtn}>
          {isToggleBtn ? <FiX onClick={onClickMenuBtn} className={style.nav_toogleBtn} />:<FiMenu onClick={onClickMenuBtn} className={style.nav_toogleBtn} />  }
        </a>
      </nav>
    </header>
  );
};

export default Header;
