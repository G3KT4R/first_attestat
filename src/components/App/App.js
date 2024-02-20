import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { RegistrationPage } from "../../pages/RegistrationPage/RegistrationPage";
import { WeatherPage } from "../../pages/WeatherPage/WeatherPage";
import { AboutUsPage } from "../../pages/AboutUsPage/AboutUsPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
