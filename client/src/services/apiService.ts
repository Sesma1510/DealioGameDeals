import axios from 'axios'

const baseURL = 'http://localhost:8000/games';

const apiService = axios.create({baseURL})


export const getGames = async (title:string) => await apiService.get(`/:${title}`)
  
