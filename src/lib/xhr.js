import axios from 'axios'

export default uri => axios.get(`https://localhost:5555${uri}`)