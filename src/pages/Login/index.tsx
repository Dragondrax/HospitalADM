import { useState } from "react";
import { Text, Container, Flex, Box, Icon } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { FaArrowRight } from "react-icons/fa";
import { MdEmail, MdLock, MdLocalHospital } from 'react-icons/md';
import PatternButton from "../../components/Patterns/Button";
import PatternInput from "../../components/Patterns/Input";
import { Link } from 'react-router-dom';
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

export function Login() {
    const [, setCookies] = useCookies(["loginToken"]);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        setIsLoading(() => true);

        try {
            const data = {
                email,
                password,
            };

            const response = await api.post('api/login', data);
            setCookies("loginToken", response.data.object.accessToken, { path: "/" });
        } catch {
            toast.error("Um erro ocorreu ao realizar Login!");
        } finally {
            setIsLoading(() => false);
        };
    };

    return (
        <>
            <Helmet>
                <title>Hospital | Login</title>
            </Helmet>
            <Box>
                <Container
                    position="relative"
                    as="form"
                    mt="28vh"
                    border="2px solid"
                    borderColor="primary.500"
                    borderRadius="6px"
                    bg="white"
                >
                    <Box bg="white" position="absolute" left="44.5%" top="-32px" >
                        <Icon as={MdLocalHospital} fontSize="4rem" color="secondary.500" />
                    </Box>
                    <Text
                        fontSize="2rem"
                        fontWeight="900"
                        bgGradient="linear(to-tr, primary.500, secondary.500, white)"
                        bgClip="text"
                        m="24px 0 24px 24px"
                        textDecor="none"
                        position="relative"
                        _after={{
                            position: 'absolute',
                            content: "''",
                            height: '4px',
                            bottom: '4px',
                            margin: '0 auto',
                            left: 14,
                            width: '9%',
                            bgGradient: "linear(to-r, primary.500, secondary.500)"
                        }}
                    >
                        Login
                    </Text>
                    <Flex p={12} flexDir="column" gap={4}>
                        <PatternInput
                            type="email"
                            id="email"
                            name="email"
                            placeholder="E-mail"
                            icon={MdEmail}
                            variant="filled"
                            groupSize="lg"
                            value={email}
                            onChange={(event) => setEmail(event.currentTarget.value)}
                        />
                        <PatternInput
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Senha"
                            icon={MdLock}
                            variant="filled"
                            groupSize="lg"
                            value={password}
                            onChange={(event) => setPassword(event.currentTarget.value)}
                        />
                        <PatternButton
                            mt="2.5em"
                            color="white"
                            onClick={handleLogin}
                            isLoading={isLoading}
                        >
                            Entrar
                        </PatternButton>
                    </Flex>
                </Container>
            </Box>
        </>
    );
};