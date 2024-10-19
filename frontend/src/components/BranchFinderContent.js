import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import './Widget.css';

const BranchFinderWidget = ({ onClose }) => {

  // Predefined list of dummy cities and streets for testing
  const cities = ["Hamburg", "Berlin", "Munich", "Frankfurt", "Cologne"];
  const streets = {
    Hamburg: ["Mönckebergstraße", "Ida-Ehre-Platz", "Große Bleichen"],
    Berlin: ["Kurfürstendamm", "Unter den Linden", "Alexanderplatz"],
    Munich: ["Marienplatz", "Maximilianstraße", "Leopoldstraße"],
    Frankfurt: ["Zeil", "Goetheplatz", "Berger Straße"],
    Cologne: ["Schildergasse", "Hohe Straße", "Neumarkt"],
  };

  const [city, setCity] = useState("Hamburg"); // Default city
  const [street, setStreet] = useState(streets[city][0]); // Default street
  const [fetchUrl, setFetchUrl] = useState(
    `/api/branches?city=Hamburg&street=Mönckebergstraße&type=P`
  ); // Default API fetch on load
  const [expandedBranch, setExpandedBranch] = useState(null);

  // Fetch data on page load and on "Go" button click
  const { data, loading, error } = useFetch(fetchUrl);

  // Update city and reset street when the city is changed
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setStreet(streets[selectedCity][0]); // Reset street to the first option of the new city
  };

  // Update street when the street is changed
  const handleStreetChange = (e) => setStreet(e.target.value);

  // Fetch data when "Go" button is clicked
  const handleSearch = () => {
    const url = `/api/branches?city=${city}&street=${street}&type=P`;
    setFetchUrl(url); // Set the new fetch URL
  };

  const toggleDetails = (index) => {
    setExpandedBranch(index === expandedBranch ? null : index);
  };

  return (
    <div>
      {/* City and Street Selectors */}
      <div>
        <label htmlFor="city-select">City: </label>
        <select id="city-select" value={city} onChange={handleCityChange}>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label htmlFor="street-select">Street: </label>
        <select id="street-select" value={street} onChange={handleStreetChange}>
          {streets[city].map((street) => (
            <option key={street} value={street}>
              {street}
            </option>
          ))}
        </select>

        {/* Go Button */}
        <button onClick={handleSearch} className="go-button">
          Go
        </button>
      </div>

      {/* Display Loading, Error, or Data */}
      {loading ? (
        <p>Loading branches...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="scrollable-list">
          {data &&
            data.map((branch, index) => (
              <div key={index} className="branch-item">
                <h3 onClick={() => toggleDetails(index)}>{branch.name}</h3>
                <p>
                  <strong>Address:</strong> {branch.anschriftStrasse}, {branch.anschriftOrt}, {branch.anschriftPostleitzahl}, {branch.anschriftLand}
                </p>
                <p><strong>Phone:</strong> {branch.telefon}</p>
                {expandedBranch === index && (
                  <div className="branch-details">
                    <p><strong>Vault Available:</strong> {branch.vault ? "Yes" : "No"}</p>
                    <p><strong>Cash Group:</strong> {branch.cashgroup ? "Yes" : "No"}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BranchFinderWidget;
