import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import { useJwt } from "react-jwt";
import PatternCard from "../../components/Patterns/Card";
import DataGrid from "../../components/DataGrid";
import { api } from "../../services/api";
import UsersModal from "../../components/Modal/UsersModal";


export function Users() {
    const [cookies] = useCookies(['loginToken']);
    const { decodedToken } = useJwt<DecodedLoginToken>(cookies?.loginToken);
    const [rowData, setRowData] = useState<object[]>([]);
    const [tick, setTick] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        api.get("/api/GetAllUsers").then((response) => {
            setRowData(response.data.object)
        })
    }, [tick])

    const updateTick = () => {
        setTick(tick + 1);
    };

    return (
        <>
            <Helmet>
                <title>Hospital | Usuários</title>
            </Helmet>
                <PatternCard title="Usuários do Sistema">
                {rowData.length === 0 && (
                    <Box mb={4}>
                        <UsersModal modalType="new" updateTick={updateTick} />
                    </Box>
                )}

                <DataGrid
                    rowData={rowData}
                    isLoading={isLoading}
                    isError={isError}
                    enableExport={true}
                    addModal={<UsersModal modalType="new" updateTick={updateTick} />}
                    icons={decodedToken?.role === 'Medico' ? ['Editar', 'Deletar'] : []}
                    deletePath="DeleteUser"
                    updateTick={updateTick}
                />
            </PatternCard>
        </>
    );
};