import React from "react";
import { 
  Box, 
  Container, 
  Flex, 
  Heading, 
  Text, 
  Image,
  Grid,
  Icon
} from "@chakra-ui/react";
// Import the image from assets folder
import ToolsForTeachers from "../../../assets/ToolsForTeachers.svg";
import { FiBook, FiFileText, FiVideo, FiUsers } from "react-icons/fi";

const ToolsForTeachersSection = () => {
  return (
    <Box position="relative" overflow="hidden" bg="white" py={12}>      
      <Container maxW="6xl" zIndex="1" position="relative">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap="8"
        >
          {/* Left Content */}
          <Box flex="1" pr={{ base: 0, md: 8 }} zIndex="2">
            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              mb="6"
              lineHeight="1.2"
            >
              <Text as="span" color="#F49040" fontWeight="extrabold">
                Tools
              </Text>{" "}
              <Text as="span" color="#1F6A75">
                For Teachers &
              </Text>{" "}
              <Box as="span" display="block" color="#1F6A75">
                Learners
              </Box>
            </Heading>
            
            <Text color="gray.600" mb="8" fontSize="lg">
              Class has a dynamic set of teaching tools built to be deployed and used during class. Teachers can handout assignments in real-time for students to complete and submit.
            </Text>
            
            {/* Feature icons grid */}
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={8}>
              <Flex align="center">
                <Box bg="orange.100" p={3} borderRadius="full" mr={3}>
                  <Icon as={FiBook} color="orange.500" boxSize={5} />
                </Box>
                <Text fontWeight="medium">Interactive Lessons</Text>
              </Flex>
              <Flex align="center">
                <Box bg="teal.100" p={3} borderRadius="full" mr={3}>
                  <Icon as={FiFileText} color="teal.500" boxSize={5} />
                </Box>
                <Text fontWeight="medium">Assignment Tools</Text>
              </Flex>
              <Flex align="center">
                <Box bg="teal.100" p={3} borderRadius="full" mr={3}>
                  <Icon as={FiVideo} color="teal.500" boxSize={5} />
                </Box>
                <Text fontWeight="medium">Video Resources</Text>
              </Flex>
              <Flex align="center">
                <Box bg="orange.100" p={3} borderRadius="full" mr={3}>
                  <Icon as={FiUsers} color="orange.500" boxSize={5} />
                </Box>
                <Text fontWeight="medium">Collaborative Tools</Text>
              </Flex>
            </Grid>
          </Box>

          {/* Right Image */}
          <Box flex="1" position="relative" maxW={{ base: "md", md: "none" }} zIndex="1">
            <Box
              position="relative"
              h="400px"
              mx="auto"
              maxW="md"
              overflow="hidden"
            >
              {/* Background decorative elements */}
              <Box
                position="absolute"
                top="-20px"
                right="-20px"
                width="220px"
                height="220px"
                borderRadius="full"
                bg="#F49040"
                opacity="0.1"
                zIndex="0"
              />
              <Box
                position="absolute"
                bottom="-30px"
                left="-30px"
                width="180px"
                height="180px"
                borderRadius="full"
                bg="teal.500"
                opacity="0.1"
                zIndex="0"
              />
              
              {/* Dot pattern */}
              <Box position="absolute" top="10%" right="5%" zIndex="1">
                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                  {[...Array(9)].map((_, i) => (
                    <Box key={i} w="6px" h="6px" bg="orange.400" borderRadius="full" />
                  ))}
                </Grid>
              </Box>
              
              {/* Main image - adjusted to show half of the student */}
              <Box position="relative" h="full" w="full">
                <Image
                  src={ToolsForTeachers}
                  alt="Student with books"
                  objectFit={"cover"}
                  objectPosition="right center"
                  w="full"
                  h="full"                  
                  pt={-20}
                  zIndex="1"
                />
              </Box>
              
              {/* Decorative elements */}
              <Box
                w="40px"
                h="40px"
                bg="#F49040"
                position="absolute"
                top="-15px"
                left="15%"
                rounded="full"
                zIndex="1"
                opacity="0.8"
              />
              <Box
                w="20px"
                h="20px"
                bg="teal.500"
                position="absolute"
                bottom="10%"
                right="10%"
                rounded="full"
                zIndex="1"
              />
              <Box
                w="15px"
                h="15px"
                bg="#F49040"
                position="absolute"
                top="30%"
                right="5%"
                rounded="full"
                zIndex="1"
                opacity="0.6"
              />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default ToolsForTeachersSection;