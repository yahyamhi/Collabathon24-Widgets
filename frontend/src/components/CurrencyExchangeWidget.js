// Simplified UI version of CurrencyExchangeWidget
import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

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
  const favoriteCurrencies = ["EUR", "PLN", "USD", "GBP"]; // You can customize this list

  return (
    <div className="widget-container">
      {loadingCurrencies ? (
        <p>Loading currencies...</p>
      ) : (
        <div>
          {/* Currency Conversion Section */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              style={{ marginRight: "10px", padding: "5px" }}
            >
              {supportedCurrencies &&
                supportedCurrencies.supported_codes.map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} - {name}
                  </option>
                ))}
            </select>

            {/* Swap Button */}
            <button className="swap-button" onClick={handleSwap} style={{ margin: "0 10px" }}>
                ⇄
            </button>

            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
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
              style={{ margin: "10px 0", padding: "5px" }}
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
            <ul className="favorite-exchange-rates">
              {favoriteCurrencies.map((currency) => (
                <li key={currency}>
                  {fromCurrency} to {currency}: {exchangeRates?.conversion_rates?.[currency] || "N/A"}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {errorCurrencies && <p>Error loading currencies: {errorCurrencies}</p>}
      {errorRates && <p>Error loading rates: {errorRates}</p>}
    </div>
  );
};

export default CurrencyExchangeWidget;
