import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "./CurrencyExchangeWidget.css";

const CurrencyExchangeWidget = () => {
  const [fromCurrency, setFromCurrency] = useState("EUR"); // Default base currency
  const [toCurrency, setToCurrency] = useState("USD"); // Default target currency
  const [amount, setAmount] = useState(1); // Default amount
  const [conversionEndpoint, setConversionEndpoint] = useState(""); // API endpoint for conversion

  // Fetch supported currencies
  const { data: supportedCurrencies, loading: loadingCurrencies, error: errorCurrencies } = useFetch("/api/currencies");

  // Fetch exchange rates for the selected currency
  const { data: exchangeRates, loading: loadingRates, error: errorRates } = useFetch(`/api/exchange-rate?from=${fromCurrency}`);

  // Fetch conversion result using useFetch
  const { data: conversionData, loading: loadingConversion, error: errorConversion } = useFetch(conversionEndpoint);

  // Auto-trigger conversion when currency or amount changes
  useEffect(() => {
    if (amount && !isNaN(amount) && amount > 0) {
      setConversionEndpoint(`/api/convert-currency?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
    }
  }, [fromCurrency, toCurrency, amount]);

  // Swap the currencies and update the conversion
  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setAmount(conversionData?.conversion_result || amount); // Update the amount to the converted value
  };

  // Preselect favorite currencies for quick display
  const favoriteCurrencies = ["EUR", "PLN", "USD", "GBP"]; // EUR included as a favorite

  // Filter out the base currency from the favorite currencies list if it's selected as the base
  const filteredFavoriteCurrencies = favoriteCurrencies.filter((currency) => currency !== fromCurrency);

  return (
    <div className="widget-container">
      {loadingCurrencies ? (
        <p>Loading currencies...</p>
      ) : (
        <div>
          {/* Currency Conversion Section */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              style={{ marginRight: "5px", padding: "3px" }}
            >
              {supportedCurrencies &&
                supportedCurrencies.supported_codes.map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} - {name}
                  </option>
                ))}
            </select>

            {/* Swap Button */}
            <button className="swap-button" onClick={handleSwap} style={{ margin: "0 5px" }}>
                ⇄
            </button>

            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              style={{ marginLeft: "5px", padding: "3px" }}
            >
              {supportedCurrencies &&
                supportedCurrencies.supported_codes.map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} - {name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label>Amount: </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ margin: "5px 0", padding: "3px" }}
            />
          </div>

          {loadingConversion && <p>Converting...</p>}
          {errorConversion && <p>Conversion error: {errorConversion}</p>}
          {conversionData && (
            <p>
              Converted Amount: {conversionData.conversion_result} {toCurrency}
            </p>
          )}

          {/* Favorite Exchange Rates Section */}
          <h3>Favorite Exchange Rates</h3>
          {loadingRates ? (
            <p>Loading rates...</p>
          ) : (
            <table className="exchange-rate-table compact">
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Exchange Rate</th>
                </tr>
              </thead>
              <tbody>
                {filteredFavoriteCurrencies.map((currency) => (
                  <tr key={currency}>
                    <td>{currency}</td>
                    <td>{exchangeRates?.conversion_rates?.[currency] || "N/A"}</td>
                  </tr>
                ))}
                {/* Base currency row for clarity */}
                <tr>
                  <td><strong>{fromCurrency}</strong> (Base Currency)</td>
                  <td>1.0000</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}

      {errorCurrencies && <p>Error loading currencies: {errorCurrencies}</p>}
      {errorRates && <p>Error loading rates: {errorRates}</p>}
    </div>
  );
};

export default CurrencyExchangeWidget;
