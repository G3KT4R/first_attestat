import { Header } from "../../components/Header/Header";
import Styles from "../LoginPage/loginPage.module.css";
import { Input, Typography, Button } from "antd";

export const LoginPage = () => {
  return (
    <>
      <Header />
      <form className={Styles.wrapper}>
        <Typography.Title level={3}>Авторизация</Typography.Title>
        <Typography.Title level={5} className={Styles.left}>
          Логин
        </Typography.Title>
        <Input size="small"></Input>
        <Typography.Title level={5} className={Styles.left}>
          Пароль
        </Typography.Title>
        <Input.Password size="small"></Input.Password>
        <div></div>
        <div>
          <Button type="primary" className={Styles.button}>
            Войти
          </Button>
        </div>
      </form>
    </>
  );
};
