import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

//get all persons
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//add new person
const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

//update 
const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

//delete a person
const remove = (id) => {
    //delete the person with this id
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }
