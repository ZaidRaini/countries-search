import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    }
    fetchCountries();
  }, []);

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Country Search</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="country-container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.cca3} className="countryCard">
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
              />
              <p>{country.name.common}</p>
            </div>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
}

export default App;
