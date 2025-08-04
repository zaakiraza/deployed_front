import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const marquee = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;

const SlidingText = () => {
  const textChunk = (
    <HStack spacing={{base: "16px", md: "36px", lg: "36px"}} >
      <Text whiteSpace="nowrap" color={"#0D0D0D"}>Pakistan’s Free Ed-Tech Platform</Text>
      <Box
      mr={{base: "16px", md: "36px", lg: "36px"}}
        w={{ base: "12px", md: "16px", lg: "20px" }}
        h={{ base: "12px", md: "16px", lg: "20px" }}
        borderRadius="full"
        bg="#F49040"
        flexShrink={0}
      />
    </HStack>
  );

  return (
    <Box
    pt={{ base: "42px", sm: "54px", md: "86px" }}
    bg={"white"}
    w={"100%"}
    >
    <Box
      position="relative"
      w="100%"
      h={{  base: "64px" , md: "90px"}}
      overflow="hidden"
      bg="white"
      display="flex"
      alignItems="center"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        w: "20%",
        h: "100%",
        bgGradient: "linear(to-r, white, transparent)",
        zIndex: 2,
      }}
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        w: "20%",
        h: "100%",
        bgGradient: "linear(to-l, white, transparent)",
        zIndex: 2,
      }}
    >
      <Box
        display="flex"
        animation={{ base: `${marquee} 10s linear infinite` , md: `${marquee} 20s linear infinite`}}
        whiteSpace="nowrap"
        fontFamily="Poppins"
        fontSize={{ base: "24px", sm: "30px", md: "38px", lg: "46px" }}
        fontWeight="600"
        minW="200%"
        gap={0}
      >
        <Box display="flex">{textChunk}{textChunk}{textChunk}</Box>
        <Box display="flex">{textChunk}{textChunk}{textChunk}</Box>
      </Box>
    </Box>
    </Box>
  );
};

export default SlidingText;
