import axios from 'axios'

export const API_BASE_URL = process.env.REACT_APP_URL_POKEAPI

// API Config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export function authHeader() {
    let token = ''
    if (typeof window !== 'undefined') {
        token = window.localStorage.getItem('token') || ''
    }
    if (token) {
        return { ...axios.defaults.headers.common, Authorization: `Bearer ${token}` }
    }
    delete axios.defaults.headers.common['Authorization']
    return { ...axios.defaults.headers.common }
}

export default api