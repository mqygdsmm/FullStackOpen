import axios from "axios"

const baseurl = 'https://studies.cs.helsinki.fi/restcountries/api'


const getAll = () => {
    const request = axios.get(`${baseurl}/all`)
    return request.then(response => response.data.map(country => country.name.common))
    
}


const getInfo = (countryName) => {
    const request = axios.get(`${baseurl}/name/${countryName}`)
    return request.then(response => response.data)
}

export default {getInfo, getAll}