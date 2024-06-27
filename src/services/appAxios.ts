import axios from "axios";
import { BASE_SUB, BASE_URL_HOME, PORT } from "../constants";

export const appAxios = axios.create({
    baseURL: BASE_URL_HOME + PORT + BASE_SUB,
    timeout: 10000,
})
