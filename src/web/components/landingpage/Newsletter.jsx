import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  Button,
  Flex,
  Image,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import CirclesImg from "../../../assets/Newsletter-Overlapping-Circles.svg";
import BulbImg from "../../../assets/Newsletter-bulb.svg";
import ArrowImg from "../../../assets/Newsletter-arrow.svg";
import { keyframes } from "@emotion/react";
import axios from "axios";


const Newsletter = () => {
  const [email, setEmail] = useState("");  
  const [message, setMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    const api = await axios.post("http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api/subscribers/subscribe", {
      email:email
    })
    setMessage(api.data.message)
  };

  const rotate = keyframes`
      0% { transform: rotate(0deg);}
      50% { transform: rotate(10deg); }
      100% { transform: rotate(0deg) }
      `;

  return (
    <Box width="full" position="relative" overflow="hidden">
      <Container maxW="1200px" w={"92%"}>
        <Box
          position="relative"
          overflow="hidden"
          borderRadius="12px"
          py={{ base: "36px", sm: "42px", md: "54px", lg: "64px" }}
          px={{ base: "18px", sm: "24px", md: "36px", lg: "42px" }}
          backgroundImage="linear-gradient(to right, #1F6A75, #093635)"
          backgroundSize="cover"
          backgroundPosition="center"
          boxShadow="2xl"
        >
          {/* Decorative Elements */}
          {/* <Box position="absolute" top="0" left="0" zIndex="0">
            <Image src={CirclesImg} alt="Decorative circles" />
          </Box> */}

          <Box
            position="absolute"
            top={{ md: "42%", lg: "36%" }}
            right={{ md: "4%", lg: "8%" }}
            transform="translateY(-50%)"
            zIndex="0"
            display={{ base: "none", md: "block" }}
            animation={`${rotate} 5s ease-in-out infinite`}
          >
            <Image src={BulbImg} alt="Light bulb" width={"64px"} />
          </Box>

          <Box
            position="absolute"
            bottom={{ md: "32%", lg: "12%" }}
            left={{ md: "4%", lg: "8%" }}
            zIndex="0"
            display={{ base: "none", md: "block" }}
            animation={`${rotate} 5s ease-in-out infinite`}
          >
            <Image src={ArrowImg} alt="Arrow" width={"86px"} />
          </Box>

          {/* Content */}
          <Flex
            direction={"column"}
            align="center"
            justify="space-between"
            textAlign="center"
            position="relative"
            zIndex="1"
          >
            <Heading
              as="h2"
              fontSize={{ base: "24px", sm: "36px", md: "48px" }}
              fontWeight="bold"
              color="#F49040"
              lineHeight="1"
              mb={{ base: "4px", sm: "8px", md: "12px" }}
            >
              Subscribe to our newsletter
            </Heading>

            <Text
              color="white"
              fontSize={{ base: "12px", sm: "16px", md: "18px" }}
              mb={{ base: "36px", sm: "48px", md: "64px" }}
            >
              Stay updated with the latest educational tools and resources
            </Text>

            <Box
              as="form"
              onSubmit={handleSubmit}
              width={{ base: "90%", md: "80%", lg: "60%" }}
            >
              <InputGroup size={{ base: "md" , md: "lg"}}>
                <Input
                  type="email"
                  placeholder="Email Address"
                  bg="white"
                  borderRadius="full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  pr="7rem"
                  fontSize={{base: "14px", sm: "16px" , md: "18px"}}
                  _focus={{ outline: "none", boxShadow: "none" }}

                  required
                />
                <InputRightElement width="6rem" mr={{base: "0px" , md: "4px"}}>
                  <Button
                    type="submit"
                    h="2.2rem"
                    size="md"
                    borderRadius="full"
                    bg="#F49040"
                    _focus={{ outline: "none", boxShadow: "none"  , bg: "#F49040"}}
                    _hover={{ shadow: "0px 0px 12px #F49040", border: "none" }}
                    color="white"
                    px={6}
                    onClick={(e)=>{handleSubmit(e)}}
                  >
                    Send
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text mt="8px" color="#FFFFFF">{message}</Text>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
