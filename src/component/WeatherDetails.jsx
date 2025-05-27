import cloudIcon from "../assets/cloud.png"
import drizzleIcon from "../assets/drizzle.png"
import humidityIcon from "../assets/humidity.png"
import rainIcon from "../assets/rain.png"
import snowIcon from "../assets/snow.png"
import windIcon from "../assets/wind.png"
import clearIcon from "../assets/clear.png"
import "./WeatherDetails.css"
const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind })=>{
    return(
        <>
            <div className="image" >
                <img src={icon} alt="Image"  className="iconImage"/>                
            </div>
            <div className="temp">
                {temp}°C
            </div>
            <div className="city">
                {city}
            </div>
            <div className="country">
                {country}
            </div>
            
            <div className="cord">
                <div>
                    <span className="lat">Latitude</span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className="long">Longitude</span>
                    <span>{log}</span>
                </div>
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={humidityIcon} alt="humidity"  className="icon"/>
                    <div className="data">
                        <div className="humidity-percent">{humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={windIcon} alt="Wind"  className="icon"/>
                    <div className="data">
                        <div className="wind-percent">{wind} km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default WeatherDetails;