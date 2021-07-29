import axios from 'axios';

export const api = axios.create({
    baseURL: "https://filmes.mvsantos2003.repl.co",
  });