import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  AspectRatio,
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import CircleImg from "../../../assets/Circle.svg";
import ThumbnailImg from "../../../assets/what-can-do-thumbnail.svg";
import { keyframes } from "@emotion/react";

const floatAnim = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-8px) translateX(8px); }
`;

const WhatYouCanDo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w="100%"
      py={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
      position="relative"
      backgroundImage="linear-gradient(to right, #1F6A75, #093635)"
    >
      <Box maxW="1200px" w="85%" mx="auto">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: "16px", sm: "18px", md: "20px", lg: "24px" }}
        >
          {/* Left Content */}
          <Box
            flex="1"
            display={"flex"}
            flexDirection={"column"}
            alignItems={{ base: "center", md: "start" }}
            position="relative"
            zIndex={1}
          >
            <Heading
              fontSize={{ base: "24px", sm: "28px", lg: "36px" }}
              fontWeight="700"
              textAlign={{ base: "center", md: "left" }}
              mb={{ base: "16px", sm: "18px", md: "24px", lg: "28px" }}
              color="white"
              lineHeight="1.2"
            >
              Everything you can do in a physical classroom,{" "}
              <Text as="span" color="#F49040">
                you can do with OTS
              </Text>
            </Heading>

            <Text
              color="#FFFFFF"
              fontSize={{ base: "16px", sm: "18px", lg: "20px" }}
              fontWeight={"400"}
              textAlign={{ base: "center", md: "left" }}
              lineHeight="short"
              letterSpacing="0.2px"
              mb={{ base: "16px", sm: "18px", md: "24px", lg: "28px" }}
            >
              Off The School helps traditional and online schools manage
              scheduling, attendance, payments and virtual classrooms all in one
              secure cloud-based system.
            </Text>

            <Button
              bg="#F49040"
              color="#FFFFFF"
              fontFamily="Poppins"
              fontWeight={{ base: 300, md: 400 }}
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
              lineHeight="28px"
              letterSpacing="-1.1%"
              textAlign="center"
              // w={{ base: "50%", sm: "40%", md: "75%", lg: "58%" }}
              borderRadius="full"
              paddingY={{ base: "8px", sm: "12px", md: "18px", lg: "22px" }}
              paddingX={{ base: "16px", sm: "20px", md: "24px" }}
              _focus={{ 
                outline: "none", 
                boxShadow: "none", 
                bg: "none"
              }}
              _hover={{
                bg: "none",
                color: "#F49040",
                gap: "8px",
                border: "1px solid #F49040",
                shadow: "0px 0px 12px #F49040",
                transition: "all 0.3s ease-in-out",
              }}
              outline={"none"}
              // onClick={onOpen}
              onClick={() =>
                window.open(
                  "https://youtu.be/LVAPiyS6Olg?si=G3hq7JxhA7nYEWiW",
                  "_blank"
                )
              }
              leftIcon={
                <FaPlay
                  fontSize={{
                    base: "14px",
                    sm: "16px",
                    md: "18px",
                    lg: "20px",
                  }}
                />
              }
            >
              Watch how it works
            </Button>

            {/* Animated Circles */}
            <Box
              position="absolute"
              top={{ base: "-8%", md: "-12%" }}
              left={{ base: "0", md: "-10%" }}
              zIndex="-1"
              animation={`${floatAnim} 3s ease-in-out infinite`}
            >
              <Image
                src={CircleImg}
                alt="Circle decoration"
                boxSize={{ base: "54px", sm: "86px", md: "98px" }}
              />
            </Box>

            <Box
              position="absolute"
              bottom={{ base: "5%", md: "10%" }}
              right={{ base: "10%", md: "15%" }}
              zIndex="-1"
              animation={`${floatAnim} 4s ease-in-out infinite alternate`}
            >
              <Image
                src={CircleImg}
                alt="Circle decoration"
                boxSize={{ base: "32px", sm: "42px", md: "54px" }}
              />
            </Box>
          </Box>

          {/* Right Thumbnail with Play Button and Animated Boxes */}

          <Box
            flex="1.2"
            mt={{ base: "16px", sm: "18px", md: "0" }}
            position="relative"
            zIndex={1}
          >
            <Image
              src={ThumbnailImg}
              alt="Classroom thumbnail"
              w="92%"
              h="full"
              mx={"auto"}
              objectFit="contain"
              borderRadius="12px"
              border={"1px solid #CED4D3"}
              shadow={"2xl"}
            />

            {/* Play Button */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              cursor="pointer"
              onClick={onOpen}
              zIndex={2}
              bg="rgba(0, 0, 0, 0.6)"
              borderRadius="full"
              p={{ base: "12px", md: "16px" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 0 20px rgba(0,0,0,0.4)"
              transition="all 0.3s ease"
              fontSize={{ base: "14px", sm: "16px", md: "18px", lg: "22px" }}
              _hover={{
                bg: "#F49040",
                shadow: "0px 0px 12px #F49040",
              }}
            >
              <FaPlay color="white" />
            </Box>

            {/* Animated floating boxes */}
            <Box
              position="absolute"
              top={{ base: "-2%", md: "-5%" }}
              left={{ base: "0%", md: "-2%" }}
              w={{ base: "48px", sm: "78px", md: "64px", lg: "86px" }}
              h={{ base: "48px", sm: "78px", md: "64px", lg: "86px" }}
              bgGradient="linear(to-br, #FFFFFF85 0%, #FFFFFF25 100%)"
              border="2px solid #FFFFFF50"
              backdropFilter="blur(12px)"
              borderRadius={{ base: "4px", sm: "8px", md: "12px" }}
              shadow={"2xl"}
              animation={`${floatAnim} 3s ease-in-out infinite`}
            />
            <Box
              position="absolute"
              bottom={{ base: "2%", md: "5%" }}
              right={{ base: "0%", md: "2%" }}
              w={{ base: "64px", sm: "98px", md: "86px", lg: "112px" }}
              h={{ base: "64px", sm: "98px", md: "86px", lg: "112px" }}
              bgGradient="linear(to-br, #F4904035 0%, #F49040 100%)"
              border="2px solid #F4904050"
              backdropFilter="blur(12px)"
              borderRadius={{ base: "4px", sm: "8px", md: "12px" }}
              shadow={"2xl"}
              animation={`${floatAnim} 4s ease-in-out infinite alternate`}
            />
          </Box>
        </Flex>
      </Box>

      {/* Video Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="2xl" maxW="860px">
          <AspectRatio ratio={16 / 9} w="100%">
            <iframe
              src="https://www.youtube.com/watch?v=hn2HHjCOoBU&pp=ygUOb2ZmIHRoZSBzY2hvb2w%3D"
              title="Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </AspectRatio>
          <ModalCloseButton color="white"               _focus={{ outline: "none", boxShadow: "none" }}
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default WhatYouCanDo;
