import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface PatternButtonProps extends ButtonProps {
    icon?: IconType
};

export default function PatternButton({ icon, ...rest }: PatternButtonProps) {
    return (
        <Button
            color="textColor"
            background="secondary.500"
            bgGradient="linear(to-tr, primary.500, secondary.500)"
            transition='0.1s'
            leftIcon={icon && <Icon as={icon} fontSize="1.5rem" />}
            _hover={{
                bgGradient: "linear(to-tr, secondary.500, primary.500)",
            }}
            _active={{
                filter: "brightness(0.6)"
            }}
            {...rest}
        />
    );
};