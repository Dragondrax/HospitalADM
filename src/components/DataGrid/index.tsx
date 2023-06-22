import { useCallback, useEffect, useRef, useState } from 'react';
import { Center, CircularProgress, HStack, Text, useMediaQuery } from '@chakra-ui/react';
import { utils, writeFile } from 'xlsx';
import { CgArrowAlignH } from "react-icons/cg";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import PatternButton from '../Patterns/Button';
import { DeleteModal } from './DeleteModal';
import { EditModal } from './EditModal';
import { FaFileExcel } from 'react-icons/fa';

interface DataGridProps {
    rowData: object[];
    isLoading?: boolean;
    isError?: boolean;
    addModal?: React.ReactNode;
    deletePath?: string;
    icons?: string[];
    updateTick?: () => void;
    enableExport?: boolean;
};

export default function DataGrid({ rowData, isLoading, isError, addModal, deletePath, icons, updateTick, enableExport = false }: DataGridProps) {
    const gridRef = useRef<AgGridReact>(null);
    const [columnDefs, setColumnDefs] = useState<object[]>([]);
    const [paginationNumber] = useState<number>(50);

    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

    useEffect(() => {
        if (rowData.length > 0) {
            const cols: object[] = [];

            Object.keys(rowData[0]).forEach(key => {
                cols.push({ field: key, filter: true });
            });

            if (icons) {
                icons.forEach(icon => {
                    switch (icon) {
                        case 'Editar':
                            cols.push({ field: icon, cellRenderer: EditModal, cellRendererParams: { modal: addModal, updateTick }, })
                            break;
                        case 'Deletar':
                            cols.push({ field: icon, cellRenderer: DeleteModal, cellRendererParams: { deletePath, updateTick }, })
                            break;
                        default:
                            break;
                    };
                });
            };

            setColumnDefs(cols);
        };
    }, [rowData, addModal, deletePath, icons, updateTick]);

    const autoSizeAll = useCallback(() => {
        gridRef?.current?.api?.refreshCells();
        const allColumnIds: string[] = [];

        gridRef?.current?.columnApi?.getColumns()?.forEach((column) => {
            allColumnIds.push(column?.getId());
        });

        gridRef?.current?.columnApi?.autoSizeColumns(allColumnIds);
    }, []);

    const handleGenerateExcel = async () => {
        const fileName = `dados_exportados.xlsx`;

        const workSheet = utils.json_to_sheet(rowData);
        const wb = utils.book_new();

        utils.book_append_sheet(wb, workSheet, fileName);

        writeFile(wb, fileName);
    };

    return (
        <>
            {isLoading && (
                <Center mt={48} flexDir="column">
                    <CircularProgress isIndeterminate color="secondary.500" />
                    <Text>Carregando Tabela...</Text>
                </Center>
            )}

            {isError && (
                <Text>Um erro ocorreu ao trazer os dados desta Tabela!</Text>
            )}

            {!isLoading && !isError && rowData.length > 0 ? (
                <div className="ag-theme-alpine" style={{ width: '100%', height: isLargerThan768 ? 600 : 450, paddingBottom: isLargerThan768 ? 0 : 48, fontSize: isLargerThan768 ? 'initial' : '0.65rem' }}>
                    <HStack mb={2} gap={2}>
                        <PatternButton
                            icon={CgArrowAlignH}
                            onClick={autoSizeAll}
                            fontSize={["0.8rem", "0.8rem", "1rem"]}
                        >
                            Ajustar Colunas
                        </PatternButton>
                        {enableExport && (
                            <PatternButton icon={FaFileExcel} onClick={handleGenerateExcel} fontSize={["0.8rem", "0.8rem", "1rem"]}>Exportar para Excel</PatternButton>
                        )}
                        {addModal}
                    </HStack>
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        pagination={true}
                        paginationPageSize={paginationNumber}
                        rowStyle={{ fontSize: isLargerThan768 ? "initial" : '0.65rem' }}
                    />
                </div>
            ) : (
                <>
                    {!isError && !isLoading && (
                        <Text>Não há dados para Exibir!</Text>
                    )}
                </>
            )}
        </>
    );
};