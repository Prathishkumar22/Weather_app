import React, { useEffect,useRef, useState } from 'react'
import './Weather.css'
import searchimg from '../assets/search.png'
import clearimg from '../assets/clear.png'
import cloudimg from '../assets/cloud.png'
import drizzleimg from '../assets/drizzle.png'
import rainimg from '../assets/rain.png'
import snowimg from '../assets/snow.png'
import windimg from '../assets/wind.png'
import humidityimg from '../assets/humidity.png'

const Weather = () => {
    const [weatherData,setWeatherData]=useState(false);
    const allIcons={
        "01d":clearimg,
        "01n":clearimg,
        "02d":cloudimg,
        "02n":cloudimg,
        "03d":drizzleimg,
        "03n":drizzleimg,
         "04d":rainimg,
        "04n":rainimg,
        "09d":rainimg,
        "09n":rainimg,
        "10d":rainimg,
        "10n":rainimg,
        "13d":snowimg,
        "13n":snowimg,
    }
    const inputRef=useRef()
    const search =async (city)=>{
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&unit=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response=await fetch(url);
                const data=await response.json();
                console.log(data)
                const icon=allIcons[data.weather[0].icon]||clearimg;
                setWeatherData({
                    humidity:data.main.humidity,
                    windSpeed:data.wind.speed,
                    temp:Math.floor(data.main.temp),
                    location:data.name,
                    icon: icon
                    
                })
        }catch(error){

        }
    }
    useEffect(()=>{
        search("Delhi");
    },[])
  return (
    <div className='weather'>
        <div className="search-bar">
      <input ref={inputRef} type="text" placeholder='search' />
      <img src={searchimg} alt=""  onClick={()=>search(inputRef.current.value)}/>
    </div>
    <img src={clearimg} alt="" className='weather_icon' />
    <p className='temp'>{weatherData.temp}°c</p>
    <p className='loc'>{weatherData.location}</p>
    <div className="weather_data">
        <div className="col">
            <img src={humidityimg} alt="" />
            <div>
                <p>{weatherData.humidity}</p>
                <span>humidity</span>
            </div>
        </div>
         <div className="col">
            <img src={windimg} alt="" />
            <div>
                <p>{weatherData.windSpeed}</p>
                <span>Wind Speed</span>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Weather
