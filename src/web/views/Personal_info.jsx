import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { GoPerson } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import BOX from "./BOX";

// This component wraps the PersonalInfo component with a green background container
const PersonalInfoPage = () => {
  return (
    <Box
      bg="transparent"
      minHeight="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <PersonalInfo
        onContinue={(data) => console.log("Form submitted:", data)}
      />
    </Box>
  );
};

const PersonalInfo = ({ onContinue }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("Male");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const personalData = {
      firstName,
      lastName,
      dateOfBirth: `${day}/${month}/${year}`,
      gender,
    };

    console.log("Personal data submitted:", personalData);

    // Navigate to the next page or perform any action with the personal data
    navigate("/categoryselectionpage");
    if (onContinue) {
      onContinue(personalData);
    }
  };

  return (
    <BOX>
      <Box
        p={{ base: "24px", sm: "32px", md: "36px" }}
        mt={{ base: "136px", sm: "156px", md: "194px" }}
        borderRadius="24px"
        boxShadow="2xl"
        maxW={{ base: "75%", md: "85%", lg: "100%" }}
        width="580px"
        bgGradient="linear(to-br, #FFFFFF00 0%, #FFFFFF20 100%)"
        border="1px solid #FFFFFF35"
        backdropFilter="blur(24px)"
      >
        <Heading
          w={"500px"}
          maxW={"100%"}
          color="#F49040"
          textAlign="center"
          mt={{ base: "2px", sm: "8px", md: "12px" }}
          mb={{ base: "16px", sm: "24px", md: "36px" }}
          fontSize={{ base: "24px", sm: "32px", md: "32px" }}
          fontWeight="bold"
        >
          Personal Info
        </Heading>

        <VStack
          spacing={{ base: "12px", sm: "16px", md: "24px" }}
          align="stretch"
          as="form"
          onSubmit={handleSubmit}
        >
          <FormControl>
            <FormLabel
              color="#FFF"
              fontSize={{ base: "12px", sm: "14px" }}
              mb={2}
              ml={3}
              fontWeight="light"
            >
              First Name
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                py={{ base: "20px", sm: "24px", md: "26px" }}
                mx={{ base: "12px", sm: "16px", md: "20px" }}
              >
                <Box
                  color="#F49040"
                  fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                >
                  <GoPerson />
                </Box>
              </InputLeftElement>
              <Input
                py={{ base: "20px", sm: "24px", md: "26px" }}
                paddingLeft={{ base: "54px", sm: "60px", md: "68px" }}
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                placeholder="Enter First Name"
                bg="white"
                borderRadius="30px"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                _hover={{
                  borderColor: "#F49040",
                }}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel
              color="#FFF"
              fontSize={{ base: "12px", sm: "14px" }}
              mb={2}
              ml={3}
              fontWeight="light"
            >
              Last Name (Optional)
            </FormLabel>

            <InputGroup>
              <InputLeftElement
                py={{ base: "20px", sm: "24px", md: "26px" }}
                mx={{ base: "12px", sm: "16px", md: "20px" }}
              >
                <Box
                  color="#F49040"
                  fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                >
                  <GoPerson />
                </Box>
              </InputLeftElement>
              <Input
                placeholder="Enter Last Name "
                py={{ base: "20px", sm: "24px", md: "26px" }}
                paddingLeft={{ base: "54px", sm: "60px", md: "68px" }}
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                bg="white"
                borderRadius="30px"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                _hover={{
                  borderColor: "#F49040",
                }}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel
              color="#FFF"
              fontSize={{ base: "12px", sm: "14px" }}
              mb={2}
              ml={3}
              fontWeight="light"
            >
              Date Of Birth
            </FormLabel>
            <HStack spacing={2}>
              <Input
                placeholder="DD"
                py={{ base: "20px", sm: "24px", md: "26px" }}
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                borderRadius="30px"
                bg="white"
                width="full"
                textAlign="center"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                _hover={{
                  borderColor: "#F49040",
                }}
              />
              <Input
                placeholder="MM"
                py={{ base: "20px", sm: "24px", md: "26px" }}
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                borderRadius="30px"
                bg="white"
                width="full"
                textAlign="center"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                _hover={{
                  borderColor: "#F49040",
                }}
              />
              <Input
                placeholder="YYYY"
                py={{ base: "20px", sm: "24px", md: "26px" }}
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                borderRadius="30px"
                bg="white"
                width="full"
                textAlign="center"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                _hover={{
                  borderColor: "#F49040",
                }}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel
              color="#FFF"
              fontSize={{ base: "12px", sm: "14px" }}
              mb={2}
              ml={3}
              fontWeight="light"
            >
              Gender
            </FormLabel>

            <RadioGroup onChange={setGender} value={gender}>
              <Flex
                direction="row"
                ml={{ base: "10px", sm: "12px", md: "12px" }}
              >
                <Radio
                  value="Male"
                  size={{ base: "sm", sm: "md", md: "lg" }}
                  colorScheme="white"
                  mr={4}
                >
                  <Text color="white">Male</Text>
                </Radio>
                <Radio
                  value="Female"
                  size={{ base: "sm", sm: "md", md: "lg" }}
                  colorScheme="white"
                >
                  <Text color="white">Female</Text>
                </Radio>
              </Flex>
            </RadioGroup>
          </FormControl>
          
          <Flex gap={{ base: "8px", sm: "12px", md: "16px" }} 
          // direction={{ base: "column", sm: "row" }}
          mb={3}>
          <Button
            bg="none"
            color="white"
            border= "2px solid #FFFFFF"
            width="full"
            borderRadius="30px"
            type="submit"
            // mt={4}
            h={{ base: "34px", sm: "42px", md: "48px" }}
            fontSize={{ base: "14px", sm: "16px", md: "18px" }}
            _hover={{
              border: "none",
              color: "#0D0D0D",
              bg: "#FFFFFF",
              // boxShadow: "0px 2px 5px #F49040",
            }}
             _focus={{ outline: "none", boxShadow: "none",}}
          >
            Skip
          </Button> 
          
           <Button
            bg="#F49040"
            color="white"
            width="full"
            borderRadius="30px"
            type="submit"
            // mt={4}
            h={{ base: "34px", sm: "42px", md: "48px" }}
            fontSize={{ base: "14px", sm: "16px", md: "18px" }}
            _hover={{
              border: "2px solid #F49040",
              color: "#F49040",
              bg: "none",
              boxShadow: "0px 2px 5px #F49040",
            }}
                _focus={{ outline: "none", boxShadow: "none", }}
          >
            Continue
          </Button>
          </Flex>

        </VStack>
      </Box>
    </BOX>
  );
};

export default PersonalInfoPage;
