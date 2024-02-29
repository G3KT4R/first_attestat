const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const users = [];

app.use(cors());
app.use(bodyParser.json());

app.post("/registration", async (req, res) => {
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
});

app.post("/login", async (req, res) => {
  const { login } = req.body.values;

  const currentUserFromDB = users.find((user) => user.login === login);

  if (currentUserFromDB) {
    res.send(
      JSON.stringify({ message: "Авторизация прошла успешно", success: true })
    );
  } else {
    res.send(
      JSON.stringify({
        message: "Извините, вы ввели некорректные данные",
        success: false,
      })
    );
  }
});

app.post("/weather", async (req, res) => {
  const { name } = req.body.name;
  const { localtime } = req.body.localtime;
  const { temp_c } = req.body.temp_c;
  const { gust_kph } = req.body.gust_kph;
  users.push({ name, localtime, temp_c, gust_kph });
  res.send(
    JSON.stringify({
      message: "Данные погоды занесены на сервер",
      success: true,
    })
  );
});

app.listen(8000, () => {
  console.log("server running");
});
