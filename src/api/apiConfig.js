"use client";
import axios from "axios";

const apiUrl = "https://chat-app-alan-63317e4a9117.herokuapp.com/api/";

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
