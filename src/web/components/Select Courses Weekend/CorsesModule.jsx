import React from "react";
import {
  Text,
  Button,
  Box,
  Flex,
  VStack,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import star from "../../../assets/Star.svg";
import dollaricon from "../../../assets/Dollaricon.svg";
import clock from "../../../assets/clock.svg";
import tooltip from "../../../assets/tooltip-icon.svg";
import dot from "../../../assets/dot.svg";
import Line from "../../../assets/Line.svg";
import Line2 from "../../../assets/Lineo.svg";
import tick from "../../../assets/tick.svg";
import SampleSVG from "../sample/SampleSVG";
import { useNavigate } from "react-router-dom";
import Module from "../../views/Module";
import BOX from "../../views/BOX";

function CorsesModule() {
  const Navigate = useNavigate();
  const widthValue = useBreakpointValue({
    base: "100%",
    sm: "80%",
    md: "60%",
  });

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

  return (
    <>
      <BOX>
        <Box
          mt={{ base: "136px", sm: "156px", md: "194px" }}
          maxW={{ base: "75%", md: "85%" }}
          width="952px"
          mx={"auto"}
        >
          <VStack spacing={{ base: "18px", sm: "24px", md: "36px" }}>
            <Box
              width="95%"
              paddingY="12px"
              height="auto" // Allow height to adjust based on text
              borderRadius="24px"
              background="linear-gradient(90deg, #F4904035 0.35%, #F4904080 100%)"
              display="flex"
              justifyContent="center"
              alignItems="center"
              border="1px solid"
              borderColor="#F49040"
              boxShadow="2xl"
              backdropFilter="blur(24px)"
            >
              <Text
                fontWeight="semibold"
                fontSize={{ base: "18px", sm: "24px", md: "36px" }}
                color="white"
                fontFamily="Poppins"
                textTransform="capitalize"
                textAlign="center"
              >
                Courses Details
              </Text>
            </Box>

            <Box maxW="952px" width="90%">
              <Text
                fontFamily="Poppins"
                fontWeight="600"
                fontSize={{ base: "20px", md: "24px", lg: "32px" }}
                lineHeight="100%"
                letterSpacing="1%"
                textTransform="uppercase"
                color="#ffffff"
                mb={3}
              >
                {courseDetails.courseName}
              </Text>
              <Text
                fontFamily="Poppins"
                fontWeight="200"
                fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                lineHeight="100%"
                letterSpacing="1%"
                color="#ffffff"
              >
                {courseDetails.courseDescription}
              </Text>
            </Box>

            <Box width="90%">
              <Flex
                flexDirection={{ base: "column", sm: "row" }} // Stack vertically on small screens, horizontally on large screens
                alignItems="flex-start" // Center items on small screens, align to start on large screens
                gap={{ base: "12px", sm: "8px" }} // Equal gap between buttons in both vertical and horizontal layouts
                justifyContent="start" // Ensure buttons are centered horizontally on both layouts
              >
                <Box
                  height="40px"
                  width="auto"
                  padding={4}
                  borderRadius="8px"
                  backgroundColor="#FFFFFF"
                  display="flex"
                  alignItems="center"
                >
                  <Image
                    src={star}
                    alt="star"
                    width={{ base: "18px", sm: "20px", md: "24px" }}
                  />
                  <Text
                    ml="8px"
                    color={"#1F6A75"}
                    fontFamily="Poppins"
                    fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                  >
                    {courseDetails.courseRating}
                  </Text>
                </Box>
                <Box
                  height="40px"
                  width="auto"
                  padding={4}
                  borderRadius="8px"
                  backgroundColor="#FFFFFF"
                  display="flex"
                  alignItems="center"
                >
                  <Image
                    src={dollaricon}
                    alt="Dollar"
                    width={{ base: "18px", sm: "20px", md: "24px" }}
                  />
                  <Text
                    ml="8px"
                    color={"#1F6A75"}
                    fontFamily="Poppins"
                    fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                  >
                    {courseDetails.cost}
                  </Text>
                </Box>
                <Box
                  height="40px"
                  width="auto"
                  padding={4}
                  borderRadius="8px"
                  backgroundColor="#FFFFFF"
                  display="flex"
                  alignItems="center"
                >
                  <Image
                    src={clock}
                    alt="Calendar"
                    width={{ base: "18px", sm: "20px", md: "24px" }}
                  />
                  <Text
                    ml="8px"
                    fontFamily="Poppins"
                    fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                    color={"#1F6A75"}
                  >
                    {courseDetails.courseDate}
                  </Text>
                </Box>
              </Flex>
            </Box>

            <Box width="90%">
              <Text
                fontFamily="Poppins"
                fontSize={{ base: "20px", md: "28px" }}
                fontWeight="500"
                color="#ffffff"
                textAlign="left"
              >
                Course Content
              </Text>
            </Box>

         <Module courseModules={courseModules} courseDetails={courseDetails} background={false}/>

            {courseDetails.isEnroled ? (
              <Button
                fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                bg="#F49040"
                borderRadius="24px"
                w="95%"
                color="#FFFFFF"
                fontFamily="Poppins"
                fontWeight="400"
                px={4}
                cursor="pointer"
                transition="all 0.3s ease"
                p={{ base: "16px", sm: "18px", md: "24px" }}
                _hover={{
                  border: "2px solid #F49040",
                  color: "#F49040",
                  bg: "none",
                  boxShadow: "0px 2px 5px #F49040",
                }}
                _focus={{
                  outline: "none",
                  ring: 2,
                  ringColor: "#F49040",
                }}
              >
                Start Grand Quiz
              </Button>
            ) : (
              <Button
                fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                bg="#F49040"
                borderRadius="24px"
                w="95%"
                color="#FFFFFF"
                fontFamily="Poppins"
                fontWeight="400"
                px={4}
                cursor="pointer"
                transition="all 0.3s ease"
                p={{ base: "16px", sm: "18px", md: "24px" }}
                _hover={{
                  border: "2px solid #F49040",
                  color: "#F49040",
                  bg: "none",
                  boxShadow: "0px 2px 5px #F49040",
                }}
                _focus={{
                  outline: "none",
                  ring: 2,
                  ringColor: "#F49040",
                }}
                onClick={() => Navigate("/dashboard")}
              >
                Enrol Now
              </Button>
            )}
          </VStack>
        </Box>
      </BOX>
    </>
  );
}

export default CorsesModule;
