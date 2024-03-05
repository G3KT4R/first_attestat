const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const users = [];
const weatherData = [];

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

//-----------------------------------------------------------

const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  port: 8002,
  database: "postgres",
  user: "postgres",
  password: "postgres",
});

const writeCityWeatherData = async (dataToWrite) => {
  console.log(dataToWrite);
  const { name, localtime, temp_c, gust_kph } = dataToWrite;
  pool.connect(function (err, client, done) {
    if (err) {
      return console.error("connetion error", err);
    }
    client.query(
      "INSERT INTO cities(name, local_time, temp_c, gust_kph) VALUES($1, $2, $3, $4)",
      [name, localtime, Math.floor(temp_c), Math.floor(gust_kph)],
      function (err, result) {
        // call `done()` to release the client back to the pool
        done();

        if (err) {
          return console.error("error running query", err);
        }
        console.log("-->", result);
      }
    );
  });
};

const weatherController = async (req, res) => {
  writeCityWeatherData(req.body);
  res.end();
};

app.post("/weather", weatherController);

// app.post("/weather", async (req, res) => {
//   const { name } = req.body.name;
//   const { localtime } = req.body.localtime;
//   const { temp_c } = req.body.temp_c;
//   const { gust_kph } = req.body.gust_kph;
//   weatherData.push({ name, localtime, temp_c, gust_kph });
//   res.send(
//     JSON.stringify({
//       message: "Данные погоды занесены на сервер",
//       success: true,
//     })
//   );
// });

app.listen(8000, () => {
  console.log("server running");
});
