import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { LocationResponse } from "./Interfaces/Location";
import ClickAwayListener from "react-click-away-listener";

interface WeatherHeaderProps {
  handleSearch: (locationWoeid: number) => void;
}

export default function WeatherHeader(props: WeatherHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [locationName, setLocationName] = useState("Southend-on-Sea");
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setShowSearchResults(true);
      const timer = setTimeout(() => {
        axios
          .get(`/api/location/search/?query=${searchQuery}`)
          .then((resp) => {
            setLocations(resp.data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  function handleLocationClick(locationTitle: string, locationWoeid: number) {
    setLocationName(locationTitle);
    props.handleSearch(locationWoeid);
    setShowSearchResults(false);
    setSearchQuery("");
  }

  const locationApp = locations
    ? locations.map((location: LocationResponse, index: number) => {
        return (
          <div
            key={index}
            onClick={() => handleLocationClick(location.title, location.woeid)}
          >
            <p>{location.title}</p>
          </div>
        );
      })
    : null;

  return (
    <div className="weather-header">
      <h1>Weather Outlook for {locationName}</h1>
      <ClickAwayListener onClickAway={() => setShowSearchResults(false)}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div
            className={`location-selector ${
              showSearchResults === false ? "hide" : ""
            }`}
          >
            {locationApp}
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
}
