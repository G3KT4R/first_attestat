import pkg from "pg";

const pool = new pkg.Pool({
  host: "http://localhost/",
  port: 9000,
  database: "test",
  user: "postgres",
  password: "postgres",
});

export const writeCityWeatherData = async (dataToWrite) => {
  const { name, time, temperature, speed } = dataToWrite;
  pool.connect(function (err, client, done) {
    if (err) {
      return console.error("connetion error", err);
    }
    client.query(
      "INSERT INTO att2(name, time, temperature, speed) VALUES($1, $2, $3, $4)",
      [name, time, Math.floor(temperature), Math.floor(speed)],
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
