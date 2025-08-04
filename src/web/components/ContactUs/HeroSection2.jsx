import { Box, Flex, Heading, Text, Image, Stack } from "@chakra-ui/react";
import Student from "../../../assets/Student.png";
import tablet from "../../../assets/tablet.png";
import { keyframes } from "@emotion/react";

function HeroSection2({ children }) {

  const rotate = keyframes`
  0% { transform: rotate(0deg);}
  50% { transform: rotate(30deg); }
  100% { transform: rotate(0deg) }
  `;


  return (
    <Flex
      maxW="1436px"
      width="92%"
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="center"
      paddingTop={{ base: "136px" ,sm: "164px", md: "112px" }}
      textAlign={{ base: "center", md: "left" }}
      color="white"
      mx={"auto"}
      // border={"1px solid #A2ABAA"}
    >
      {/* LEFT: Heading + Text */}
      <Stack 
      spacing={4} 
      maxW="600px" 
      width="100%"
      marginLeft={{ base: 0, md: "36px" }}
      >
        <Heading 
        fontSize={{ base: "42px", sm: "54px" , md: "64px" }}
        fontWeight="700"
        >{children}</Heading>
        <Text 
        fontSize={{ base: "16px", sm: "20px", md: "24px" }}
        fontWeight="400"
        color="">
          Welcome to Pakistan’s free edtech platform, where you can learn
          smartly at your own place.
        </Text>
      </Stack>

      {/* RIGHT: Overlapping Images */}
      <Box
      pos="relative"
      // w="full"
      w="auto"
      maxW="720px"
      mt={{ base: "18px", sm: "36px", md: 0 }}
      // border={"1px solid red"}
      >
        {/* Back Image */}
        <Image
          src={tablet}
          alt="Image 1"
          borderRadius="lg"
          pos="absolute"
          // top="20px"
          // left={{ base: 0, md: "136px" }}
          zIndex={1}
          animation={`${rotate} 8s ease-in-out infinite`}
        />
        {/* Front Image */}
        <Image
          src={Student}
          alt="Image 2"
          borderRadius="lg"
          pos="relative"
          // left={{ base: 0, md: "150px" }}
          zIndex={2}
        />
      </Box>
    </Flex>
  );
}

export default HeroSection2;
