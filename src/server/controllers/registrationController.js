import { users } from "../index.js";

export const registration = async (req, res) => {
  const { login, password } = req.body.values;

  const currentUserFromDB = users.find((user) => user.login === login);

  if (currentUserFromDB) {
    res.send(
      JSON.stringify({
        message: "Извините, пользователь с такими данными зарегистрирован",
        success: false,
      })
    );
  } else {
    users.push({ login, password });
    res.send(
      JSON.stringify({ message: "Регистрация прошла успешно", success: true })
    );
  }
};
