import { Image } from "antd";
import { Header } from "../../components/Header/Header";
import Style from "../AboutUsPage/aboutUsPage.module.css";

export const AboutUsPage = () => {
  return (
    <>
      <Header />
      <div className={Style.wrapper}>
        <h2>О нас</h2>
        <p>
          Данный сервис демонстрирует погоду в зависимости от выбранного
          пользователем местоположения.
        </p>
        <p>Спасибо, что выбрали нас!</p>
        <div className={Style.image}>
          <Image src="./1.png" width={500} />
        </div>
      </div>
    </>
  );
};
