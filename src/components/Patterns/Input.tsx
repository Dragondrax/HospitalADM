import { Icon, Input, InputGroup, InputLeftElement, InputProps } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface PatternInputProps extends InputProps {
    icon?: IconType
    iconColor?: string;
    groupSize?: "lg" | "md" | "sm"
};

export default function PatternInput({ icon, iconColor, groupSize = "md", ...rest }: PatternInputProps) {
    return (
        <InputGroup size={groupSize}>
            {icon && (
                <InputLeftElement
                    pointerEvents='none'
                    children={icon && <Icon as={icon} fontSize="1.5rem" color={iconColor ? iconColor : 'primary.500'} />}
                />
            )}
            <Input
                focusBorderColor="secondary.500"
                _focus={{ borderColor: "secondary.500" }}
                {...rest}
            />
        </InputGroup>
    );
};