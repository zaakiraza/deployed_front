import React from "react";
import { Box, Button, Heading, Text, HStack } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BOX from '../../views/BOX';
import Lesson from "./Lesson";
import { useLessonContext } from '../../context/WebLessonContext';

function LessonPage() {
  
  const navigate = useNavigate();
  const { allLessons } = useLessonContext();
  const lesson = allLessons;

  return (
    <BOX>
      

       <Box style={{ width: "100vw", minHeight: "100vh" }}>
        <Box
                maxW={{ base: "75%", md: "85%" }}
                    width="952px"
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={{base: "12px", sm: "16px" ,md: "18px"}}
                mx={"auto"}
        
                >
                  <Box 
                  bg={"#FFFFFF"}
                  width={"fit-content"}
                  borderRadius={"50%"}
                  color={"#1F6A75"}
                  cursor={"pointer"}
                  onClick={() => navigate('/dashboard/course-details')}
                  padding={{ base: "8px" , sm: "12px", md: "16px" }}
                  fontSize={{ base: "16", sm: "18px", md: "24px" }}
                  border={"none"}
                  _hover={{
                    transition: "color 0.3s ease",
                    border: "1px solid #F49040",
                    color: "#F49040",
                    dropShadow: "0px 4px 24px #F4904075",
                  }}
                  _focus={{ outline: "none", boxShadow: "none", }}
                  >
                    <FiChevronLeft/>
                  </Box>
                  <Box
                    // mx={"auto"}
                    px={{ base: 4, md: 6 }}
                    py={{ base: "64px", md: "86px" }}
                    textAlign="center"
                    color="white"
                  >
                    <Heading
                      fontSize={{ base: "32px", md: "42px" }}
                      fontFamily="Poppins"
                      fontWeight="600"
                    >
                      {lesson && lesson[0]?.title ? lesson[0].title.toUpperCase() : "LESSON TITLE"}
                    </Heading>
                    <Text
                      mt={{base: "2px", md: "4px"}}
                      fontSize={{ base: "18px", md: "24px" }}
                      fontFamily="Poppins"
                      fontWeight="200"
                    >
                       Resource: {lesson && lesson[0]?.Chapter?.Subject?.name || "Subject"}/Chapter: {lesson && lesson[0]?.Chapter?.title || "Chapter"}
                    </Text>
                  </Box>
                </Box>
           

        <Box
          backgroundColor="rgba(255, 255, 255, 1)"
          margin="auto"
          padding="20px"
          height="100vh"
          borderTopLeftRadius="64px"
          borderTopRightRadius="64px"
          width="100%"
        >
          <Lesson lesson={lesson} />
        </Box>
      </Box>
    </BOX>
  );
}

export default LessonPage;