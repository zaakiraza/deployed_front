import { Stack, Heading, Text, Flex, Box, Image, Button } from "@chakra-ui/react"
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BsQuote } from "react-icons/bs";


export default function Feedback({ comment, img, name, title }) {
    return (
        <Flex
        direction={"column"}
            role="group"
            border="1px solid #CED4D3"
            p={{base: "18px", sm: "24px", md: "18px", lg: "24px"}}
            borderRadius="12px"
            bg="white"
            // my={12}
            // width="fit-content"
            shadow={"md"}
            transition="all 0.3s ease"
            _hover={{
                bg: "#F49040",
                transform: "scale(1.05)",
                shadow: "2xl"
            }}
        >
            <Box
                color="#F49040"
                fontSize={"64px"}
                _groupHover={{ color: "white" }}
            >
                <BsQuote/>
            </Box>

            <Text
            color="#0D0D0D"
            mt={{base: "12px", sm: "16px", md: "20px", lg: "24px"}}
            fontSize={{base: "14px", md: "16px"}}
            _groupHover={{
                color: "white"
                }}
                >
                {comment}
            </Text>

            <Flex
                direction={"row" }
                align="center"
                justify="space-between"
                mt={{base: "12px", sm: "16px", md: "20px", lg: "24px"}}
            >
                <Flex align="center" justify="center" gap={2}>
                    <Box>
                        <Image 
                        src={img} 
                        alt="Avatar" 
                        minHeight={{base: "42px", sm: "36px", md: "42px", lg: "58px"}}  
                        minWidth={{base: "42px", sm: "36px", md: "42px", lg: "58px"}}
                        />
                    </Box>
                    <Stack
                    spacing={{base: "2px", md: "4px"}}
                    >
                        <Heading
                        fontSize={{base: "18px", sm: "16px", md: "18px"}}
                         color="#1F6A75" 
                         _groupHover={{ color: "white" }}
                         >
                            {name}
                        </Heading>
                        <Text 
                        fontSize={{base: "16px", sm: "12px", md: "14px"}}
                        color="#A2ABAA"
                        _groupHover={{ color: "white" }}>
                            {title}
                        </Text>
                    </Stack>
                </Flex>

                <Flex>
                    <Button
                    size={"xs"}
                    colorScheme="white"
                    _focus={{ outline: "none", boxShadow: "none" }}
                    _hover={{ border: "none" }}
                    m={0}
                    p={0}
                    >
                        <Box
                        color="#F49040"
                         _groupHover={{ color: "white" }}
                         _hover={{ border: "none" }}
                         _focus={{ outline: "none", boxShadow: "none" }}

                    fontSize={{base: "16px", sm: "14px", md: "16px" , lg: "18px"}}
                         >
                            <AiOutlineLike />
                        </Box>
                    </Button>
                    <Button
                    size={"xs"}
                    colorScheme="white"
                    _focus={{ outline: "none", boxShadow: "none" }}
_hover={{ border: "none" }}
                    m={0}
                    p={0}
                    >
                        <Box 
                        color="#F49040" 
                        fontSize={{base: "16px", sm: "14px", md: "16px" , lg: "18px"}}
                        _groupHover={{ color: "white" }}
                        _hover={{ border: "none" }}
                        _focus={{ outline: "none", boxShadow: "none" }}

                        >
                            <AiOutlineDislike />
                        </Box>
                    </Button>
                </Flex>

            </Flex>
        </Flex>
    );
}
