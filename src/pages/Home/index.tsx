import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import { useJwt } from "react-jwt";
import PatternCard from "../../components/Patterns/Card";
import DataGrid from "../../components/DataGrid";
import PacienteModal from "../../components/Modal/PacienteModal";
import { api } from "../../services/api";
import { formatCpfCnpj, formatDate, formatPhone } from "../../utils/formatter";


export function Home() {
    const [cookies] = useCookies(['loginToken']);
    const { decodedToken } = useJwt<DecodedLoginToken>(cookies?.loginToken);
    const [rowData, setRowData] = useState<object[]>([]);
    const [tick, setTick] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        api.get("/api/RegisterMedicalRecord/GetAll").then((response) => {
            setRowData(response?.data?.object.map((row : any) => {
                return {
                    ...row,
                    dt_Register: formatDate(row.dt_Register),
                    cpf: formatCpfCnpj(row.cpf),
                    celular: formatPhone(row.celular)
                }
            }))
        })
    }, [tick])

    const updateTick = () => {
        setTick(tick + 1);
    };

    return (
        <>
            <Helmet>
                <title>Hospital | Paciente</title>
            </Helmet>
                <PatternCard title="Fichas dos Pacientes">
                {rowData.length === 0 && (
                    <Box mb={4}>
                        <PacienteModal modalType="new" updateTick={updateTick} />
                    </Box>
                )}

                <DataGrid
                    rowData={rowData}
                    isLoading={isLoading}
                    isError={isError}
                    enableExport={true}
                    addModal={<PacienteModal modalType="new" updateTick={updateTick} />}
                    icons={decodedToken?.role === 'Medico' ? ['Editar', 'Deletar'] : []}
                    deletePath="RegisterMedicalRecord/Delete"
                    updateTick={updateTick}
                />
            </PatternCard>
        </>
    );
};