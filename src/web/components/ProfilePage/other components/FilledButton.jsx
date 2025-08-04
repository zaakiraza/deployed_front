import { Button } from "@chakra-ui/react";
export default function FilledButton({ onClick, children }) {
    return (
        <Button
        bg="#F49040"
        color="white"
        borderRadius="full"
        _hover={{ bg: "#e07f2e" }}
        w="250px"
        h="50px"

        onClick={onClick}
      >
        Complete
      </Button>
    );
}