import React from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  Image,
  Stack,
  Flex,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import HeroBG from "../../../assets/HeroBG.svg";
import { FaPlay, FaCalendarAlt, FaEnvelope, FaUser } from "react-icons/fa";
import { keyframes } from "@emotion/react";
import { FiArrowRight } from "react-icons/fi";
import Student from "../../../assets/Student.png";
import tablet from "../../../assets/tablet.png";
import outlineContext from "react-pdf/dist/OutlineContext.js";

function HeroSection() {
  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate("/signup"); // Navigate to the signup page when the button is clicked
  };

  // Animation keyframes for floating cards
  const float = keyframes`
    0% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(1deg); }
    66% { transform: translateY(-5px) rotate(-1deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  `;

  const floatReverse = keyframes`
    0% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(10px) rotate(-1deg); }
    66% { transform: translateY(5px) rotate(1deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  `;

  const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `;

  // Animation keyframes for tablet rotation
  const rotate = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(30deg); }
    100% { transform: rotate(0deg); }
  `;

  return (
    <Box bg="white" width="100vw">
      <Box
        position="relative"
        bgImage={HeroBG}
        bgSize="cover"
        width="100%"
        bgPosition="center"
        overflow="hidden"
        zIndex={2}
        clipPath="ellipse(100% 100% at 50% 0%)"
      >
        <Flex
          maxW="1436px"
          width="92%"
          direction={{ base: "column", md: "row" }}
          align="center"
          justifyContent="center"
          paddingTop={{ base: "136px", sm: "164px", md: "148px", lg: "86px" }}
          textAlign={{ base: "center", md: "left" }}
          color="white"
          mx={"auto"}
          position="relative"
          zIndex="2"
        >
          {/* Left Side (Text + Button) */}
          <VStack
            align={{ base: "center", md: "start" }}
            spacing={{ base: "12px", md: "16px", lg: "20px" }}
            maxW="600px"
            w={{ base: "100%", md: "42%", lg: "56%" }}
            textAlign={{ base: "center", md: "left" }}
            marginLeft={{ base: 0, md: "36px" }}
          >
            <Heading
              fontFamily="Poppins"
              fontSize={{ base: "28px", sm: "32px", md: "36px", lg: "42px" }}
              fontWeight="700"
              lineHeight="110%"
              letterSpacing="0"
              textTransform="uppercase"
              color="#FFFFFF"
              w="100%"
            >
              SAY GOODBYE TO CLASSROOM BOREDOM
            </Heading>

            <Text
              fontFamily="Poppins"
              fontWeight={400}
              fontSize={{ base: "12px", sm: "14px", md: "16px", lg: "18px" }}
              lineHeight="150%"
              letterSpacing="0"
              color="#FFFFFF"
              w="100%"
            >
              Welcome to Pakistan's free edtech platform, where you can learn
              smartly at your own place.
            </Text>

            <Flex align={"center"} justifyContent={"start"} width="auto">
              <Button
                bg="#F49040"
                color="#FFFFFF"
                fontFamily="Poppins"
                fontWeight={{ base: 300, md: 400 }}
                fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                lineHeight="28px"
                letterSpacing="-1.1%"
                textAlign="center"
                w="auto"
                borderRadius="full"
                paddingY={{ base: "8px", sm: "12px", md: "18px", lg: "22px" }}
                paddingX={{ base: "16px", sm: "20px", md: "24px" }}
                _focus={{ outline: "none", boxShadow: "none", bg: "none" }}

                _hover={{
                  bg: "none",
                  color: "#F49040",
                  border: "1px solid #F49040",
                  shadow: "0px 0px 12px #F49040",
                  transition: "all 0.3s ease-in-out",
                }}
                outline={"none"}
                onClick={handleClick}
                rightIcon={
                  <Flex
                    align="center"
                    justify="center"
                    fontSize={{
                      base: "14px",
                      sm: "16px",
                      md: "18px",
                      lg: "20px",
                    }}
                  >
                    <Icon as={FiArrowRight} />
                  </Flex>
                }
              >
                Get Started
              </Button>

              <Button
                bg="none"
                color="#FFFFFF"
                fontFamily="Poppins"
                fontWeight={{ base: 300, md: 400 }}
                fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                lineHeight="28px"
                letterSpacing="-1.1%"
                textAlign="center"
                w="auto"
                borderRadius="full"
                paddingY={{ base: "8px", sm: "12px", md: "18px", lg: "22px" }}
                gap={{ base: "0px", sm: "2px", lg: "6px" }}
                border={"none"}
                _focus={{ outline: "none", boxShadow: "none", bg: "none"}}

                _hover={{
                  color: "#F49040",
                  border: "none",
                  transition: "all 0.3s ease-in-out",
                }}
                marginLeft={"10px"}
                leftIcon={
                  <Flex
                    align="center"
                    justify="center"
                    fontSize={{
                      base: "8px",
                      sm: "10px",
                      md: "12px",
                      lg: "14px",
                    }}
                    bg="rgba(255, 255, 255, 0.2)"
                    w={{ base: "24px", sm: "28px", md: "32px", lg: "36px" }}
                    h={{ base: "24px", sm: "28px", md: "32px", lg: "36px" }}
                    borderRadius="full"
                  >
                    <Icon as={FaPlay} />
                  </Flex>
                }
                onClick={() =>
                  window.open(
                    "https://youtu.be/LVAPiyS6Olg?si=G3hq7JxhA7nYEWiW",
                    "_blank"
                  )
                }
              >
                Watch how it works
              </Button>
            </Flex>
          </VStack>

          {/* RIGHT: Overlapping Images with Animated Cards */}
          <Box
            pos="relative"
            w="auto"
            maxW="640px"
            minH={{ base: "300px", md: "400px", lg: "500px" }}
          >
            {/* Background Images */}
            <Image
              src={tablet}
              alt="Tablet"
              borderRadius="lg"
              pos="absolute"
              zIndex={1}
              animation={`${rotate} 8s ease-in-out infinite`}
            />
            <Image
              src={Student}
              alt="Student"
              borderRadius="lg"
              pos="relative"
              zIndex={2}
            />

            {/* Your Animated Cards */}
            {/* "250k Assisted Student" Card - Top Left */}
            <Box
              position="absolute"
              top={{ base: "20px", md: "40px", lg: "60px" }}
              left={{ base: "10px", md: "20px", lg: "40px" }}
              bgGradient="linear(to-br, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.35) 100%)"
              borderRadius="16px"
              p={{ base: "4", md: "5" }}
              border="1px solid rgba(255, 255, 255, 0.2)"
              animation={`${float} 4s ease-in-out infinite`}
              maxW={{ base: "180px", md: "200px" }}
              w="100%"
              zIndex={3}
            >
              <HStack spacing="3" align="center">
                <Box
                  w={{ base: "32px", md: "40px" }}
                  h={{ base: "32px", md: "40px" }}
                  bg="#fc951fff"
                  borderRadius="8px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon
                    as={FaUser}
                    color="white"
                    boxSize={{ base: "16px", md: "20px" }}
                  />
                </Box>
                <VStack align="start" spacing="1">
                  <Text
                    fontFamily="Poppins"
                    fontWeight={600}
                    fontSize={{ base: "16px", md: "18px" }}
                    color="#ffffffff"
                  >
                    25k
                  </Text>
                  <Text
                    fontFamily="Poppins"
                    fontWeight={400}
                    fontSize={{ base: "12px", md: "14px" }}
                    color="#ffffffff"
                  >
                    Assisted Student
                  </Text>
                </VStack>
              </HStack>
            </Box>

            {/* "Congratulations" Card - Top Right */}
            <Box
              position="absolute"
              top={{ base: "60px", md: "80px", lg: "100px" }}
              right={{ base: "10px", md: "20px", lg: "40px" }}
              bgGradient="linear(to-br, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.13) 100%)"
              borderRadius="12px"
              p={{ base: "4", md: "5" }}
              border="1px solid rgba(255, 255, 255, 0.2)"
              animation={`${floatReverse} 3s ease-in-out infinite`}
              maxW={{ base: "220px", md: "250px" }}
              w="100%"
              zIndex={3}
            >
              <HStack spacing="3" align="center">
                <Box
                  w={{ base: "32px", md: "40px" }}
                  h={{ base: "32px", md: "40px" }}
                  bg="#F49040"
                  borderRadius="8px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon
                    as={FaEnvelope}
                    color="white"
                    boxSize={{ base: "16px", md: "20px" }}
                  />
                </Box>
                <VStack align="start" spacing="1">
                  <Text
                    fontFamily="Poppins"
                    fontWeight={600}
                    fontSize={{ base: "14px", md: "16px" }}
                    color="#ffffffff"
                  >
                    Congratulations!
                  </Text>
                  <Text
                    fontFamily="Poppins"
                    fontWeight={400}
                    fontSize={{ base: "12px", md: "14px" }}
                    color="#ffffffff"
                  >
                    You've made your way to OTS
                  </Text>
                </VStack>
              </HStack>
            </Box>

            {/* "User Experience Class" Card - Bottom Left */}
            <Box
              position="absolute"
              bottom={{ base: "40px", md: "60px", lg: "80px" }}
              left={{ base: "20px", md: "40px", lg: "60px" }}
              bgGradient="linear(to-br, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.11) 100%)"
              borderRadius="12px"
              p={{ base: "4", md: "5" }}
              border="1px solid rgba(255, 255, 255, 0.2)"
              animation={`${float} 5s ease-in-out infinite`}
              maxW={{ base: "240px", md: "280px" }}
              w="100%"
              zIndex={3}
            >
              <VStack spacing="3" align="start">
                <HStack spacing="3" align="center">
                  <Box
                    w={{ base: "32px", md: "40px" }}
                    h={{ base: "32px", md: "40px" }}
                    bg="#fc951fff"
                    borderRadius="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      as={FaUser}
                      color="white"
                      boxSize={{ base: "14px", md: "18px" }}
                    />
                  </Box>
                  <VStack align="start" spacing="0">
                    <Text
                      fontFamily="Poppins"
                      fontWeight={600}
                      fontSize={{ base: "14px", md: "16px" }}
                      color="#ffffffff"
                    >
                      Learn all your academics from here
                    </Text>
                  </VStack>
                </HStack>
                <Button
                  bg="#F49040"
                  color="white"
                  size="sm"
                  borderRadius="8px"
                  fontFamily="Poppins"
                  fontWeight={500}
                  fontSize={{ base: "12px", md: "14px" }}
                  _hover={{ bg: "#e07e2d" }}
                  w="100%"
                  h={{ base: "32px", md: "36px" }}
                >
                  Join Now
                </Button>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default HeroSection;
