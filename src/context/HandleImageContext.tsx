import { createContext, useEffect, useState } from "react";
import { extendTheme } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { api } from "../services/api";


interface HandleImageContextData {
    imageFile: string;
    handleFile: Number;
    setHandleFile: React.ComponentState
}

interface HandleImageProps {
    children: React.ReactNode;
};

export const HandleImageContext = createContext<HandleImageContextData>(
    {} as HandleImageContextData
);

export function HandleImageProvider({ children }: HandleImageProps) {
    const [cookies] = useCookies(["loginToken"]);
    const { decodedToken } = useJwt<DecodedLoginToken>(cookies?.loginToken);
    const [imageFile, setImageFile] = useState<string>("");   
    const [handleFile, setHandleFile] = useState<Number>(0);   
    
    useEffect(() => {
        setHandleFile(0);

        const id = decodedToken?.sub;
        api.get(`/api/ReturnPictureProfile?UserId=${id}`)
        .then((response) => {
            setImageFile(response.data.object);
        })
    }, [decodedToken, handleFile])
    
    

    return (
        <HandleImageContext.Provider value={{ imageFile, handleFile, setHandleFile }}>
            {children}
        </HandleImageContext.Provider>
    );
};