import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import './Widget.css';

const BranchFinderWidget = ({ onClose }) => {
  const cities = ["Hamburg", "Berlin", "Munich", "Frankfurt", "Cologne"];
  const streets = {
    Hamburg: ["Mönckebergstraße", "Ida-Ehre-Platz", "Große Bleichen"],
    Berlin: ["Kurfürstendamm", "Unter den Linden", "Alexanderplatz"],
    Munich: ["Marienplatz", "Maximilianstraße", "Leopoldstraße"],
    Frankfurt: ["Zeil", "Goetheplatz", "Berger Straße"],
    Cologne: ["Schildergasse", "Hohe Straße", "Neumarkt"],
  };

  const [city, setCity] = useState("Hamburg");
  const [street, setStreet] = useState(streets[city][0]);
  const [fetchUrl, setFetchUrl] = useState(`/api/branches?city=Hamburg&street=Mönckebergstraße&type=P`);
  const [expandedBranch, setExpandedBranch] = useState(null);

  const { data, loading, error } = useFetch(fetchUrl);

  // Automatically update the URL when the city or street changes
  useEffect(() => {
    const url = `/api/branches?city=${city}&street=${street}&type=P`;
    setFetchUrl(url);
  }, [city, street]);

  const toggleDetails = (index) => {
    setExpandedBranch(index === expandedBranch ? null : index);
  };

  return (
    <div className="widget-container compact">
      <div className="branch-finder-row">
        <label htmlFor="city-select">City:</label>
        <select id="city-select" value={city} onChange={(e) => setCity(e.target.value)}>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="branch-finder-row">
        <label htmlFor="street-select">Street:</label>
        <select id="street-select" value={street} onChange={(e) => setStreet(e.target.value)}>
          {streets[city].map((street) => (
            <option key={street} value={street}>{street}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading branches...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="scrollable-list compact">
          {data && data.map((branch, index) => (
            <div key={index} className="branch-item">
              <h3 onClick={() => toggleDetails(index)}>{branch.name}</h3>
              <p><strong>Address:</strong> {branch.anschriftStrasse}, {branch.anschriftOrt}, {branch.anschriftPostleitzahl}, {branch.anschriftLand}</p>
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
