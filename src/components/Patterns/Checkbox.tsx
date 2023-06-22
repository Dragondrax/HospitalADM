import { Checkbox, CheckboxProps } from "@chakra-ui/react";

export default function PatternCheckbox({ ...rest }: CheckboxProps) {
    return (
        <Checkbox
            colorScheme="primary"
            iconColor="textColor"
            {...rest}
        />
    );
};