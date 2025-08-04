import React from "react";
import {
  Box,
  Image,
  Flex,
  Text,
  Button,
  HStack,
  VStack,
  Heading,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiFileText, FiUsers } from "react-icons/fi";
import {useLessonContext} from '../../context/WebLessonContext' 
import { useNavigate } from "react-router-dom";

// Example chapters data


function CourseGrid({setSelectedView, chapters}) {

  const navigate = useNavigate();
  const studentEnrolChapStr = localStorage.getItem('dashboardchapter');
  let studentEnrolChap = [];
  try {
    studentEnrolChap = studentEnrolChapStr ? JSON.parse(studentEnrolChapStr) : [];
  } catch {
    studentEnrolChap = [];
  }

  const {getAllLessons} = useLessonContext();

  // const chapters = studentEnrolChap;
  const handleLearning = async  (id) =>{
    
    await getAllLessons(id);
    navigate('/dashboard/lesson-page');
  }
  return (
    <Box
      mt={{ base: "36px", sm: "48px", md: "64px" }}
      maxW={{ base: "75%", md: "85%" }}
      width="952px"
      mx={"auto"}
      >
      <SimpleGrid
        width="100%"
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing= "24px"
      >
        {chapters.map((chapter) => {
          // Calculate filled stars (rounded down)
          const randomRating = (Math.random() * 2 + 3).toFixed(1);
          const filledStars = Math.floor(randomRating);
          // Show half star if needed (not implemented here, but you can add)
          return (
            <Box
              key={chapter.id}
              bg="white"
              borderRadius="12px"
              // boxShadow="xl"
              _hover={{
                shadow: "xl",
              }}
              transition="all 0.3s ease"
              border={"1px solid #CED4D3"}
              p={{ base: "12px", sm: "16px", md: "18px" }}
            >
              <Box 
              position="relative" 
              overflow="hidden" 
              borderRadius="8px"
              border={"1px solid #CED4D3"}
              >
                <Image
                  src={chapter.imageUrl}
                  alt={chapter.title}
                  objectFit="cover"
                  w="100%"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "scale(1.2)",
                  }}
                  mx="auto"
                />
              </Box>

              <Box
                width={"95%"}
                mx="auto"
                my={{ base: "8px", sm: "12px", md: "8px", lg: "12px" }}
              >
                <VStack
                  alignItems={"baseline"}
                  spacing={{ base: "4px", sm: "8px", md: "4px", lg: "8px" }}
                >
                  {/* ⭐ Fixed Star Rating */}
                  <HStack
                    spacing={{ base: "6px", sm: "8px" }}
                    align="center"
                    fontSize={{ base: "12px", sm: "16px" }}
                    color="#A2ABAA"
                  >
                     <HStack spacing={{ base: "2px", sm: "4px" }}>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <Box key={i}>
              {i < filledStars ? (
                <Box as="span" fontSize="inherit">
                  <FaStar color="#F49040" />
                </Box>
              ) : (
                <Box as="span" fontSize="inherit">
                  <FaRegStar color="#A2ABAA" />
                </Box>
              )}
            </Box>
          ))}
      </HStack>
      <Text color={"#0D0D0D"} fontWeight={"medium"}>
        {randomRating}
      </Text>
      <Text>({chapter.reviewCount ||0})</Text>
                  </HStack>

                  <Heading
                    fontSize={{
                      base: "18px",
                      sm: "24px",
                      md: "18px",
                      lg: "24px",
                    }}
                    noOfLines={2}
                  >
                    {chapter.title}
                  </Heading>

                  <HStack
                    direction="row"
                    fontSize={{
                      base: "14px",
                      sm: "18px",
                      md: "14px",
                      lg: "18px",
                    }}
                    color="#A2ABAA"
                    spacing={2}
                  >
                      <FiFileText color="#F49040" />
                      <Text>{chapter.lessonCount || 1} Lessons</Text>

                  </HStack>

                  <Button
                    px={4}
                    py={3}
                    fontWeight="light"
                    cursor="pointer"
                    transition="all 0.3s ease"
                    width="full"
                    bg="none"
                    color="#F49040"
                    borderRadius="30px"
                    border={"1px solid #F49040"}
                    h={{ base: "32px", sm: "42px", md: "32px", lg: "42px" }}
                    fontSize={{
                      base: "12px",
                      sm: "16px",
                      md: "12px",
                      lg: "16px",
                    }}
                    _hover={{
                      border: "2px solid #F49040",
                      color: "#FFFFFF",
                      bg: "#F49040",
                    }}
                    _focus={{
                      outline: "none",
                      boxShadow: "none",
                      ring: 2,
                      ringColor: "#F49040",
                    }}
                    onClick={()=>{handleLearning(chapter.id)}}
                  >
                    Start Learning
                  </Button>
                </VStack>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default CourseGrid;