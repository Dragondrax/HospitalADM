import { useState } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Icon,
    useDisclosure,
    List,
    Text,
    ListItem,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import PatternButton from "../../Patterns/Button";
import { toast } from "react-toastify";
import { api } from "../../../services/api";

export function DeleteModal(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDeleteInfo = async () => {
        try {
            setIsLoading(() => true);

            await api.delete(`api/${props?.deletePath}?Id=${props?.data.id}`);

            toast.success("Deletado com sucesso!");
            props?.updateTick();
        } catch {
            toast.error("Um erro ocorreu ao deletar esta informação!");
        } finally {
            setIsLoading(() => false);
        };
    };

    return (
        <>
            <Icon as={FaTrash} color="warning.500" cursor="pointer" fontSize="1.2rem" onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deletar Registro: {props.data.id}</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody display="flex" flexDir="column" gap={2}>
                        <Text mb={4} color="gray">Clicando em "Deletar" você concorda em deletar o registro contendo as seguintes informações:</Text>
                        <List>
                            {Object.keys(props.data).map(key => {
                                return (
                                    <ListItem key={props.data[key]}><b>{key.substring(0, 1).toUpperCase()}{key.substring(1)}</b>: {props.data[key]}</ListItem>
                                );
                            })}
                        </List>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <PatternButton bg="warning.500 !important" isLoading={isLoading} onClick={handleDeleteInfo}>Deletar</PatternButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};