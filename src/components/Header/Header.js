import { Link } from "react-router-dom";
import Styles from "./header.module.css";
import { Button } from "antd";
export const Header = () => {
  return (
    <>
      <div className={Styles.wrapper}>
        <h2>Aboba</h2>
        <Button className={Styles.item} type="primary">
          <Link to="/login">Авторизация</Link>
        </Button>
        <Button className={Styles.item} type="primary">
          <Link to="/registration">Регистрация</Link>
        </Button>
        <Button className={Styles.item} type="primary">
          <Link to="/about-us">О нас</Link>
        </Button>
        <Button className={Styles.item} type="primary">
          <Link to="/weather">Погода</Link>
        </Button>
      </div>
    </>
  );
};
