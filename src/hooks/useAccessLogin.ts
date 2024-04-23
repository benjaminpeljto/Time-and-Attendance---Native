import { useState } from "react"
import { Alert } from "react-native";

const useAccessLogin = () => {
    const [accessCode, setAccessCode] = useState<string>("");

    const handleAccessLogin = () => {
        if(!/^\d{12}$/.test(accessCode)){
            Alert.alert("Error", "Wrong format", [{text: "Dismiss"}])
        }
        else{
            Alert.alert("Access code:", accessCode, [{text: "Okeeej"}])
        }
    }


    return {
        accessCode,
        setAccessCode,
        handleAccessLogin
    };
}

export default useAccessLogin;