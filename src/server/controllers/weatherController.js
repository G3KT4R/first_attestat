import { writeCityWeatherData } from "../models/writeCityWeatherData";

export const weatherController = async (req, res) => {
  writeCityWeatherData(req.body);
  res.end();
};
