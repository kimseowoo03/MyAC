import { useState } from "react";

import style from "../styles/Header.module.scss";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isToggled, setIsToggled] = useState(false);

  const onClickMenuBtn = () => {
    setIsToggled(!isToggled);
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.nav_loge}>
          <a href="">마이하근</a>
        </div>
        <nav className={isToggled ? style.nav : style["display-none"]}>
          <ul className={style.nav_menu}>
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
          <div className={style.nav_user}>
            <a href="/login">로그인</a>
          </div>
        </nav>
        <a className={style.nav_toogleBtn}>
          {isToggled ? (
            <FiX onClick={onClickMenuBtn} className={style.nav_toogleBtn} />
          ) : (
            <FiMenu onClick={onClickMenuBtn} className={style.nav_toogleBtn} />
          )}
        </a>
      </div>
    </header>
  );
};

export default Header;
