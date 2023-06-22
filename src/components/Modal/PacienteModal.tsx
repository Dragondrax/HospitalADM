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
import moment from "moment";
import PatternSelect from "../Patterns/Select";
import PatternCheckbox from "../Patterns/Checkbox";
import { useJwt } from "react-jwt";
import { useCookies } from "react-cookie";

interface dataResponse {
    message: string;
    success: boolean;
    errorMessage: string;
    object: object;
    object_Secondary: object;
}

export default function PacienteModal(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cookies] = useCookies(['loginToken']);
    const { decodedToken } = useJwt<DecodedLoginToken>(cookies?.loginToken);
    const [role, setRole] = useState(decodedToken?.role);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [cellPhone, setCellPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        if (props?.modalType === 'edit') {
            setName(props?.data?.fullName);
            setCpf(props?.data?.cpf);
            setCellPhone(props?.data?.celular);
            setAddress(props?.data?.endereco);
        }
    }, [isOpen, props]);

    const handleAddPacient = async () => {

        if(name === '')
        {
            toast.warning("Atenção o Campo Nome é Obrigatório");
            return;
        }
        else if(cpf === '')
        {
            toast.warning("Atenção o Campo CPF é Obrigatório");
            return;
        }
        else if(cellPhone === '')
        {
            toast.warning("Atenção o Campo Celular é Obrigatório");
            return;
        }

        try {
            setIsLoading(() => true);
            const data = {
                FullName: name,
                CPF: cpf.replace(".", "").replace(".", "").replace("-",""),
                Celular: cellPhone.replace("-", "").replace("(", "").replace(")", "").replace("+", ""),
                Endereco: address
            };

            await api.post('/api/RegisterMedicalRecord/Register', data);

            toast.success("Paciente criado com sucesso!");
            props?.updateTick();
        } catch(err : any) {
            if(err.response.data.message === "Ops, parece que o CPF nao e valido")
                toast.error("Por favor, Digite um CPF válido!");
            else if(err.response.data.message === "O CPF já esta registrado no sistema")
                toast.error("O CPF já esta registrado no sistema")
            else
                toast.error("Um erro ocorreu ao cadastrar este Paciente!");
        } finally {
            setIsLoading(() => false);
        };
    };

    const handleEditPacient = async () => {

        if(name === '')
        {
            toast.warning("Atenção o Campo Nome é Obrigatório");
            return;
        }
        else if(cpf === '')
        {
            toast.warning("Atenção o Campo CPF é Obrigatório");
            return;
        }
        else if(cellPhone === '')
        {
            toast.warning("Atenção o Campo Celular é Obrigatório");
            return;
        }

        try {
            setIsLoading(() => true);

            const data = {
                Id: props?.data?.id,
                FullName: name,
                CPF: cpf.replace(".", "").replace(".", "").replace("-",""),
                Celular: cellPhone.replace("-", "").replace("(", "").replace(")", "").replace("+", ""),
                Endereco: address
            };

            await api.put('/api/RegisterMedicalRecord/Update', data);

            toast.success("Paciente alterado com sucesso!");
            props?.updateTick();
        } catch(err : any) {
            if(err.response.data.message === "Ops, parece que o CPF nao e valido")
                toast.error("Por favor, Digite um CPF válido!");
            else
                toast.error("Um erro ocorreu ao cadastrar este Paciente!");
        } finally {
            setIsLoading(() => false);
        };
    };

    const handleClose = () => {
            setName("");
            setCpf("");
            setCellPhone("");
            setAddress("");
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
                    <ModalHeader>{props.modalType === 'new' ? 'Adicionar Novo Paciente' : 'Alterar Paciente'}</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody display="flex" flexDir="column" gap={2}>
                        <p>Nome do Paciente</p>
                        <PatternInput
                            type="text"
                            id="pacient-name"
                            name="pacient-name"
                            placeholder="Nome do Paciente..."
                            value={name}
                            onChange={(event) => setName(event.currentTarget.value)}
                        />
                        <p>CPF do Paciente</p>
                        <PatternInput
                            type="text"
                            id="pacient-cpf"
                            name="pacient-cpf"
                            placeholder="CPF do Paciente..."
                            maxLength={14}
                            value={cpf}
                            onChange={(event) => setCpf(formatCpfCnpj(event.currentTarget.value))}
                        />
                        <p>Celular do Paciente</p>
                        <PatternInput
                            type="text"
                            id="cellphone-cpf"
                            name="cellphone-cpf"
                            placeholder="XX(XX)XXXXX-XXXX"
                            value={cellPhone}
                            maxLength={17}
                            onChange={(event) => setCellPhone(formatPhone(event.currentTarget.value))}
                        />
                        <p>Endereço do Paciente</p>
                        <PatternInput
                            type="text"
                            id="address-cpf"
                            name="address-cpf"
                            placeholder="Endereço do Paciente..."
                            value={address}
                            onChange={(event) => setAddress(event.currentTarget.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={handleClose}>
                            Cancelar
                        </Button>   
                        <PatternButton isLoading={isLoading} onClick={props?.modalType === 'new' ? handleAddPacient : handleEditPacient}>{props?.modalType === 'new' ? 'Salvar' : 'Editar'}</PatternButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};