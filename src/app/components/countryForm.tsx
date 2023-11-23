'use client'
import { useState } from 'react';

export default function CountryForm({ onSubmit } : any) {
  const [countryData, setCountryData] = useState(null);

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = await onSubmit(formData);
    setCountryData(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Country name :
          <input type="text" name="title" />
        </label>
        <button type="submit">Submit</button>
      </form>

      
      {countryData && (
        <ul>
          <li>Name: <strong>{countryData.name}</strong></li>
          <li>Population: <strong>{countryData.population}</strong></li>
          <li>Capital: <strong>{countryData.capital}</strong></li>
          <li>Currency: <strong>{countryData.currency}</strong></li>
        </ul>
      )}
     
    </div>
  );
}