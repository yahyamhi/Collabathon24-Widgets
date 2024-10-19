import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import './Widget.css';

const BranchFinderWidget = ({ onClose }) => {
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [streets, setStreets] = useState([]);
  const [expandedBranch, setExpandedBranch] = useState(null);

  // Fetch cities and streets
  const { data: cityData, loading: cityLoading, error: cityError } = useFetch('/api/cities');

  // Fetch branch details based on selected city and street
  const { data: branchData, loading: branchLoading, error: branchError } = useFetch(
    city && street ? `/api/branches` : null, // Avoid fetching if city or street is empty
    { city, street, type: 'P' } // Send query parameters to the API
  );

  // Handle the response from city API and set cities and streets
  useEffect(() => {
    if (cityData && Object.keys(cityData).length > 0) {
      const cityNames = Object.keys(cityData);
      setCity(cityNames[0]); // Set default city
      setStreets(cityData[cityNames[0]]); // Set default streets for that city
      setStreet(cityData[cityNames[0]][0]); // Set default street
    }
  }, [cityData]);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setStreets(cityData[selectedCity]); // Update streets based on selected city
    setStreet(cityData[selectedCity][0]); // Set the first street as default
  };

  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };

  const toggleDetails = (index) => {
    setExpandedBranch(index === expandedBranch ? null : index);
  };

  if (cityLoading) return <p>Loading cities and streets...</p>;
  if (cityError) return <p>Error loading cities and streets: {cityError}</p>;

  return (
    <div className="widget-container">
      <div className="branch-finder-row">
        <label htmlFor="city-select">City:</label>
        <select id="city-select" value={city} onChange={handleCityChange}>
          {cityData && Object.keys(cityData).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="branch-finder-row">
        <label htmlFor="street-select">Street:</label>
        <select id="street-select" value={street} onChange={handleStreetChange}>
          {streets.map((street) => (
            <option key={street} value={street}>{street}</option>
          ))}
        </select>
      </div>

      {branchLoading ? (
        <p>Loading branches...</p>
      ) : branchError ? (
        <p>Error loading branches: {branchError}</p>
      ) : (
        <div className="scrollable-list compact">
          {branchData && branchData.map((branch, index) => (
            <div key={index} className="branch-item">
              <h3 onClick={() => toggleDetails(index)}>{branch.name}</h3>
              <p><strong>Address:</strong> {branch.address}</p>
              <p><strong>Phone:</strong> {branch.phone}</p>
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
