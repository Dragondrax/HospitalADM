import { Card, CardBodyProps, Divider, Text } from "@chakra-ui/react";

interface PatternCardProps extends CardBodyProps {
    title?: string;
    children: React.ReactNode,
};

export default function PatternCard({ title, children, ...rest }: PatternCardProps) {
    return (
        <Card position="relative" m={["6em 0.5em 0 0.5em", "6em 0.5em 0 0.5em", "6em 2em 2em 2em"]} pt={4} pb={4} pr={6} pl={6} bg="white" {...rest}>
            {title && (
                <>
                    <Text fontWeight="700" fontSize="2rem">{title}</Text>
                    <Divider mt={2} mb={4} color="#c4c4c4" />
                </>
            )}
            {children}
        </Card>
    );
};