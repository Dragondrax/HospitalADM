import { useCookies } from "react-cookie";
import { useJwt } from 'react-jwt';
import { Flex, Avatar, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Icon } from '@chakra-ui/react'
import PreferencesModal from './PreferencesModal';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { HandleImageContext } from "../../context/HandleImageContext";

export default function Topbar() {
    const [cookies, , removeCookies] = useCookies(["loginToken"]);
    const { decodedToken } = useJwt<DecodedLoginToken>(cookies.loginToken);

    const { imageFile, setHandleFile } = useContext(HandleImageContext);
    
    const [base64, setBase64] = useState<string>("");
    const handleLogout = () => {
        removeCookies('loginToken', { path: '/' });
    };

    useEffect(() => {
        const id = decodedToken?.sub;
        api.get(`/api/ReturnPictureProfile?UserId=${id}`)
        .then((response) => {
            setBase64(response.data.object);
        })
    }, [decodedToken])

    return (
        <Flex
            position="fixed"
            justifyContent="flex-end"
            align="center"
            minH={16}
            minW="100%"
            bg="rgba(255, 255, 255, 0.5)"
            boxShadow="0 2px 32px 0 rgba(0, 0, 0, 0.37)"
            backdropFilter="blur(1.2px)"
            border="1px solid rgba(255, 255, 255, 0.18)"
            zIndex="2 !important"
        >
            <Menu>
                <MenuButton position="relative">
                    <Avatar name={decodedToken?.Username} src={`data:image/jpeg;base64,${imageFile}`} mr="1rem" />
                </MenuButton>
                <MenuList>
                    <MenuGroup title="Minha Conta">
                        <PreferencesModal _hover={{ bg: "secondary.500", color: "textColor" }} />
                        <MenuItem _hover={{ bg: "secondary.500", color: "textColor" }} onClick={handleLogout}>Sair</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </Flex>
    );
};