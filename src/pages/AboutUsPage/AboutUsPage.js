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
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
          dolor perferendis id, possimus nesciunt libero quibusdam blanditiis
          architecto explicabo accusamus corporis fugit aut ut quo voluptatibus
          velit reprehenderit, repudiandae veniam. Alias error, repudiandae iste
          nobis distinctio et atque voluptates unde, provident vero dolorem
          maiores architecto impedit! Hic vitae mollitia maxime?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
          dolor perferendis id, possimus nesciunt libero quibusdam blanditiis
          architecto explicabo accusamus corporis fugit aut ut quo voluptatibus
          velit reprehenderit, repudiandae veniam. Alias error, repudiandae iste
          nobis distinctio et atque voluptates unde, provident vero dolorem
          maiores architecto impedit! Hic vitae mollitia maxime?
        </p>
        <div className={Style.image}>
          <Image src="./1.png" width={500} />
        </div>
      </div>
    </>
  );
};
