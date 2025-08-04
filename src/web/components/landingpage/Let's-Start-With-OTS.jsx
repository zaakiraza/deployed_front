import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import GraduateBoyVector from "../../../assets/GraduateBoyVector.svg";
import HatIcon from "../../../assets/hat.svg";
import FoldedDegree from "../../../assets/folded-degree.svg";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LetsStartWithOTS = () => {
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate("/signup"); // Navigate to the signup page when the button is clicked
  };

  return (
    <Box mt={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }} w={"100%"}>
      <Box
        maxW="1200px"
        w={"92%"}
        mx={"auto"}
        borderRadius="12px"
        overflow="hidden"
        position="relative"
        py={{ base: "36px", sm: "42px", md: "54px", lg: "64px" }}
        px={{ base: "18px", sm: "24px", md: "36px", lg: "42px" }}
        backgroundImage="linear-gradient(to right, #1F6A75, #093635)"
        backgroundSize="cover"
        backgroundPosition="center"
        boxShadow="2xl"
      >
        {/* Hat decoration in top right corner */}
        <Box
          position="absolute"
          top="20px"
          right="30px"
          width={{ base: "58px", md: "86px" }}
          height={{ base: "58px", md: "86px" }}
          opacity={0.2}
          zIndex={1}
        >
          <Image src={HatIcon} alt="Hat decoration" />
        </Box>

        {/* Folded degree decoration in bottom left corner */}
        <Box
          position="absolute"
          bottom="20px"
          left="30px"
          width={{ base: "64px", md: "86px" }}
          height={{ base: "64px", md: "86px" }}
          opacity={0.2}
          zIndex={1}
        >
          <Image src={FoldedDegree} alt="Folded degree decoration" />
        </Box>

        {/* Content container */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: "24px", md: "18px", lg: "24px" }}
          position="relative"
          zIndex={2}
        >
          {/* Left side with graduate vector and text */}
          <Flex
            align="center"
            gap={{ base: "16px", sm: "18px", md: "24px" }}
            flexDirection={{ base: "column", sm: "row" }}
          >
            <Box
              bg="white"
              borderRadius="full"
              p={{ base: "12px", md: "24px" }}
              width={{ base: "112px", sm: "98px", md: "136px" }}
              h={{ base: "112px", sm: "98px", md: "136px" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 0 12px rgba(255,255,255,0.3)"
            >
              <Image
                src={GraduateBoyVector}
                alt="Graduate Student"
                width={{ base: "54px", sm: "48px", md: "64px" }}
              />
            </Box>

            <Heading
              as="h2"
              fontSize={{ base: "18px", sm: "24px", md: "36px" }}
              fontWeight="medium"
              color="white"
              lineHeight="1.4"
              textAlign={{ base: "center", sm: "left" }}
            >
              Let's Start With{" "}
              <Text as="span" fontWeight="bold">
                Off The School
              </Text>
            </Heading>
          </Flex>

          {/* Right side with buttons */}
          <Flex
            gap={{ base: "8px", md: "12px" }}
            flexWrap={{ base: "wrap", sm: "nowrap" }}
            justify={{ base: "center", md: "flex-end" }}
            width={{ base: "full", md: "auto" }}
          >
            <Button
              size={buttonSize}
              color="white"
              bg={"none"}
              border="1px solid white"
              paddingY={{ base: "16px", sm: "18px", md: "24px" }}
              paddingX={{ base: "16px", sm: "18px", md: "24px" }}
              borderRadius="36px"
              fontSize={{ base: "12px", sm: "16px", md: "18px" }}
              _focus={{ outline: "none", boxShadow: "none" }}
              _hover={{
                bg: "white",
                color: "#1F6A75",
                transition: "all 0.3s ease-in-out",
              }}
              outline={"none"}
              onClick={handleClick}
            >
              I'm a Student
            </Button>

            <Button
              as={Link}
              to="/login"
              size={buttonSize}
              paddingY={{ base: "16px", sm: "18px", md: "24px" }}
              paddingX={{ base: "16px", sm: "18px", md: "24px" }}
              borderRadius="36px"
              bg="#F49040"
              border="1px solid #F49040"
              color="white"
              cursor={"pointer"}
              _focus={{ outline: "none", boxShadow: "none" }}
              _hover={{
                bg: "none",
                color: "#F49040",
                border: "1px solid #F49040",
                shadow: "0px 0px 24px #F4904050",
                transition: "all 0.3s ease-in-out",
              }}
              outline={"none"}
              // _focus={{
              //   outline: "none",
              // }}
            >
              <Text fontSize={{ base: "12px", sm: "16px", md: "18px" }}>
                Get Started
              </Text>
              <Box
                fontSize={{ base: "16px", sm: "18px", md: "24px" }}
                ml={{ base: "4px", sm: "8px", md: "12px" }}
              >
                <FiArrowRight />
              </Box>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default LetsStartWithOTS;
