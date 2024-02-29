import { Header } from "../../components/Header/Header";
import Styles from "../LoginPage/loginPage.module.css";
import { Input, Typography, Button, Form } from "antd";
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

export const LoginPage = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");
  const [isResultSuccess, setIsResultSuccess] = useState();
  const onFinish = (values) => {
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      body: JSON.stringify({ values }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then(function (data) {
        setMessage(data.message);
        setIsResultSuccess(data.success);
      })
      .catch(function (error) {
        console.warn("Something went wrong.", error);
      });
  };

  const messageClass = isResultSuccess ? Styles.success : Styles.error;

  return (
    <>
      <Header />
      <div className={`${Styles.message} ${messageClass}`}>
        {message}
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            maxWidth: 500,
            width: "100%",
          }}
          scrollToFirstError
          className={Styles.wrapper}
        >
          <Typography.Title level={3}>Авторизация</Typography.Title>
          <Form.Item
            name="login"
            label="Login"
            rules={[
              {
                required: true,
                message: "Please input your login!",
              },
              {
                validator: (_, value) => {
                  if (value === "") {
                    return Promise.reject();
                  } else if (/^[a-zA-Z0-9]+$/.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      "Login should include numbers and latin letters only"
                    );
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                validator: (_, value) => {
                  if (value === "") {
                    return Promise.reject();
                  } else if (/^[a-z]+$/.test(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      "Password should include low latin letters only"
                    );
                  }
                },
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
