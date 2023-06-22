import { Box, forwardRef, Input, InputProps } from "@chakra-ui/react";
import { MdFileUpload } from "react-icons/md";
import PatternButton from "./Button";

export const PatternFileInput = forwardRef(({ ...rest }: InputProps, ref) => (
    <Box as="span" ref={ref}>
        <PatternButton mt={2} icon={MdFileUpload} w="8em" position="relative">
            Upload
            <Input position="absolute" opacity="0" w="100%" h="100%" cursor="pointer" type="file" {...rest} />
        </PatternButton>
    </Box>
));