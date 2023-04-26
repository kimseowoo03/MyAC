import { useState } from "react";

import style from "../styles/Header.module.scss";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isToggled, setIsToggled] = useState(false);

  const onClickMenuBtn = () => {
    setIsToggled(!isToggled);
  };

  const navMenuStyle = isToggled ? style.nav_menu : style.display_none
  const navUserStyle = isToggled ? style.nav_user : style.display_none

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.nav_loge}>
          <a href="">마이하근</a>
        </div>
        <ul className={navMenuStyle}>
          <li>
            <a>홈</a>
          </li>
          <li>
            <a>학점이수계획표</a>
          </li>
          <li>
            <a>학점계산기</a>
          </li>
        </ul>
        <div className={navUserStyle}>
          <a>로그인</a>
        </div>
        <a className={style.nav_toogleBtn}>
          {isToggled ? <FiX onClick={onClickMenuBtn} className={style.nav_toogleBtn} />:<FiMenu onClick={onClickMenuBtn} className={style.nav_toogleBtn} />  }
        </a>
      </nav>
    </header>
  );
};

export default Header;
