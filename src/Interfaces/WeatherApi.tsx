export interface ForecastResponse {
  id: number;
  applicable_date: Date;
  weather_state_name: string;
  weather_state_abbr: string;
  wind_speed: number;
  wind_direction: number;
  wind_direction_compass: string;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
  the_temp: number;
  max_temp: number;
  min_temp: number;
}
