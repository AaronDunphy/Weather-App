import moment from "moment";
import { convertMphToKnots } from "./Utils/Helpers";
import { ForecastResponse } from "./Interfaces/WeatherApi";

interface ForecastProps {
  forecast: ForecastResponse;
}

export default function Forecast(props: ForecastProps) {
  return (
    <div>
      <h2>
        {moment(props.forecast.applicable_date).format("X") ===
        moment().startOf("day").format("X")
          ? "Today"
          : moment(props.forecast.applicable_date).format("dddd")}
      </h2>
      <img
        src={`/static/img/weather/${props.forecast.weather_state_abbr}.svg`}
        alt={props.forecast.weather_state_name}
        className="weather-icon"
      />
      <p>
        {`${(Math.round(props.forecast.the_temp) * 100) / 100}℃ |
        ${
          Math.round(convertMphToKnots(props.forecast.wind_speed) * 100) / 100
        } knots`}
      </p>
    </div>
  );
}
