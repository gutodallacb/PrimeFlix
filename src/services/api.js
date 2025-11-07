import axios from "axios";

// Base da URL: https://api.themoviedb.org/3/
// URL da API: https://api.themoviedb.org/3/movie/popular?api_key=ee22d5245f9a2a4d3332d3c0422c55b1&language=pt-BR

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
