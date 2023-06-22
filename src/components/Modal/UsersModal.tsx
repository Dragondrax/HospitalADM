import {
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import PatternButton from "../Patterns/Button"
import PatternInput from "../Patterns/Input";
import { formatCpfCnpj, formatPhone } from "../../utils/formatter";
import { useJwt } from "react-jwt";
import { useCookies } from "react-cookie";
import PatternSelect from "../Patterns/Select";

interface dataResponse {
    message: string;
    success: boolean;
    errorMessage: string;
    object: object;
    object_Secondary: object;
}

export default function UsersModal(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cookies] = useCookies(['loginToken']);
    const { decodedToken } = useJwt<DecodedLoginToken>(cookies?.loginToken);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [typeRegister, setTypeRegister] = useState<string>("");
    useEffect(() => {
        if (props?.modalType === 'edit') {
            setEmail(props?.data?.email);
            setTypeRegister(props?.data?.role);
        }
    }, [isOpen, props]);

    const handleAddUser = async () => {
        try {
            if(email === ''){
                toast.error("Email é obrigatório");
                return;
            }
            else if(password === '')
            {
                toast.error("Senha é obrigatório");
                return;
            }
            else if(typeRegister === '')
            {
                toast.error("Tipo de Registro é obrigatório");
                return;
            }

            setIsLoading(() => true);
            const data = {
                Email: email,
                Password: password,
                Role: typeRegister
            };

            await api.post('api/NewUser', data);

            toast.success("Usuario criado com sucesso!");
            props?.updateTick();
        } catch(err : any) {
            if(err.response.data.object[0].code === "DuplicateUserName")
                toast.error("Usuario Já Existente");
            else if(err.response.data.object[0].code === "PasswordRequiresNonAlphanumeric")
                toast.error("Senhas devem conter ao menos um caracter não alfanumérico.");
            else
                toast.error("Um erro ocorreu ao cadastrar este Usuario!");
        } finally {
            setIsLoading(() => false);
        };
    };

    const handleEditUser = async () => {
        try {
            if(email === ''){
                toast.error("Email é obrigatório");
                return;
            }
            else if(password === '')
            {
                toast.error("Senha é obrigatório");
                return;
            }
            else if(typeRegister === '')
            {
                toast.error("Tipo de Registro é obrigatório");
                return;
            }

            setIsLoading(() => true);
            const data = {
                Id: props?.data?.id,
                Email: email,
                Role: typeRegister
            };

            await api.put('api/AlterUser', data);

            toast.success("Usuario alterado com sucesso!");
            props?.updateTick();
        } catch(err : any) {
            if(err.response.data.object[0].code === "Usuario nao encontrado")
                toast.error("Usuario não encontrado");
            else
                toast.error("Um erro ocorreu ao cadastrar este Usuario!");
        } finally {
            setIsLoading(() => false);
        };
    };

    const handleClose = () => {
            setEmail("");
            setPassword("");
            onClose();
    };

    return (
        <>
            {
                props.modalType === 'edit' ? 
                    <Icon as={FaPencilAlt} color="primary.500" cursor="pointer" fontSize="1.2rem" onClick={onOpen} /> 
                : 
                decodedToken?.role === "Medico" ? <PatternButton icon={IoMdAdd} onClick={onOpen}>Adicionar</PatternButton>
                :
                    null
            }

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.modalType === 'new' ? 'Adicionar Novo Usuário' : 'Alterar Usuário'}</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody display="flex" flexDir="column" gap={2}>
                        <p>Email</p>
                        <PatternInput
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.currentTarget.value)}
                        />
                        {
                            props.modalType === 'edit' ? 
                            null:
                            <>
                                <p>Senha</p>
                                <PatternInput
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(event) => setPassword(event.currentTarget.value)}
                                />
                            </>
                        }                        
                        <p>Tipo de Registro</p>
                        <PatternSelect placeholder='Tipo de Usuário' value={typeRegister} onChange={(event) => setTypeRegister(event.currentTarget.value)}>
                            <option key={1} value="Medico">Médico</option>
                            <option key={2} value="Paciente">Paciente</option>
                        </PatternSelect>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={handleClose}>
                            Cancelar
                        </Button>   
                        <PatternButton isLoading={isLoading} onClick={props?.modalType === 'new' ? handleAddUser : handleEditUser}>{props?.modalType === 'new' ? 'Salvar' : 'Editar'}</PatternButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};