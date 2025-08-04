import React, { useEffect, useState } from "react";
import { Text, Button, Box, Grid, Flex, VStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useWeekendCoursesContext } from "../../context/WeekendCoursesContext";
import BOX from "../../views/BOX";

function SelectCourses() {
  const [weekEndClasses, setWeekEndClasses] = useState(true);
  const handleSubject = () => {
    setWeekEndClasses(!weekEndClasses);
  };
  const coursesArray = [
    {
      id: "1",
      courseTilte: "Web Dev React Js",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/005/283/061/small/web-development-concept-in-3d-isometric-design-designer-works-with-code-interface-engineering-programming-settings-and-optimizes-pages-template-with-people-scene-illustration-for-webpage-vector.jpg",
      Teacher: "by Muhammad Faaiz",
    },
    {
      id: "2",
      courseTilte: "Ui/Ux",
      image:
        "https://img.freepik.com/free-vector/gradient-style-ui-ux-background_52683-69621.jpg",
      Teacher: "by Muhammad Faaiz",
    },
    {
      id: "3",
      courseTilte: "Graphics Designing",
      image:
        "https://simzon.com.pk/wp-content/uploads/2024/12/logo-design-in-chennai-1000x1000-1.webp",
      Teacher: "by Muhammad Faaiz",
    },
    {
      id: "4",
      courseTilte: "Spoken English",
      image:
        "https://www.shutterstock.com/image-photo/smart-girl-asking-do-you-260nw-1537379792.jpg",
      Teacher: "by Muhammad Faaiz",
    },
    {
      id: "5",
      courseTilte: "Video Editing",
      image:
        "https://media.licdn.com/dms/image/v2/D4D22AQGofym73HOTcg/feedshare-shrink_800/feedshare-shrink_800/0/1699428209335?e=2147483647&v=beta&t=NJD-S2SQCM26wVk-3BVy0JLk0RYGfPhgc9aIpPQlwh8",
      Teacher: "by Hussain Ali",
    },
  ];

  const { weekendCoursesRoute, setWeekendCoursesRoute } =
    useWeekendCoursesContext();

  const Navigate = useNavigate();
  const handleClick = (coursetitle) => {
    const route = coursetitle.toLowerCase().replace(/\s+/g, ""); // Removes all spaces
    setWeekendCoursesRoute(route);
    Navigate(`/path/${route}`);
  };

  useEffect(() => {}, [weekendCoursesRoute]);

  return (
    <BOX>
      <Box
        mt={{ base: "136px", sm: "156px", md: "194px" }}
        maxW={{ base: "75%", md: "85%" }}
        width="952px"
        mx={"auto"}
        fontFamily="Poppins"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
      >
        {/* <Box
        width="100%"
        padding="5px"
        borderRadius="24px"
        background="linear-gradient(280.65deg, rgba(244, 144, 64, 0.8) 0.35%, rgba(244, 144, 64, 0.35) 100%)"
        mb="20px"
        textAlign="center"
        margin="auto"
      > */}

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
              {weekEndClasses ? "Select Courses" : "Subjects"}
            </Text>
          </Box>

          {/* <Text
          fontWeight="600"
          fontSize="35px"
          color="#ffffff"
          onClick={handleSubject}
        >
          {weekEndClasses? "Select Courses": "Subjects"}
        </Text> */}
          {/* </Box> */}

          {/* Courses Grid Section */}
          <Flex
            gap={{ base: "18px", sm: "24px", md: "36px" }}
            flexDirection={{ base: "column", sm: "row" }}
            flexWrap="wrap"
            maxW="952px"
            width="90%"
            justify="center"
            align="center"
          >
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Two columns on medium and larger screens
              gap={{ base: "18px", sm: "24px", md: "36px" }}
            >
              {coursesArray.map((course) => (
                <Box
                  key={course.id}
                  textAlign="center"
                  margin="auto" // Center the card
                  display="flex"
                  bgGradient="linear(to-br, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.2) 100%)"
                  flexDirection="column"
                  alignItems="center"
                  p={{ base: "24px", sm: "36px", md: "48px" }}
                  borderRadius={"24px"}
                  border="1px solid"
                  borderColor="#FFFFFF35"
                  boxShadow="lg"
                  backdropFilter="blur(60px)"
                  boxSize={"100%"} // Responsive box size
                  // maxWidth={{ base: "full", sm: "320px", md: "400px" }}
                  w={"full"}
                  // width={{ base: "100%", md: "45%" }}
                >
                  <Text
                    lineHeight="24px"
                    letterSpacing="1%"
                    mb={{ base: "16px", sm: "18px", md: "24px" }}
                    fontSize={{ base: "20px", sm: "24px", md: "28px" }}
                    fontFamily="Poppins"
                    fontWeight="semibold"
                    color="#F49040"
                    textTransform="uppercase"
                  >
                    {course.courseTilte}
                  </Text>
                  <Image
                    src={course.image}
                    alt={course.courseTilte}
                    objectFit="contain"
                    mb={{ base: "16px", sm: "18px", md: "24px" }}
                    boxSize="180px"
                    width="220px"
                    // border={"1px solid #F49040"}
                    // maxSm={{ width: "full", height: "auto" }}
                  />
                  <Text
                    mb={{ base: "16px", sm: "18px", md: "24px" }}
                    fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                    fontFamily="Poppins"
                    fontWeight="light"
                    lineHeight="100%"
                    letterSpacing="1%"
                    color="#ffffff"
                  >
                    {course.Teacher}
                  </Text>
                  <Button
                    px={4}
                    py={3}
                    fontWeight="light"
                    cursor="pointer"
                    transition="all 0.3s ease"
                    width={{ base: "136px", sm: "220px", md: "186px" }}
                    // maxSm={{ width: "full" }}
                    bg="#F49040"
                    color="white"
                    borderRadius="30px"
                    h={{ base: "32px", sm: "38px", md: "42px" }}
                    fontSize={{ base: "12px", sm: "14px", md: "16px" }}
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
                    onClick={() => handleClick(course.courseTilte)}
                  >
                    Continue
                  </Button>
                </Box>
              ))}
            </Grid>
          </Flex>
        </VStack>
      </Box>
    </BOX>
  );
}

export default SelectCourses;
