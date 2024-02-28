import { Typography, Input, Button, Form } from "antd";
import { Header } from "../../components/Header/Header";
import Styles from "../WeatherPage/weatherPage.module.css";
import { useEffect, useState } from "react";
import { useGetWeatherQuery } from "../../store/weatherApi";
import { usePostWeatherInfoMutation } from "../../store/postWeatherApi";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const WeatherPage = () => {
  const [form] = Form.useForm();
  const [city, setCity] = useState("initialState");
  const { data = [], error, isLoading } = useGetWeatherQuery(city);
  const [postWeatherInfo, { isError }] = usePostWeatherInfoMutation();
  const [cityInfo, setCityInfo] = useState(null);
  const [errorObj, setErrorObj] = useState("");

  useEffect(() => {
    setErrorObj(error);
    if (error) {
      setCityInfo(null);
    }
    if (city === "") {
      setErrorObj("");
    }
  }, [error, city]);

  const onFinish = async () => {
    setCityInfo(data);
    if (cityInfo) {
      await postWeatherInfo({
        name: cityInfo?.location.name,
        date: cityInfo?.location.localtime,
        temperature: cityInfo?.current.temp_c,
        speed: cityInfo?.current.wind_kph,
      }).unwrap();
    }
  };

  return (
    <>
      <Header />
      <Form
        className={Styles.wrapper}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 500,
          width: "100%",
        }}
        scrollToFirstError
      >
        <Typography.Title level={3}>Введите название города</Typography.Title>
        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: "Please input city name.",
            },
            {
              validator: (_, value) => {
                setCity(value);
                if (value === "") {
                  return Promise.reject();
                } else if (/^[a-zA-Z]+$/.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    "City should include latin letters only"
                  );
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Найти
          </Button>
        </Form.Item>
        <div></div>
      </Form>
      {cityInfo && (
        <div className={Styles.out}>
          <div>Название города: {cityInfo.location.name}</div>
          <div>Дата и время: {cityInfo.location.localtime}</div>
          <div>Температура, С: {cityInfo.current.temp_c}</div>
          <div>Скорость ветра, км/ч: {cityInfo.current.wind_kph}</div>
        </div>
      )}
    </>
  );
};
