const Message = ({message}) => {
    if (!message) {
        return null
    }
    const {directive, data} = message
    switch (directive) {
        case 'tooMany': {
            return (
            <div>
                {data}
            </div>
            )
        }
        case 'candidate': {
            console.log(data)
            const {candidates, handleShow} = data
            return (
            <div>
                {candidates.map(candidate => 
                <div key={candidate}>
                    {candidate}
                    <button onClick={()=>{handleShow(candidate)}}>show</button>
                </div>)}
            </div>
            )
        }
        case 'info': {
            const {info, weatherData} = data
            return (
            <div>
                <h1>{info.name.common}</h1>
                <p>capital {info.capital.join(',')}</p>
                <p>area {info.area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.values(info.languages).map(value => <li key={value}>{value}</li>)}
                </ul>
                <img src={info.flags.png} />
                <h2>Weather in {info.capital[0]}</h2>
                <p>temperature: {weatherData.main.temp} Celcius</p>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                <p>wind {weatherData.wind.speed} m/s</p>
            </div>
            )
        }
        default:
            return null
    }
}

export default Message