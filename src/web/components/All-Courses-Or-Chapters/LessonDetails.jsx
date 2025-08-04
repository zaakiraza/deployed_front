import React from "react";
import Module from "../../views/Module";
import { Text, Box, Heading } from "@chakra-ui/react";
import BOX from "../../views/BOX";

function LessonDetails() {
  
  const subjectDetails = {
    class: "IX",
    subject: "physics-I",
  };

  const courseDetails = {
    id: "1",
    courseName: "Web Developement",
    courseDescription:
      "Master the basic of Website Development by building 10 Projects in 10 Classes, with HTML ...",
    courseRating: "4.9",
    cost: "Free",
    courseDate: "23 Aug 2025",
    exerciseType: "Interactive Coding Exercise",
    isEnroled: false,
  };

  const courseModules = [
    {
      id: "1",
      moudleNumber: "Module 1",
      duration: "1h 32min",
      task: [
        { title: "Heading & Paragraph Tags", iscomplete: false },
        { title: "List, Anchor Tags & add images", iscomplete: false },
        { title: "Forms & Table", iscomplete: true },
        { title: "Hello World", iscomplete: true },
      ],
      percentage: "85",
    },
    {
      id: 2,
      moudleNumber: "Module 2",
      duration: "1h 32min",
      task: [
        { title: "Images and background", iscomplete: false },
        { title: "Anchor Tags Attributes", iscomplete: true },
        { title: "Class and id", iscomplete: false },
      ],
      percentage: "50",
    },
  ];

  const background = "white";
  return (
    <BOX>
      <Box
        // mt={{ base: "48px", sm: "64px", md: "86px" }}
        maxW={{ base: "75%", md: "85%" }}
        width="952px"
        mx={"auto"}
        px={{ base: 4, md: 6 }}
        py={{ base: "64px", md: "86px" }}
        textAlign="center"
        color="white"
      >
        <Heading
          // mt={{ base: 8, md: 12 }}
          fontSize={{ base: "36px", md: "48px" }}
          fontFamily="Poppins"
          fontWeight="600"
        >
          {subjectDetails.class.toUpperCase()}-
          {subjectDetails.subject.toUpperCase()} CHAPTERS
        </Heading>
        <Text
          mt={2}
          fontSize={{ base: "18px", md: "24px" }}
          fontFamily="Poppins"
          fontWeight="200"
        >
          Resource/{subjectDetails.subject}/Chapters
        </Text>
      </Box>
      <Box
        bg="#FFFFFF"
        mx="auto"
        py={{ base: "36px", sm: "64px", md: "86px" }}
        borderTopLeftRadius="64px"
        borderTopRightRadius="64px"
        w="100vw"
        minH="60vh"
        display={"flex"}
        flexDirection="column"
        gap={{ base: 4, md: 8 }}
        alignItems={"center"}
      >
        <Module
          courseModules={courseModules}
          courseDetails={courseDetails}
          background={background}
        />
      </Box>
    </BOX>
  );
}

export default LessonDetails;
