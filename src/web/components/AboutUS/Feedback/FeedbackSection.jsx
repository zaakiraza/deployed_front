import { Box, Flex, Text, Heading, SimpleGrid, Image } from "@chakra-ui/react";
import { useState } from "react";
import feedback1 from "../../../../assets/feedback1.png";
import feedback2 from "../../../../assets/feedback2.png";
import feedback3 from "../../../../assets/feedback3.png";
import Feedback from "./Feedback";
import StartSection from "../StartSection";
import LetsStartWithOTS from "../../landingpage/Let's-Start-With-OTS";
import green_arrow from "../../../../assets/green_arrow.svg"
import jupitor_sharp from "../../../../assets/jupitor_sharp.svg";
import { keyframes } from "@emotion/react";

export default function FeedbackSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const feedbackData = [
    {
      comment:
        "I must explain to you how all this mistaken . Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
      img: feedback1,
      name: "Roe Smith",
      title: "Designer",
    },
    {
      comment:
        "I must explain to you how all this mistaken . Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
      img: feedback2,
      name: "Joe Biden",
      title: "UI/UX Student",
    },
    {
      comment:
        "I must explain to you how all this mistaken . Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
      img: feedback3,
      name: "Alis Jordan",
      title: "Marketing Student",
    },
    {
      comment:
        "I must explain to you how all this mistaken . Tdea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
      img: feedback2,
      name: "Ali Faraz",
      title: "Urdu Student",
    },
  ];

  const feedbackCards = feedbackData.map((feedback, i) => {
    return (
      <Feedback
        key={i}
        comment={feedback.comment}
        img={feedback.img}
        name={feedback.name}
        title={feedback.title}
      />
    );
  });

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const rotate = keyframes`
    0% { transform: rotate(0deg);}
    50% { transform: rotate(10deg); }
    100% { transform: rotate(0deg) }
    `;

    const rotate2 = keyframes`
    0% { transform: rotate(120deg);}
    50% { transform: rotate(90deg); }
    100% { transform: rotate(120deg) }
    `;


  return (
    <Box
      w={"100%"}
      bg="white"
      paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
      position="relative"
      overflow="hidden"
    >
      <Image
        src={green_arrow}
        position="absolute"
        top={{ base: "30%", md: "8%" ,lg: "12%" }}
        left={{ base: "0", md: "5%" , lg: "10%"}}
        w={{ sm: "48px", md: "64px", lg: "86px" }}
        transform="rotate(120deg)"
        opacity={0.8}
        zIndex={1}
        pointerEvents="none"
        alt=""
        display={{ base: "none", md: "block" }}
        animation={`${rotate2} 5s ease-in-out infinite`}
      />

      <Box maxW="1436px" w={"85%"} mx={"auto"}>
        <Box textAlign="center">
          <Heading
            color="#1F6A75"
            fontSize={{ base: "28px", sm: "36px", lg: "42px" }}
            fontWeight="700"
            mb={{ base: "8px", sm: "12px", md: "18px", lg: "24px" }}
          >
            {`Student's Feedback`}
          </Heading>
          <Text
            color="#A2ABAA"
            fontSize={{ base: "16px", sm: "18px", lg: "20px" }}
            fontWeight={"400"}
          >
            Lorem Ipsum is simply dummy text of the printing.
          </Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          gap={{ base: "12px", md: "12px", lg: "16px" }}
          mt={{ base: "42px", sm: "54px", md: "64px", lg: "86px" }}
          mb={{ base: "24px", sm: "36px", md: "42px", lg: "56px" }}
        >
          {feedbackCards}
        </SimpleGrid>

        <Image
                src={jupitor_sharp}
                position="absolute"
                top={{ md: "12%" }}
                right={{  md: "3%", lg: "8%" }}
                w={{ base: "36px", sm: "48px", md: "64px" }}
                transform="rotate(20deg)"
                opacity={0.8}
                zIndex={1}
                pointerEvents="none"
                alt=""
                display={{ base: "none", md: "block" }}
                animation={`${rotate} 5s ease-in-out infinite`}
              />

        {/* Sliding Dots */}
        <Flex
          justify="center"
          align="center"
          gap={{ base: "4px", sm: "6px", md: "8px" }}
        >
          {feedbackData.map((_, index) => {
            const isActive = activeIndex === index;
            const width = isActive
              ? { base: "18px", sm: "24px", md: "30px" }
              : { base: "6px", sm: "8px", md: "10px" };
            return (
              <Box
                key={index}
                w={width}
                h={{ base: "6px", sm: "8px", md: "10px" }}
                bg={isActive ? "#F49040" : "#CED4D3"}
                borderRadius="full"
                cursor="pointer"
                transition="all 0.3s ease"
                onClick={() => handleDotClick(index)}
                _hover={{
                  bg: isActive ? "#F49040" : "#CED4D3",
                }}
              />
            );
          })}
        </Flex>

        {/* <StartSection/> */}
        <LetsStartWithOTS />
      </Box>
    </Box>
  );
}
