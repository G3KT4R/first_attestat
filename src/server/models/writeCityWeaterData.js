import pkg from "pg";

const pool = new pkg.Pool({
  host: "http://localhost/",
  port: 9000,
  database: "test",
  user: "postgres",
  password: "postgres",
});

export const writeCityWeatherData = async (dataToWrite) => {
  console.log("datatowrite: ", dataToWrite);
  const { name, date_and_time, temp_c, wind_kph } = dataToWrite;
  pool.connect(function (err, client, done) {
    if (err) {
      return console.error("connetion error", err);
    }
    client.query(
      "INSERT INTO att2(name, date_and_time, temp_c, wind_kph) VALUES($1, $2, $3, $4)",
      [name, date_and_time, Math.floor(temp_c), Math.floor(wind_kph)],
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
