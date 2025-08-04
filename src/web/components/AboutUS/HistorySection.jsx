import { Box, Text, Heading, Flex, Image } from "@chakra-ui/react";
import history1 from "../../../assets/history1.png";
import history2 from "../../../assets/history2.png";
import history3 from "../../../assets/history3.png";

import { keyframes } from "@emotion/react";

export default function HistorySection() {
  const float = keyframes`
  0% { transform: translateY(0px); translateX(15px);}
  50% { transform: translateY(-15px); translateX(0px); }
  100% { transform: translateY(0px); translateX(15px); }
  `;

  const float2 = keyframes`
  0% { transform: translateY(-15px); transform: translateX(0px); }
  50% { transform: translateY(0px); transform: translateX(15px); }
  100% { transform: translateY(-15px); transform: translateX(0px); }
  `;

  return (
    <Box width="100%" bg="white">
      <Box
        maxW="1436px"
        width="92%"
        direction={"column"}
        align="center"
        justify="center"
        paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
        textAlign={{ base: "center", md: "left" }}
        mx={"auto"}
      >
        <Heading
          fontSize={{ base: "24px", sm: "28px", md: "36px" }}
          color="#1F6A75"
          mb={{ base: "42px", sm: "54px", md: "64px", lg: "86px" }}
          marginLeft={{ base: 0, md: "36px" }}
          fontWeight="700"
        >
          About Us
        </Heading>

        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          marginLeft={{ base: 0, md: "36px" }}
        >
          {/* Text Section */}
          <Box flex="1">
            <Heading
              fontSize={{ base: "28px", sm: "36px", md: "42px" }}
              color="#F49040"
              fontWeight="700"
              mb={{ base: "14px", sm: "18px", md: "24px", lg: "28px" }}
            >
              Humble Beginnings
            </Heading>

            <Text
              fontSize={{ base: "16px", sm: "18px", md: "20px" }}
              fontWeight={"400"}
              color="#0D0D0D"
            >
              When OTS started its journey in 2011, we lacked resources, staff,
              and everything a professional organization might need, but what
              made us a successful institute was our passion and commitment to
              our cause. Our volunteers kept teaching students with whatever was
              available to us and never compromised on quality. The only thing
              that kept us going was one goal: to make a difference, to let
              everyone have access to quality education.
            </Text>
          </Box>

          {/* Image Stack Section */}
          <Box
            flex="1"
            display={"block"}
            maxWidth={"600px"}
            w={"100%"}
            alignContent={"center"}
            position="relative"
            minH={{ base: "300px", sm: "400px", md: "300px" }}
            h={"fit-content"}
            mx={{ base: "8px", sm: "16px", md: "36px" }}
            
          >
            <Image
              src={history1}
              position="absolute"
              zIndex={1}
              top={{ base: "20px", sm: "12px", md: "-40px", lg: "-80px" }}
              left={{ base: "30px", sm: "40px", md: "0px", lg: "30px" }}
              objectFit="cover"
              borderRadius="12px"
              maxHeight="200px"
              h={{ base: "136px", sm: "186px", md: "164px", lg: "200px" }}
              animation={`${float} 5s ease-in-out infinite`}
              boxShadow="2xl"
            />
            <Image
              src={history2}
              position="absolute"
              zIndex={2}
              top={{ base: "60px", sm: "80px", md: "40px", lg: "50px" }}
              left={{ base: "120px", sm: "180px", md: "110px", lg: "160px" }}
              objectFit="cover"
              borderRadius="12px"
              maxHeight="200px"
              h={{ base: "136px", sm: "186px", md: "164px", lg: "200px" }}
              animation={`${float2} 5s ease-in-out infinite`}
              boxShadow="2xl"
            />
            <Image
              src={history3}
              position="absolute"
              zIndex={3}
              top={{ base: "160px", sm: "200px", md: "150px", lg: "180px" }}
              left={{ base: "50px", sm: "120px", md: "20px", lg: "70px" }}
              objectFit="cover"
              borderRadius="12px"
              maxHeight="200px"
              h={{ base: "136px", sm: "186px", md: "164px", lg: "200px" }}
              animation={`${float} 5s ease-in-out infinite`}
              boxShadow="2xl"
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
