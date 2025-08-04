import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  HStack,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import Newsletter from "./Newsletter";

// Import all news logo SVGs
import URDU_NEWS from "../../../assets/URDU-NEWS.svg";
import PTV_NEWS from "../../../assets/PTV-NEWS.svg";
import EXPRESS_NEWS from "../../../assets/EXPRESS-NEWS.svg";
import DAWN_NEWS from "../../../assets/DAWN-NEWS.svg";
import ARY_NEWS from "../../../assets/ARY-NEWS.svg";
import AJ_NEWS from "../../../assets/AJ-NEWS.svg";
import GREENWICH_UNIVERSITY from "../../../assets/GREENWICH-UNIVERSITY.svg";
import SAMAA_NEWS from "../../../assets/SAMAA-NEWS.svg";

const MediaRecognition = () => {
  const [animate, setAnimate] = useState(true);

  // Define the sliding animation keyframes
  const slideAnimation = keyframes`
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  `;

  // Create animation with continuous movement - adjust duration as needed
  const animation = `${slideAnimation} 30s linear infinite`;

  // Array of news logos to display
  const newsLogos = [
    { src: URDU_NEWS, alt: "Urdu News" }, //https://www.facebook.com/UrduNewsCom/videos/4077657492335517/
    { src: PTV_NEWS, alt: "PTV News" },
    { src: EXPRESS_NEWS, alt: "Express News" },
    { src: DAWN_NEWS, alt: "Dawn News" }, // https://www.dawn.com/news/1660588/education-the-school-in-a-mosque?fbclid=IwAR2Cjesz12OLZnxGVu1bBfHnIly4GY6uVQu_jw8n921rZMPUG3YIckSB08U
    { src: ARY_NEWS, alt: "ARY News" }, // https://www.facebook.com/OffTheSchool/videos/751482356401415/
    { src: AJ_NEWS, alt: "AJ News" },
    { src: GREENWICH_UNIVERSITY, alt: "GREENWICH UNIVERSITY" }, 
    { src: SAMAA_NEWS, alt: "SAMAA NEWS" }, // https://www.facebook.com/samaatvnews/videos/334062804797608/?extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C
  ];

  // Optional: Reset animation periodically to ensure smooth continuous flow
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 50);
    }, 60000); // Reset every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      w={"100%"}
      bg="white"
      paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
      position="relative"
      overflow="hidden"
    >
      <Newsletter />

      {/* <Container maxW="7xl" mt={{ base: "42px", sm: "54px", md: "64px" }}>
        <Heading
          textAlign={"center"}
          fontSize={{ base: "28px", sm: "36px", md: "42px" }}
          mb={{ base: "14px", sm: "18px", md: "24px", lg: "28px" }}
          fontWeight="700"
        >
          <Text as="span" color="#1F6A75">
            Media{" "}
          </Text>
          <Text as="span" color="#F49040">
            Recognition
          </Text>
        </Heading>

        <Text
          textAlign="center"
          fontSize={{ base: "16px", sm: "18px", md: "20px" }}
          fontWeight={"400"}
          color="#0D0D0D"
          mb={{ base: "18px", sm: "24px", md: "36px" }}
          mx="auto"
        >
          Our platform has been featured in leading news outlets across the
          country, helping teachers and students enhance their educational
          experience.
        </Text>
      </Container> */}

      <Text
        textAlign="center"
        fontSize={{ base: "18px", sm: "24px", md: "28px" }}
        color="#A2ABAA"
        mb={{ base: "18px", sm: "24px", md: "36px" }}
        mt={{ base: "42px", sm: "54px", md: "64px" }}
        mx="auto"
      >
        100+ Media Recognition
      </Text>

      {/* Continuous sliding carousel with edge fade effects */}

      <Box
        position="relative"
        width="100%"
        height={{ base: "86px", md: "136px", lg: "152px" }}
        overflow="hidden"
        my={6}
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "10%",
          height: "100%",
          background: "linear-gradient(to right, white, transparent)",
          zIndex: 2,
        }}
        _after={{
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "10%",
          height: "100%",
          background: "linear-gradient(to left, white, transparent)",
          zIndex: 2,
        }}
      >
        {animate && (
          <Box position="relative" width="100%" height="100%" overflow="hidden">
            {/* First row of logos */}
            <Flex
              position="absolute"
              width="max-content" // To contain all logos
              alignItems="center"
              justifyContent="center"
              height="100%"
              animation={animation}
            >
              {" "}
              {/* First set of logos */}
              {newsLogos.map((logo, index) => (
                <Box
                  key={`first-${index}`}
                  mx={{ base: 6, md: 9, lg: 12 }}
                  display="flex"
                  alignItems="center"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <Box
                    as="a"
                    href="https://www.facebook.com/OffTheSchool/videos/751482356401415/"
                    target="_blank"
                    rel="noopener noreferrer"
                    cursor="pointer"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      maxH={{ base: "50px", md: "75px", lg: "90px" }}
                      w="auto"
                      opacity={0.85}
                      _hover={{ opacity: 1 }}
                    />
                  </Box>
                </Box>
              ))}
              {/* Duplicate logos for seamless scrolling */}
              {newsLogos.map((logo, index) => (
                <Box
                  key={`second-${index}`}
                  mx={{ base: 6, md: 9, lg: 12 }}
                  display="flex"
                  alignItems="center"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <Box
                    as="a"
                    href="https://www.facebook.com/OffTheSchool/videos/751482356401415/"
                    target="_blank"
                    rel="noopener noreferrer"
                    cursor="pointer"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      maxH={{ base: "50px", md: "75px", lg: "90px" }}
                      w="auto"
                      opacity={0.85}
                      _hover={{ opacity: 1 }}
                    />
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>
        )}
      </Box>

      {/* Sliding Dots */}
      {/* <Flex
        justify="center"
        align="center"
        gap={{ base: "4px", sm: "6px", md: "8px" }}
      >
        {feedbackData.map((_, index) => {
          const isActive = activeIndex === index;
          const width = isActive
            ? { base: "18px", sm: "24px", md: "30px" }
            : { base: "6px", sm: "8px", md: "10px" };
          return (
            <Box
              key={index}
              w={width}
              h={{ base: "6px", sm: "8px", md: "10px" }}
              bg={isActive ? "#F49040" : "#CED4D3"}
              borderRadius="full"
              cursor="pointer"
              transition="all 0.3s ease"
              onClick={() => handleDotClick(index)}
              _hover={{
                bg: isActive ? "#F49040" : "#CED4D3",
              }}
            />
          );
        })}
      </Flex> */}
    </Box>
  );
};

export default MediaRecognition;
