import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Icon,
  Image
} from "@chakra-ui/react";
import AssessmentsPic from "../../../assets/AssessmentsPic.svg";

const AssessmentsSection = () => {
  return (
    <Box position="relative" overflow="hidden">
      {/* Main content area with V-shaped background */}      <Box 
        position="relative"
        py="24" 
        px="4" 
        bgGradient="linear(to-b, #1F6A75, #093635)"
        color="white"
        clipPath="polygon(0 0, 50% 15%, 100% 0, 100% 85%, 50% 100%, 0 85%)"
        minHeight="850px"
      >
        <Container maxW="7xl" position="relative" zIndex="1" mt="10">
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap="9"
          >            {/* Left side - Assessment Image */}
            <Box
              flex="1"
              position="relative"
            >
              <Image
                src={AssessmentsPic}
                alt="Assessments and Quizzes"
                objectFit="contain"
                w="full"
                maxH="700px"
              />
            </Box>            {/* Right Side: Text Content */}
            <Box flex="1" color="white">
              <Heading fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }} fontWeight="bold" mb="6">
                Assessments, <Text as="span" color="#F49040">Quizzes</Text>, Tests
              </Heading>
              <Text mb="6" fontSize={{ base: "md", md: "lg" }}>
                Easily launch live assignments, quizzes, and tests. Student results are automatically entered in the online gradebook.
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default AssessmentsSection;