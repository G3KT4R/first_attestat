import pkg from "pg";
export const pool = new pkg.Pool({
  host: "http://localhost/",
  port: 8000,
  database: "weather",
  user: "postgres",
  password: "postgres",
});

export const writeCityWeatherData = async (dataToWrite) => {
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
