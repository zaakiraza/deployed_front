import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";
import WhatIsOTSbg from "../../../assets/WhatIsOTSbg.svg";
import { useNavigate } from "react-router-dom";

const WhatIsOTS = () => {
  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate("/signup"); // Navigate to the signup page when the button is clicked
  };
  return (
    <Box
      w={"100%"}
      paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
      bg={"white"}
    >
      <Box maxW="1200px" w={"85%"} mx={"auto"}>
        {/* Heading Section */}
        <Box
          textAlign="center"
          mb={{ base: "24px", sm: "36px", md: "42px", lg: "56px" }}
        >
          <Heading
            as="h2"
            fontSize={{ base: "28px", sm: "36px", lg: "42px" }}
            fontWeight="700"
            mb={{ base: "8px", sm: "12px", md: "18px", lg: "24px" }}
            color="#1F6A75"
          >
            What is{" "}
            <Text as="span" color="#F49040">
              OTS ED-Tech Program?
            </Text>
          </Heading>

          <Text
            color="#A2ABAA"
            fontSize={{ base: "16px", sm: "18px", lg: "20px" }}
            fontWeight={"400"}
            maxW={{ base: "92%", sm: "85%", md: "75%" }}
            mx="auto"
            lineHeight="short"
            letterSpacing="0.2px"
            textAlign="center"
          >
            Off The School (OTS) Is A Not-For-Profit Institution And Online
            Platform Dedicated To Bridging The Socio-Economic Gap By Offering
            Accessible Formal And Skills-Based Education To All Individuals.
          </Text>
        </Box>

        {/* For Students Section */}
        <Box
          borderRadius="12px"
          overflow="hidden"
          position="relative"
          bgGradient="linear(to-br, #1F6A75, #093635)"
          h={{ base: "186px", md: "286px" }}
          w={{ base: "100%", md: "90%", lg: "80%" }}
          mb={6}
          boxShadow="2xl"
          mx="auto"
        >
          {/* Background image with overlay */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgImage={WhatIsOTSbg}
            bgSize="cover"
            bgPosition="center"
            opacity={0.2}
            zIndex={0}
          />

          {/* Content */}
          <Flex
            position="relative"
            direction="column"
            justify="center"
            align="center"
            h="100%"
            zIndex={2}
            // p={6}
          >
            <Heading
              as="h3"
              fontSize={{ base: "28px", sm: "36px", md: "42px", lg: "48px" }}
              fontWeight="700"
              mb={{ base: "16px", sm: "20px", md: "28px", lg: "36px" }}
              color="white"
              textAlign="center"
            >
              FOR STUDENTS
            </Heading>
            <Button
              bg="none"
              color="#F49040"
              fontFamily="Poppins"
              fontWeight={{ base: 300, md: 400 }}
              fontSize={{ base: "14px", md: "16px", lg: "18px" }}
              lineHeight="28px"
              letterSpacing="-1.1%"
              textAlign="center"
              w="auto"
              paddingY={{ base: "4px", sm: "8px", md: "12px", lg: "14px" }}
              paddingX={{ base: "16px", sm: "24px", md: "28px", lg: "36px" }}
              _focus={{ outline: "none", boxShadow: "none", bg: "none"}}
              _hover={{
                bg: "#F49040",
                color: "white",
                border: "none",
                shadow: "0px 0px 12px #F49040",
                transition: "all 0.3s ease-in-out",
              }}
              outline={"none"}
              borderRadius="full"
              border="1.5px solid #F49040"
              height="auto"
              onClick={() => handleClick()} // Navigation on click
            >
              Enroll in Ed-Tech Program
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default WhatIsOTS;
