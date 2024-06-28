import axios from "axios";
import { BASE_SUB, BASE_URL_HOME } from "../constants";

export const appAxios = axios.create({
    baseURL: BASE_URL_HOME + BASE_SUB,
    timeout: 10000,
})
