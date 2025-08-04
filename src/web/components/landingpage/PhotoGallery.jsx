import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  VStack,
  Image,
  Flex,
  Circle,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// Sample images - replace with your actual images
const sampleImages = [
  ["/src/assets/aim1.png", "/src/assets/aim2.png", "/src/assets/feedback1.png"],
  [
    "/src/assets/history1.png",
    "/src/assets/history2.png",
    "/src/assets/history3.png",
  ],
  [
    "/src/assets/tablet.png",
    "/src/assets/pakistan-flag.png",
    "/src/assets/progress.png",
  ],
];

const PhotoGallery = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const totalSlides = sampleImages.length;

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Navigate to specific slide
  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  // Previous and next slide navigation
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <Box
      w={"100%"}
      paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
      bg="white"
    >
      <Box maxW="1200px" w={"92%"} mx={"auto"}>
        {/* Section Title */}
        <Box
          textAlign="center"
          mb={{ base: "24px", sm: "36px", md: "42px", lg: "56px" }}
        >
          <Heading
            as="h2"
            fontSize={{ base: "28px", sm: "36px", lg: "42px" }}
            fontWeight="700"
            mb={{ base: "8px", sm: "12px", md: "18px", lg: "24px" }}
            color={"#1F6A75"}
          >
            Our{" "}
            <Text as="span" color="#F49040">
              Photo Gallery
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
            Education For Everyone
          </Text>
        </Box>

        {/* Photo Gallery Slider */}
        <Box
          position="relative"
          mt={{ base: "36px", sm: "48px", md: "64px", lg: "86px" }}
          mx="auto"
          maxW="1200px"
          overflow="hidden"
        >
          <Flex
            ref={sliderRef}
            transition="all 0.5s ease"
            transform={`translateX(-${activeSlide * 100}%)`}
            width="100%"
          >
            {sampleImages.map((slideImages, slideIndex) => (
              <Box
                key={slideIndex}
                minW="100%"
                px={{ base: "8px", sm: "12px", md: "16px" }}
              >
                <Flex
                  align="center"
                  justify="center"
                  flexWrap="nowrap"
                  position="relative"
                  px={{ base: "8px", sm: "12px", md: "16px" }}
                  py={{ base: "12px", sm: "18px", md: "24px" }}
                >
                  {slideImages.map((img, imgIndex) => (
                    <Box
                      key={imgIndex}
                      position="relative"
                      mx={{ base: "4px", sm: "6px", md: "8px" }}
                      flex="1"
                      transform={"scale(1)"}
                      transition="all 0.3s ease"
                      zIndex={1}
                    >
                      <motion.div
                        whileHover={{
                          y: -10,
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box
                          borderRadius="12px"
                          overflow="hidden"
                          bg="white"
                          border={"1px solid #CED4D3"}
                          width="100%"
                          height={{ base: "200px", md: "250px" }}
                          position="relative"
                          _hover={{
                            border: "none",
                            shadow: "2xl",
                          }}
                        >
                          <Image
                            src={img}
                            alt={`Gallery image ${
                              slideIndex * 3 + imgIndex + 1
                            }`}
                              // fallbackSrc={`https://via.placeholder.com/600x400?text=OTS+Gallery+${
                              //   slideIndex * 3 + imgIndex + 1
                              // }`}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                          />
                        </Box>
                      </motion.div>
                    </Box>
                  ))}
                </Flex>
              </Box>
            ))}
          </Flex>

          {/* Navigation Arrows */}
          <IconButton
            aria-label="Previous slide"
            position="absolute"
            left={{ base: "8px", sm: "12px", md: "16px", lg: "18px" }}
            top="50%"
            transform="translateY(-50%)"
            borderRadius="full"
            bg="white"
            fontSize={{ base: "18px", sm: "20px", md: "24px" }}
            color={"#A2ABAA"}
            boxShadow="2xl"
            border={"1px solid #A2ABAA75"}
            onClick={prevSlide}
            icon={<ChevronLeftIcon />}
            zIndex={20}
            _focus={{ outline: "none", boxShadow: "none", bg: "#FFFFFF"}}
            _hover={{
              color: "#F49040",
              borderColor: "#F49040",
              shadow: "0px 0px 12px #F49040",
            }}
          />
          <IconButton
            aria-label="Next slide"
            position="absolute"
            right={{ base: "8px", sm: "12px", md: "16px", lg: "18px" }}
            top="50%"
            transform="translateY(-50%)"
            borderRadius="full"
            bg="white"
            fontSize={{ base: "18px", sm: "20px", md: "24px" }}
            color={"#A2ABAA"}
            boxShadow="2xl"
            border={"1px solid #A2ABAA75"}
            onClick={nextSlide}
            zIndex={20}
            icon={<ChevronRightIcon />}
            _focus={{ outline: "none", boxShadow: "none", bg: "#FFFFFF"}}
            _hover={{
              color: "#F49040",
              borderColor: "#F49040",
              shadow: "0px 0px 12px #F49040",
            }}
          />

          {/* Navigation Dots */}
          <Flex 
          justify="center"
          align="center"
          mt={{ base: "12px", sm: "16px", md: "18px" }}
          gap={{ base: "4px", sm: "6px", md: "8px" }}
          >
           
            {sampleImages.map((_, index) => {
            const isActive = activeSlide === index;
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
                onClick={() => goToSlide(index)}
                _hover={{
                  bg: isActive ? "#F49040" : "#CED4D3",
                }}
              />
            );
          })}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default PhotoGallery;
