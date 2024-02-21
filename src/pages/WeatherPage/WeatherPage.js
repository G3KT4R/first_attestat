import { Typography, Input, Button } from "antd";
import { Header } from "../../components/Header/Header";
import Styles from "../WeatherPage/weatherPage.module.css";

export const WeatherPage = () => {
  return (
    <>
      <Header />
      <form className={Styles.wrapper}>
        <Typography.Title level={3}>Погода в городе ...</Typography.Title>
        <Typography.Title level={5} className={Styles.left}>
          Название города
        </Typography.Title>
        <Input size="small"></Input>
        <Button type="primary" className={Styles.button}>
          Войти
        </Button>
      </form>
    </>
  );
};
