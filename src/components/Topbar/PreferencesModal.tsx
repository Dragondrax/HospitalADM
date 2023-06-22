import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useJwt } from 'react-jwt';
import {
    Button,
    Text,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    MenuItemProps,
    Avatar,
    Center,
    Stack,
    Circle,
    Input,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import PatternButton from "../Patterns/Button";
import PatternInput from "../Patterns/Input";
import { api } from "../../services/api";
import { HandleImageContext } from "../../context/HandleImageContext";


export default function PreferencesModal({ ...rest }: MenuItemProps) {
    const [cookies] = useCookies(["loginToken"]);
    const { decodedToken } = useJwt<DecodedLoginToken>(cookies?.loginToken);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { imageFile, setHandleFile } = useContext(HandleImageContext);

    const [visible, setVisible] = useState<boolean>(false);
    const [, setFile] = useState<File>();
    const [fileSrc, setFileSrc] = useState<string>('');
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (event.target.files) {
                const inptFile = event.target.files[0];

                const formData = new FormData();
                formData.append("UserId", decodedToken!.sub);
                formData.append("file", inptFile);

                api.post("/api/RegisterPicture", formData).then((resp) => {
                    toast.success("Imagem Alterado com Sucesso!");
                });

                setHandleFile(1);
            };
        }
        catch {
            toast.error("Um erro ocorreu ao fazer o Upload da imagem, tente novamente!");
            return;
        };
    };

    const handleChangePassword = async () => {
        setIsLoading(() => true);

        if (newPassword !== confirmNewPassword) {
            toast.warn("As novas senhas não coincidem!");
            setIsLoading(() => false);
            return;
        };
        
        if (newPassword === oldPassword) {
            toast.warn("A nova senha e a antiga senha não podem ser iguais!");
            setIsLoading(() => false);
            return;
        };

        try {
            const data = {
                Id: decodedToken?.sub,
                OldPassword: oldPassword,
                NewPassword: newPassword,
            };

            await api.put('api/AlterPassword', data);
            toast.success("Preferências salvas com sucesso!");
        } catch(err : any) {
            if(err.response.data.object[0].code === 'PasswordMismatch')
                toast.error("Senha Incorreta");
            else
                toast.error("Ocorreu um erro ao salvar as informações");
        } finally {
            setIsLoading(() => false);
        };
    };

    return (
        <>
            <MenuItem onClick={onOpen} {...rest}>Preferências</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Preferências do Usuário</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Center display="flex" flexDir="column" gap={2}>
                            <Avatar
                                position="relative"
                                name={decodedToken?.Username}
                                cursor="pointer"
                                src={`data:image/jpeg;base64,${imageFile}`}
                                onMouseOver={() => setVisible(true)}
                            >
                                {visible && (
                                    <Circle
                                        position="absolute"
                                        bg="rgba(255, 255, 255, 0.7)"
                                        p="1.5em 1em"
                                        fontSize="0.55rem"
                                        onMouseLeave={() => setVisible(false)}
                                    >
                                        <Input
                                            position="absolute"
                                            w="100%"
                                            h="100%"
                                            opacity="0"
                                            cursor="pointer"
                                            type="file"
                                            multiple={false}
                                            accept="image/png, image/jpeg"
                                            onChange={handleChangeAvatar}
                                        />
                                        Alterar foto
                                    </Circle>
                                )}
                            </Avatar>
                            <Text>{decodedToken?.Username}</Text>
                        </Center>

                        <Stack mt="2rem !important">
                            <Text fontWeight="700" fontSize="1.2rem">Alterar Senha</Text>
                            <PatternInput
                                type="password"
                                id="actual-password"
                                name="actual-password"
                                placeholder="Senha Atual"
                                value={oldPassword}
                                onChange={(event) => setOldPassword(event.currentTarget.value)}
                            />

                            <Stack mt="2rem !important" >
                                <PatternInput
                                    type="password"
                                    id="new-password"
                                    name="new-password"
                                    placeholder="Nova Senha"
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.currentTarget.value)}
                                />
                                <PatternInput
                                    type="password"
                                    id="confirm-new-password"
                                    name="confirm-new-password"
                                    placeholder="Confirmar nova Senha"
                                    value={confirmNewPassword}
                                    onChange={(event) => setConfirmNewPassword(event.currentTarget.value)}
                                />
                            </Stack>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <PatternButton onClick={handleChangePassword} isLoading={isLoading}>Alterar</PatternButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};