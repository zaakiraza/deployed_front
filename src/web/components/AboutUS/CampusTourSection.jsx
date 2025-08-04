import { Box, Flex, Text, Heading, Stack, Image } from "@chakra-ui/react";
import campusTourImage from "../../../assets/campus.png";
import { BiSolidRightArrow } from "react-icons/bi";
import orange_arrow from "../../../assets/orange_arrow.svg";
import white_arrow from "../../../assets/white_arrow.svg";
import jupitor from "../../../assets/jupitor.svg";
import dotted_ellipse from "../../../assets/dotted_ellipse.png";
import { keyframes } from "@emotion/react";



export default function CampusTourSection() {

    const rotate = keyframes`
  0% { transform: rotate(0deg);}
  50% { transform: rotate(10deg); }
  100% { transform: rotate(0deg) }
  `;

  return (
    <Box 
    w={"100%"} 
    position="relative"
         overflow="hidden"
         >
      
        {/* Left SVG pointing to the right */}
          <Image
        src={dotted_ellipse}
        position="absolute"
        top={{ base: "12px", md: "24px" }}
        left={{ base: "12px", md: "36px" }}
        w={{ base: "80px", sm: "100px", md: "150px" }}
        opacity={0.7}
        zIndex={1}
        pointerEvents="none"
        alt=""
      />
          <Image
            src={jupitor}
            position="absolute"
        top={{ base: "30%", md: "38%" }}
        left={{ base: "0", md: "36px" }}
        w={{ sm: "48px", md: "64px", lg: "86px" }}
        transform="rotate(-20deg)"
        opacity={0.8}
        zIndex={1}
        pointerEvents="none"
        alt=""
        display={{ base: "none", sm: "block" }}
        animation={`${rotate} 5s ease-in-out infinite`}
          />
          <Image
        src={white_arrow}
        position="absolute"
        top={{ md: "64%", lg: "78%" }}
        left={{ md: "2%", lg: "8%" }}
        w={{ md: "75px", lg: "98px" }}
        transform="rotate(-2deg)"
        opacity={0.8}
        zIndex={1}
        pointerEvents="none"
        alt=""
        display={{ base: "none", md: "block" }}
        animation={`${rotate} 5s ease-in-out infinite`}
      />

      


        {/* Center Content */}
        <Stack
          align="center"
          spacing={{ base: "36px", sm: "42px", md: "54px", lg: "64px" }}
          flex={1}
          maxW="1200px"
          w={"92%"}
        mx="auto"
        paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
        >
          <Heading
            fontSize={{ base: "24px", sm: "28px", md: "36px", lg: "42px" }}
            color="#F49040"
            textAlign="center"
            fontWeight="700"
          >
            Watch Our Campus Tour Video
          </Heading>
          <Box
            position="relative"
            cursor="pointer"
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.02)" }}
            mx={"auto"}
          >
            <Image
              src={campusTourImage}
              alt="Campus Tour Video Thumbnail"
              borderRadius="12px"
              border={"4px solid white"}
              objectFit="cover"
              maxW="720px"
              w={{ base: "75%", md: "85%", lg: "100%" }}
              boxShadow="2xl"
              mx={"auto"}
              loading="lazy"
            />
            {/* Play button overlay */}
            <Box
              as="button"
              aria-label="Play Video"
              position="absolute"
              left="50%"
              transform="translate(-50%, -50%)"
              bg="white"
              borderRadius="full"
              p={{ base: "8px", sm: "10px", md: "12px" }}
              cursor="pointer"
              transition="all 0.3s ease"
              color={"#F49040"}
              fontSize={{ base: "14px", sm: "18px", md: "24px" }}
              _focus={{ outline: "none", boxShadow: "none",  }}
              _hover={{
                transform: "translate(-50%, -50%) scale(1.1)",
                border: "1px solid #F49040",
                shadow: "0px 0px 10px rgba(244, 144, 64, 0.5)",
              }}
              onClick={() => window.open("https://youtu.be/ax424PCC0o8?si=yKAOu-p-DXOUzHSN", "_blank")}
            >
              <BiSolidRightArrow />
            </Box>
          </Box>
        </Stack>

                {/* Right SVG pointing to the left (mirrored) */}
          <Image
        src={orange_arrow}
        position="absolute"
        top={{ md: "38%" }}
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
        <Image
        src={dotted_ellipse}
        position="absolute"
        bottom={{ base: "12px", md: "36px" }}
        right={{ base: "12px", md: "36px" }}
        w={{ base: "80px", sm: "100px", md: "120px" }}
        opacity={0.7}
        zIndex={1}
        pointerEvents="none"
        alt=""
      />

    </Box>
  );
}
