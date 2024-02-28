//! Поскольку не разобрался почему некорректно работают импорты при попытке запуска команды 'node index.js'
//! пользовался следующей командой для старта сервера: 'node --experimental-specifier-resolution=node index.js'

//import express from "express";
//import bodyParser from "body-parser";
//import cors from "cors";
//import { registration } from "./controllers/registrationController";
//import { login } from "./controllers/loginColntroller";
//import { weatherController } from "./controllers/weatherController";

//import pkg from "pg";
const pkg = require("pg");
const pool = new pkg.Pool({
  host: "http://localhost/",
  port: 9000,
  database: "test",
  user: "postgres",
  password: "postgres",
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const users = [];

app.use(cors());
app.use(bodyParser.json());

//app.post("/registration", registration);
//app.post("/login", login);

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
  //writeCityWeatherData(req.body);
  const { name, data_and_time, temp_c, wind_kph } = req.body;
  console.log("REQBODY:", req.body);
  pool.connect(function (err, client, done) {
    if (err) {
      return console.error("connetion error", err);
    }
    client.query(
      "INSERT INTO att2(name, date_and_time, temp_c, wind_kph) VALUES($1, $2, $3, $4)",
      [name, data_and_time, Math.floor(temp_c), Math.floor(wind_kph)],
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
  res.end();
});

app.listen(9500, () => {
  console.log("server running on port 9500");
});
