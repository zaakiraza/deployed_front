import React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Button,
  Flex,
  Center,
  Icon,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

import edtech from "../../../assets/education-technology.png";
import school from "../../../assets/school.png";
import courses from "../../../assets/tech-support.png";
import coaching from "../../../assets/physics.png";
import Madarssa from "../../../assets/islamic.png";
import rozgar from "../../../assets/professional-success.png";

const OurServices = () => {
  // Service card data
  const services = [
    {
      title: "EdTech",
      description:
        "Our EdTech team leverages technology to enrich your learning experiences and extend our educational reach worldwide.",
      image: edtech,
    },
    {
      title: "School",
      description:
        "With smart lesson planning and inventive learning outcomes, we cater to students from pre-primary to secondary levels.",
      image: school,
    },
    {
      title: "Professional Courses",
      description:
        "Unlock your potential with our hands-on skill development courses tailored to help you excel in the real-world environment.",
      image: courses,
    },
    {
      title: "Coaching",
      description:
        "Achieve academic excellence in Grades IX-XI of Sindh Board with expert guidance and digital classroom experiences.",
      image: coaching,
    },
    {
      title: "Madarssa Program",
      description:
        "Strengthen your faith and brighten your future with our modern and inclusive Madra section for academic excellence.",
      image: Madarssa,
    },
    {
      title: "Rozgar Program",
      description:
        "Elevate your career prospects with our accelerated employment program, led by knowledgeable industry professionals.",
      image: rozgar,
    },
  ];

  // Service Card Component
  const ServiceCard = ({ title, description, image, isOdd }) => {
    return (
      <Box
              bgGradient="linear(to-br, rgba(0, 82, 89, 1) 0%, rgba(255, 255, 255, 0.59) 100%)"

        border="2px solid #FFFFFF50"
        backdropFilter="blur(24px)"
        borderRadius="16px"
        p={{ base: "8px", sm: "12px", md: "18px", lg: "24px" }}
        h={{ base: "100%", sm: "90%", md: "92%", lg: "92%" }}
        minH="200px"
        w="100%"
        maxW="512px"
        position="relative"
        transition="all 0.3s ease"
        boxShadow="xl"
        _hover={{
          transform: "translateY(-12px)",
          boxShadow: "2xl",
        }}
        sx={{
          filter: "drop-shadow(0px 10px 60px rgba(38, 45, 118, 0.08))",
          "&:hover": {
            filter: "drop-shadow(0px 10px 60px rgba(38, 45, 118, 0.12))",
          },
        }}
      >
        {/* Icon Circle */}
        <Center
          position="absolute"
          top="-60px"
          left="50%"
          transform="translateX(-50%)"
          w={{ base: "92px", sm: "136px", md: "112px", lg: "136px" }}
          h={{ base: "92px", sm: "136px", md: "112px", lg: "136px" }}
          borderRadius="full"
          bg="white"
          boxShadow="0 0 0 12px rgba(255, 255, 255, 0.5)"
          zIndex={2}
        >
          <Image
            src={image}
            w={{ base: "64px", sm: "86px", md: "64px", lg: "86px" }}
            h={{ base: "64px", sm: "86px", md: "64px", lg: "86px" }}
          />
        </Center>

        {/* Content */}
        <VStack
          spacing={{ base: "8px", sm: "12px", md: "18px", lg: "24px" }}
          py={{ base: "48px", sm: "86px", md: "64px", lg: "86px" }}
          textAlign="center"
        >
          <Heading
            as="h3"
            fontSize={{ base: "24px", sm: "28px", md: "28px", lg: "32px" }}
            fontWeight="700"
            fontFamily="Poppins"
            color="#F49040"
          >
            {title}
          </Heading>
          <Text
            color="white"
            lineHeight="1.5"
            fontFamily="Poppins"
            fontSize={{ base: "14px", sm: "16px", lg: "18px" }}
            fontWeight={"400"}
            letterSpacing="0.2px"
            // px={4}
          >
            {description}
          </Text>
        </VStack>
      </Box>
    );
  };

  return (
    <Box
      w={"100%"}
      paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
      color="white"
      position="relative"
    >
      <Box maxW="1200px" w={"85%"} mx={"auto"} position="relative">
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
            color={"white"}
          >
            Our{" "}
            <Text as="span" color="#F49040">
              Services
            </Text>
          </Heading>
          <Text
            color="#CED4D3"
            fontSize={{ base: "16px", sm: "18px", lg: "20px" }}
            fontWeight={"400"}
            maxW={{ base: "92%", sm: "85%", md: "75%" }}
            mx="auto"
            lineHeight="short"
            letterSpacing="0.2px"
            textAlign="center"
          >
            This very extraordinary feature, can make learning activities more
            efficient
          </Text>
        </Box>

        {/* Services Grid */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: "8px", sm: "12px", md: "18px", lg: "24px" }}
          mt={{ base: "36px", sm: "42px", md: "54px", lg: "64px" }}
          mx="auto"
          justifyContent="center"
        >
          {services.map((service, index) => (
            <Box
              key={index}
              pt={"64px"}
              pb={"24px"}
              position="relative"
              zIndex={1}
              mx="auto"
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                image={service.image}
                isOdd={index % 2 !== 0}
              />
            </Box>
          ))}
        </SimpleGrid>

        {/* Learn More Button */}
        <Center>
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
                      cursor={"pointer"}
                      borderRadius="full"
                      paddingY={{ base: "8px", sm: "12px", md: "18px", lg: "22px" }}
                      paddingX={{ base: "16px", sm: "20px", md: "24px" }}
                      _focus={{ outline: "none", boxShadow: "none"}}
                      _hover={{
                        bg: "none",
                        color: "#F49040",
                        gap: "8px",
                        border: "1px solid #F49040",
                        shadow: "0px 0px 12px #F49040",
                        transition: "all 0.3s ease-in-out",
                      }}
                        onClick={() => window.open("https://offtheschool.io/", "_blank")}                      rightIcon={
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
                      Learn More
                    </Button>
        </Center>
      </Box>

      {/* V-shaped bottom design */}
      <Box
        position="absolute"
        bottom="-1px"
        left="0"
        right="0"
        height={{ base: "50px", sm: "70px", md: "100px", lg: "150px" }}
        width="100%"
        overflow="hidden"
        lineHeight="0"
        zIndex={1}
      >
        <Box
          as="svg"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          position="absolute"
          width="100%"
          height={{ base: "50px", sm: "70px", md: "100px", lg: "150px" }}
        >
          <Box as="path" d="M0 0L720 150L1440 0V150H0Z" fill="white"></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OurServices;
