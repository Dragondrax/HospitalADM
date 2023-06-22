import { Icon, Drawer, Image, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, List, ListIcon, ListItem, useDisclosure, Text, Flex } from "@chakra-ui/react"
import { useRef } from "react"
import { useCookies } from "react-cookie";
import { AiOutlineMenu } from "react-icons/ai";
import { useJwt } from "react-jwt";
import { Link, useLocation } from "react-router-dom";
import { navConfig } from "../../utils/navConfig";

export function MobileSideBar() {
    const [cookies] = useCookies(['loginToken']);
    const { decodedToken } = useJwt<DecodedLoginToken>(cookies?.loginToken);

    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <Flex
                position="fixed"
                mt={4}
                ml={2}
                ref={btnRef}
                onClick={onOpen}
                zIndex={999}
                align="center"
                gap={2}
                color="secondary.500"
            >
                <Icon
                    fontSize="2rem"
                    as={AiOutlineMenu}
                />
                <Text fontSize="0.7rem">Menu de Navegação</Text>
            </Flex>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent bg="primary.500">
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Image mt={4} p={4} w="240px" src="/hospital.png" />
                    </DrawerHeader>

                    <List mt={8} color="white">
                    {navConfig.map(nav => {
                        const active = location.pathname === nav.path;
                        return (
                            <>
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
                            </>
                            
                        );
                        })}
                    </List>
                </DrawerContent>
            </Drawer>
        </>
    )
}