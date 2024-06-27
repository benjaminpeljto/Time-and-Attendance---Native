import { useState } from "react"
import { Alert } from "react-native";

const useAccessLogin = () => {
    const [accessCode, setAccessCode] = useState<string>("");

    const handleAccessLogin = () => {
        
        const cleanedCode = accessCode.replace(/-/g, "");

        if(!/^\d{12}$/.test(cleanedCode)){
            Alert.alert("Error", "Wrong format", [{text: "Dismiss"}])
            return false;
        }
        return true;
    }

    const handleAccessCodeChange = (code: string) => {
        if(accessCode.length > code.length){
            setAccessCode(code)
        }
        else{
            if(code.length === 4 || code.length === 9){
                setAccessCode(code + "-");
                return;
            }
            setAccessCode(code);
        }
    }


    return {
        accessCode,
        setAccessCode,
        handleAccessLogin,
        handleAccessCodeChange
    };
}

export default useAccessLogin;