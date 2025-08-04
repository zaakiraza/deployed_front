import {Button} from '@chakra-ui/react'
export default function BorderedButton({ onClick, children }) {
    return (
        <Button
        variant="outline"
        color="white"
        borderColor="white"
        borderWidth="1.5px"
        borderRadius="full"
        _hover={{ bg: "whiteAlpha.200" }}
        w="250px"
        h="50px"

        onClick={onClick}
      >
        {children}
      </Button>
    );
}