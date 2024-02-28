import { Link } from "react-router-dom";
import Styles from "./header.module.css";
import { Button, Typography } from "antd";
export const Header = () => {
  return (
    <>
      <div className={Styles.wrapper}>
        <Typography.Title level={1}>Aboba</Typography.Title>
        <div>
          <Link className={Styles.item} to="/">
            <Button type="primary">Авторизация</Button>
          </Link>
          <Link className={Styles.item} to="/registration">
            <Button type="primary">Регистрация</Button>
          </Link>
          <Link className={Styles.item} to="/about-us">
            <Button type="primary">О нас</Button>
          </Link>
          <Link className={Styles.item} to="/weather">
            <Button type="primary">Погода</Button>
          </Link>
        </div>
      </div>
    </>
  );
};
