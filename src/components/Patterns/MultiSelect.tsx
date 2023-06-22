import { Select, SelectProps } from "@chakra-ui/react";
import PatternInput from "./Input";

interface MultiSelectProps extends SelectProps {
    multiValue: number[];
    options: any[];
};

export function MultiSelect({ multiValue, options, ...rest }: MultiSelectProps) {
    return (
        <>
            <Select
                focusBorderColor="secondary.500"
                {...rest}
            >
                {options.map(opt => <option key={opt.id} value={Number(opt.id)}>{opt.name}</option>)}
            </Select>
            <PatternInput />
        </>
    );
};