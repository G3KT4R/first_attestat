import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { RegistrationPage } from "../../pages/RegistrationPage/RegistrationPage";
import { WeatherPage } from "../../pages/WeatherPage/WeatherPage";
import { AboutUsPage } from "../../pages/AboutUsPage/AboutUsPage";
import { ErrorPage } from "../../pages/ErrorPage/ErrorPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
