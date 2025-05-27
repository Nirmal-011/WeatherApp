import React, { useEffect, useState } from "react";
import "./Weather.css";

import searchIcon from "../assets/search.png";
import WeatherDetails from "./weatherDetails";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import humidityIcon from "../assets/humidity.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import clearIcon from "../assets/clear.png";

const Weather = () => {
  let api_key = "40e1d2795ee4cc213d28c9a2da4ffd43";
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(32);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  const [text, setText] = useState("chennai");
  const [citynotfound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("city not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      } else {
        console.log(data);
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setCountry(data.sys.country);
      setCity(data.name);
      setTemp(data.main.temp);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false)
    } catch (error) {
      console.error("An error Occured", error.message);
      setError("An error occur while fetching data.");
    } finally {
      setLoading(false);
    }
  };
  const handleCity = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  useEffect(function () {
    search();
  }, []);
  return (
    <div className="mainContainer">
      <div className="container">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Search City"
            className="cityInput"
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <div className="searchIcon">
            <img
              src={searchIcon}
              alt="Search Icon"
              className="search"
              onClick={() => search()}
            />
          </div>
        </div>
        

        {loading && <div className="loading-message">Loading....</div>}
        {error&&<div className="error-message">{error}</div>}
        {citynotfound && <div className="city-not-found">City Not Found</div>}

       {!loading && !citynotfound && <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          log={log}
          humidity={humidity}
          wind={wind}
        />}
        <p className="copyright">

          Designed by <span>Nirmal</span>
        </p>
      </div>
    </div>
  );
};
export default Weather;
