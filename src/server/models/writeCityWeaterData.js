import { pool } from '../';

export const writeCityWeatherData = async (dataToWrite) => {
  const { name, country, temperature, conditions, speed } = dataToWrite;
  pool.connect(function (err, client, done) {
    if (err) {
      return console.error('connetion error', err);
    }
    client.query(
      'INSERT INTO cities(name, country, temperature, conditions, speed) VALUES($1, $2, $3, $4, $5)',
      [name, country, Math.floor(temperature), conditions, Math.floor(speed)],
      function (err, result) {
        // call `done()` to release the client back to the pool
        done();

        if (err) {
          return console.error('error running query', err);
        }
        console.log('-->', result);
      },
    );
  });
};

//! Вариант, представленный ниже выдавал ошибку о том, что нельзя повторно создать connection, т.е. client.connect()
//! Поэтому пришлось переделать на вариант с 'pool' (представлен выше, в этом же файле.)
// export const writeCityWeatherData = async (dataToWrite) => {
//   const { name, country, temperature, conditions, speed } = dataToWrite;

//   try {
//     await client.connect();
//     //  Запись в базу
//     const text = 'INSERT INTO cities(name, country, temperature, conditions, speed) VALUES($1, $2, $3, $4, $5)';
//     const values = [name, country, temperature, conditions, speed];
//     await client.query(text, values);
//     await client.end();
//   } catch (error) {
//     console.log('-->', error);
//   }
// };
