import { Header } from "../../components/Header/Header";
import Styles from "../RegistrationPage/registrationPage.module.css";
import { Link } from "react-router-dom";
import { Input, Button, Form, Typography } from "antd";

export const RegistrationPage = () => {
  const [form] = Form.useForm();

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
  return (
    <>
      <Header />

      <Form form={form} {...formItemLayout} className={Styles.wrapper}>
        <Typography.Title level={3} className={Styles.center}>
          Регистрация
        </Typography.Title>
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
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
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

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
        {/* <Typography.Title level={3} className={Styles.center}>
            Регистрация
          </Typography.Title>
          <Typography.Title level={5}>Логин</Typography.Title>
          <Input size="small"></Input>
          <Typography.Title level={5}>Email</Typography.Title>
          <Input size="small"></Input>
          <Typography.Title level={5}>Пароль</Typography.Title>
          <Input.Password size="small"></Input.Password>
          <Typography.Title level={5}>Повтор пароля</Typography.Title>
          <Input.Password size="small"></Input.Password>
          <div className={Styles.center}>
            <Button type="primary">Зарегистрироваться</Button>
          </div>
          <form className={Styles.center}>
            <Typography.Title level={5}>
              У Вас уже есть аккаунт? <Link to="/login">Войти</Link>
            </Typography.Title>
          </form> */}
        <form className={Styles.center}>
          <Typography.Title level={5}>
            У Вас уже есть аккаунт? <Link to="/login">Войти</Link>
          </Typography.Title>
        </form>
      </Form>
    </>
  );
};
