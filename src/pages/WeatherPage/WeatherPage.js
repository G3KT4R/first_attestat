import { Typography, Input, Button, Form } from "antd";
import { Header } from "../../components/Header/Header";
import Styles from "../WeatherPage/weatherPage.module.css";
import { useState } from "react";

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

// https://api.weatherapi.com/v1/current.json?key=e76d25837642475daed173913232212&q=Moscow&aqi=no

export const WeatherPage = () => {
  const [form] = Form.useForm();
  const [city, setCity] = useState("initialState");
  const [cityInfo, setCityInfo] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = (values) => {
    fetch(
      ` https://api.weatherapi.com/v1/current.json?key=6513546f07374d0fb24113839240201&q=${city}&aqi=no`,
      {
        method: "POST",
        body: JSON.stringify({ values }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        setCityInfo(data);
        setErrorMessage("");
      })
      .catch(function (error) {
        setErrorMessage("Города с таким наименованием не существует.");
        setCityInfo();
        console.warn("Something went wrong.", error);
      });
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
          <div>Скорость ветра, км/ч: {cityInfo.current.gust_kph}</div>
        </div>
      )}
    </>
  );
};
