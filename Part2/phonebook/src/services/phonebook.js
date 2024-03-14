import axios from "axios"

const baseurl = 'api/persons'

const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}


const create = (newObject) => {
    const request = axios.post(baseurl, newObject)
    return request.then(response => response.data)
}


const deletePerson = (id) => {
    const request = axios.delete(`${baseurl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseurl}/${id}`, newObject)
    return request.then(response => response.data)
}
export default {getAll, create, deletePerson, update}


