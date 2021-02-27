import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { ForecastResponse } from "./Interfaces/WeatherApi";
import Forecast from "./Forecast";
import WeatherHeader from "./WeatherHeader";

interface WeatherProps {}

export default function Weather(props: WeatherProps) {
  const [forecasts, setForecasts] = useState([]);
  const [locationId, setLocationId] = useState(35375);

  useEffect(() => {
    axios
      .get(`/api/location/${locationId}/`)
      .then((resp) => {
        setForecasts(resp.data.consolidated_weather);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [locationId]);

  function handleSearch(locationId: number) {
    setLocationId(locationId);
  }

  const forecastsApp = forecasts
    ? forecasts.map((forecast: ForecastResponse, index: number) => {
        return <Forecast key={index} forecast={forecast} />;
      })
    : null;

  return (
    <>
      <WeatherHeader
        handleSearch={(locationId: number) => handleSearch(locationId)}
      />
      <div className="forecast">{forecastsApp}</div>
    </>
  );
}
