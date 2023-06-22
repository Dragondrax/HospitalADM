import { Box, Container, Image, List, ListIcon, ListItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { Link, useLocation } from "react-router-dom";
import { api } from "../../services/api";
import { navConfig } from "../../utils/navConfig";

export default function Sidebar() {
    const [cookies] = useCookies(['loginToken']);
    const { decodedToken } = useJwt<DecodedLoginToken>(cookies?.loginToken);
    const location = useLocation();

    useEffect(() => {
        
    }, [])

    return (
        <Container position="relative" zIndex="10 !important" bg="primary.500" minH="100vh" p="0 !important">
            <Box position="fixed" w="15%">
                <Image mt={4} p={4} src="/hospital.png" />
                <List mt={8} color="white">
                    {navConfig.map(nav => {
                        const active = location.pathname === nav.path;
                        return (
                            <Link key={nav.id} to={nav.path} replace>
                                <ListItem
                                    w="100%"
                                    p={4}
                                    cursor="pointer"
                                    transition="0.2s"
                                    bg={active ? "textColor" : "initial"}
                                    color={active ? "contrastTextColor" : "textColor"}
                                    _hover={active ? {} : { bg: "textColor", color: "contrastTextColor", filter: "brightness(0.7)" }}
                                >
                                <ListIcon
                                    as={nav.icon}
                                    fontSize="1.5rem"
                                    _hover={{}}
                                />
                                    {nav.name}
                                </ListItem>
                            </Link>
 
                        );
                    })}
                </List>
            </Box>
        </Container>
    );
};