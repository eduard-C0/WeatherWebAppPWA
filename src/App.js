import React, {useState} from 'react'
import {fetchWeather} from './api/fetchWeather'
import './App.css';

const App = () =>{
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');
    const search = async (event) => {
        if(event.key === 'Enter')
        {
            const data = await fetchWeather(query)
            console.log(data);
            setWeather(data);
            setQuery('');
        }
    }
    return(
        <div className="main-container">
            <input
                type= "text"
                className="search"
                placeholder="Search..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyPress={search}
            />
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
                        <p>{weather.weather[0].description}</p>
                        <p>Wind speed: {weather.wind.speed} km/h</p>
                        <p>Atmospheric pressure: {Math.round(weather.main.pressure*0.75)} mmHg</p>
                    </div>
                </div>

            )}
        </div>
    )

}

export default App;