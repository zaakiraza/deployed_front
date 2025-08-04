      import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Icon
} from "@chakra-ui/react";
import ClassmanagementPic from "../../../assets/ClassmanagementPic.svg";

const ClassManagementSection = () => {
  return (    <Box pt="20" pb="32" px="4" bg="white" position="relative" overflow="visible">
        <Container maxW="7xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap="8"
          >            {/* Left side - Text */}
            <Box flex="1">
              <Heading
                fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
                fontWeight="bold"
                mb="6"
                lineHeight="1.2"
              >
                <Text as="span" color="#F49040">
                  Class Management
                </Text>{" "}
                <Text as="span" color="#1F6A75">
                  Tools for Educators
                </Text>
              </Heading>
              <Text color="gray.600" mb="8" fontSize={{ base: "md", md: "lg", lg: "xl" }}>
                Class provides tools to help run and manage the class such as Class Roster, Attendance, and more. With the Gradebook, teachers can review and grade tests and quizzes in real-time.
              </Text>
            </Box>            {/* Right side - Class Management Image */}
            <Box flex="1" position="relative" maxW={{ base: "md", md: "none" }}>
              <Box
                position="relative"
                mx="auto"
                maxW="md"
              >
                <Image
                  src={ClassmanagementPic}
                  alt="Class Management Tools"
                  objectFit="contain"
                  w="full"
                  maxH={{ base: "400px", md: "600px", lg: "650px" }}
                />
              </Box>
            </Box>
          </Flex>

          {/* See More Features Button */}
          <Flex justify="center" mt="16">
            <Button
              border="1px"
              borderColor="#F49040"
              color="#F49040"
              rounded="full"
              px="8"
              py="2"
              _hover={{ bg: "#F49040", color: "white" }}
            >
              See More Features
            </Button>          </Flex>
        </Container>
      </Box>
  );
};

export default ClassManagementSection;