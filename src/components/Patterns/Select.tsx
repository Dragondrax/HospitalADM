import { Select, SelectProps } from "@chakra-ui/react";

export default function PatternSelect({ ...rest }: SelectProps) {
    return (
        <Select
            focusBorderColor="secondary.500"
            {...rest}
        />
    )
};