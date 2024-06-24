import { type QRCodeAttendanceRequest, type QRCodeAttendanceResponse } from "../utils/types";
import { appAxios } from "./appAxios";
import * as SecureStore from 'expo-secure-store';

const getJwt = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('jwt');
};

const requestQrAttendance = async (qrAttendanceRequest: QRCodeAttendanceRequest): Promise<QRCodeAttendanceResponse> => {
    const jwt = await getJwt();
    const response = await appAxios.post("/log-attendance", qrAttendanceRequest, {
        headers:{
            Authorization: `Bearer ${jwt}`
        }
    });
    return response.data;
}

export default { requestQrAttendance };