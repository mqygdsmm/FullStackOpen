import axios from "axios"

const baseurl = 'https://studies.cs.helsinki.fi/restcountries/api'
const api_key = import.meta.env.VITE_SOME_KEY
const weatherBaseurl = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&units=metric&`


const getAll = () => {
    console.log(api_key)
    const request = axios.get(`${baseurl}/all`)
    return request.then(response => response.data.map(country => country.name.common))
    
}


const getInfo = (countryName) => {
    const request = axios.get(`${baseurl}/name/${countryName}`)
    return request.then(response => response.data)
}

const getWeather = (countryName) => {
    const request = axios.get(`${weatherBaseurl}q=${countryName}`)
    return request.then(response => response.data)
}

export default {getInfo, getAll, getWeather}