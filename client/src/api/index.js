//Taylor Zweigle, 2021
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000/api" });

export const getSongs = () => api.get("/songs");
export const getSongById = (id) => api.get(`/song/${id}`);
export const createSong = (payload) => api.post("/song", payload);
export const updateSong = (id, payload) => api.put(`/song/${id}`, payload);
export const deleteSong = (id) => api.delete(`/song/${id}`);

const apis = { getSongs, getSongById, createSong, updateSong, deleteSong };

export default apis;