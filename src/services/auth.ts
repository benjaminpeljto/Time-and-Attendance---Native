import { type NativeLoginRequest, type NativeLoginResponse } from "../utils/types";
import { appAxios } from "./appAxios";

const loginNative = async (loginRequest: NativeLoginRequest) : Promise<NativeLoginResponse> => {
    const response = await appAxios.post("/auth/login", loginRequest);
    return response.data;
}

export default { loginNative };