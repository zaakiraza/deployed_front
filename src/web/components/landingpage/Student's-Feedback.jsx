import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  HStack,
  VStack,
  Avatar,
  IconButton,
} from '@chakra-ui/react';
import PlanetPic from '../../../assets/Planet-Pic.svg';
import FeedbackArrow from "../../../assets/Student'sFeedbackArrow.svg";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

// Sample feedback data
const feedbacks = [
  {
    id: 1,
    name: 'Roe Smith',
    role: 'Designer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    feedback: 'I must explain to you how all this mistaken. Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound'
  },
  {
    id: 2,
    name: 'Joe Biden',
    role: 'UI/UX Student',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    feedback: 'I must explain to you how all this mistaken. Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound'
  },
  {
    id: 3,
    name: 'ALis Jordan',
    role: 'Marketing Student',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    feedback: 'I must explain to you how all this mistaken. Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound'
  },
  {
    id: 4,
    name: 'Ali Faraz',
    role: 'Urdu Student',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    feedback: 'I must explain to you how all this mistaken. Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound'
  }
];

const StudentsFeedback = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const feedbacksPerPage = 4;
  const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const displayedFeedbacks = feedbacks.slice(
    currentPage * feedbacksPerPage,
    (currentPage + 1) * feedbacksPerPage
  );

  return (
    <Box py={{ base: 16, md: 20 }} position="relative" overflow="hidden">
      {/* Planet image as decorative element */}
      <Box 
        position="absolute" 
        right={{ base: "-150px", lg: "-100px" }} 
        bottom={{ base: "-150px", lg: "-100px" }}
        zIndex={0}
      >
        <Image 
          src={PlanetPic} 
          alt="Planet decoration" 
          width={{ base: "250px", lg: "350px" }}
          opacity={0.8}
        />
      </Box>
      
      {/* Arrow decoration */}
      <Box
        position="absolute"
        left={{ base: "10px", md: "80px" }}
        bottom="40%"
        zIndex={0}
        display={{ base: "none", md: "block" }}
      >
        <Image
          src={FeedbackArrow}
          alt="Feedback arrow"
          width={{ base: "80px", lg: "120px" }}
        />
      </Box>
      
      <Container maxW="7xl" position="relative" zIndex={1}>
        {/* Section Header */}
        <Box textAlign="center" mb={{ base: 10, md: 16 }}>
          <Heading 
            as="h2" 
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="#1F6A75"
            mb={4}
          >
            Student's Feedbacks
          </Heading>
          
          <Text 
            fontSize={{ base: "md", md: "lg" }}
            color="gray.500"
            maxW="2xl"
            mx="auto"
          >
            Our students share their experiences about learning with Off The School.
          </Text>
        </Box>
        
        {/* Feedback Cards */}
        <Flex 
          wrap="wrap" 
          justify="center"
          gap={{ base: 4, md: 6 }}
          px={{ base: 2, md: 0 }}
        >
          {displayedFeedbacks.map((feedback) => (
            <Box 
              key={feedback.id}
              w={{ base: "full", sm: "calc(50% - 1rem)", lg: "calc(25% - 1.5rem)" }}
              minH="340px"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              transition="all 0.3s ease"
              bg={hoveredCardId === feedback.id ? "#F49040" : "white"}
              color={hoveredCardId === feedback.id ? "white" : "black"}
              onMouseEnter={() => setHoveredCardId(feedback.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              display="flex"
              flexDirection="column"
            >
              {/* Quote Icon */}
              <Text 
                fontSize="4xl" 
                fontFamily="serif" 
                color={hoveredCardId === feedback.id ? "white" : "#F49040"}
                mb={4}
              >
                " "
              </Text>
              
              {/* Feedback Content */}
              <Text 
                flex="1"
                fontSize={{ base: "md", md: "lg" }}
                mb={6}
              >
                {feedback.feedback}
              </Text>
              
              {/* User Information */}
              <Flex align="center" justify="space-between" mt="auto">
                <Flex align="center">
                  <Avatar 
                    src={feedback.avatar} 
                    name={feedback.name} 
                    size="md" 
                    mr={3}
                  />
                  <Box>
                    <Text fontWeight="bold">{feedback.name}</Text>
                    <Text 
                      fontSize="sm" 
                      color={hoveredCardId === feedback.id ? "white" : "gray.500"}
                    >
                      {feedback.role}
                    </Text>
                  </Box>
                </Flex>
                
                {/* Like/Dislike */}
                <HStack spacing={2}>
                  <Box 
                    as="button" 
                    aria-label="Like"
                    color={hoveredCardId === feedback.id ? "white" : "#F49040"}
                  >
                    👍
                  </Box>
                  <Box 
                    as="button" 
                    aria-label="Dislike"
                    color={hoveredCardId === feedback.id ? "white" : "#F49040"}
                    ml={2}
                  >
                    👎
                  </Box>
                </HStack>
              </Flex>
            </Box>
          ))}
        </Flex>
        
        {/* Pagination Dots */}
        <HStack justify="center" spacing={2} mt={10}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Box
              key={index}
              w="10px"
              h="10px"
              borderRadius="full"
              bg={index === currentPage ? "#1F6A75" : "gray.200"}
              cursor="pointer"
              onClick={() => setCurrentPage(index)}
              _hover={{
                bg: index === currentPage ? "#1F6A75" : "gray.300"
              }}
            />
          ))}
        </HStack>
      </Container>
    </Box>
  );
};

export default StudentsFeedback;