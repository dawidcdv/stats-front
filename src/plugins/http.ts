import axios from 'axios'


const http = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL as string,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
})

export default http
