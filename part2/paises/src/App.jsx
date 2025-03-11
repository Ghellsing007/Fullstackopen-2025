import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [search, setSearch] = useState('');
  const [latitude, setLatitude] = useState(40.71); // Valor inicial NY
  const [longitude, setLongitude] = useState(-74.01); // Valor inicial NY
  const [clima, setClima] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);

  // Mapa de weathercode a íconos (usando URLs de OpenWeatherMap como ejemplo)
  const weatherIcons = {
    0: 'https://openweathermap.org/img/wn/01d@2x.png', // Cielo despejado
    1: 'https://openweathermap.org/img/wn/02d@2x.png', // Poco nublado
    2: 'https://openweathermap.org/img/wn/03d@2x.png', // Nublado
    3: 'https://openweathermap.org/img/wn/04d@2x.png', // Muy nublado
    45: 'https://openweathermap.org/img/wn/50d@2x.png', // Niebla
    51: 'https://openweathermap.org/img/wn/09d@2x.png', // Lluvia ligera
    61: 'https://openweathermap.org/img/wn/10d@2x.png', // Lluvia
    71: 'https://openweathermap.org/img/wn/13d@2x.png', // Nieve
    80: 'https://openweathermap.org/img/wn/09d@2x.png', // Chubascos
    95: 'https://openweathermap.org/img/wn/11d@2x.png', // Tormenta
    // Puedes añadir más códigos según la documentación de Open-Meteo
  };

  // Obtener clima cuando cambian latitud o longitud
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        setClima(response.data.current_weather);
      } catch (err) {
        setError('Error al obtener el clima');
      }
    };
    
    fetchWeather();
  }, [latitude, longitude]);

  // Obtener lista de países
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch(() => {
        setError('Error al obtener la lista de países');
      });
  }, []);

  // Filtrar países según búsqueda
  useEffect(() => {
    if (search.trim() !== '') {
      const filtered = countries.filter(country => 
        country.name.common.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilteredCountries(filtered);
      setError(null);
    } else {
      setFilteredCountries([]);
      setError(null);
    }
  }, [search, countries]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSearch(country.name.common);
    setFilteredCountries([]);
    setLatitude(country.latlng[0]);
    setLongitude(country.latlng[1]);
  };

  return (
    <div>
      <h1>Buscador de Países y Clima</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Ingresa el nombre de un país"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {filteredCountries.length > 0 && (
        <ul>
          {filteredCountries.map((country) => (
            <li 
              key={country.cca2} 
              onClick={() => handleCountrySelect(country)} 
              style={{ cursor: 'pointer' }}
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
      
      {selectedCountry && (
        <div>
          <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital?.[0] || 'No disponible'}</p>
          <p>Población: {selectedCountry.population.toLocaleString()}</p>
          <p>Coordenadas: {latitude.toFixed(2)}, {longitude.toFixed(2)}</p>
          <img 
            src={selectedCountry.flags.svg} 
            alt={`Bandera de ${selectedCountry.name.common}`} 
            width="100" 
          />
          </div>
          {clima && (
            <div>
              <h3>Clima Actual:</h3>
              <p>Temperatura: {clima.temperature}°C</p>
              <p>Velocidad del viento: {clima.windspeed} km/h</p>
              <p>Código del clima: {clima.weathercode}</p>
              {weatherIcons[clima.weathercode] ? (
                <img 
                  src={weatherIcons[clima.weathercode]} 
                  alt={`Clima ${clima.weathercode}`} 
                  width="100" 
                />
              ) : (
                <p>Ícono no disponible para este código</p>
              )}
            </div>
          )}
          
        </div>
      )}
    </div>
  );
};

export default App;