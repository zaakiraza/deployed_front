import React, { useState } from "react";
import { useWebUserContext } from "../../context/WebUserContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  Input,
  Button,
  Checkbox,
  FormControl,
  VStack,
  Heading,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormLabel,
} from "@chakra-ui/react";
import { GoLock, GoEye, GoEyeClosed } from "react-icons/go";
import BOX from "../../views/BOX";

const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const [showed, setShowed] = useState(false);
  const handleClick = () => setShow(!show);
  const handleClicked = () => setShowed(!showed);
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const Navigate = useNavigate();

  const { resetPassword, userEmail } = useWebUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for password mismatch
    if (updatedPassword !== password) {
      return alert("Passwords do not match.");
    }

    setIsLoading(true); // Start loading

    // Call the resetPassword function and handle the response
    const result = await resetPassword(updatedPassword, userEmail);

    setIsLoading(false); // end loading

    // Check if the password reset was successful
    if (result.success) {
      // Navigate to the congratulations page if successful
      Navigate("/congratulations", {
        state: {
          message: "Your Password Successfully Updated!",
          route: "login",
        },
      });
    } else {
      // Show an alert with the error message if the reset failed
      alert(result.message);
    }
  };
  return (
    <BOX>
      <Box
        p={{ base: "24px", sm: "32px", md: "36px" }}
        mt={{ base: "136px", sm: "156px", md: "194px" }}
        // mb={"136px"}
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
          Reset Your Password
        </Heading>
        <VStack
          spacing={{ base: "12px", sm: "16px", md: "24px" }}
          align="stretch"
          as="form"
          onSubmit={handleSubmit}
        >
          {/* set Password Input */}
          <FormControl isRequired>
            <FormLabel
              color="#FFF"
              fontSize={{ base: "12px", sm: "14px" }}
              mb={2}
              ml={3}
              fontWeight="light"
            >
              Create Password
            </FormLabel>{" "}
            {/* Label Added */}
            <InputGroup>
              <InputLeftElement
                py={{ base: "20px", sm: "24px", md: "26px" }}
                mx={{ base: "12px", sm: "16px", md: "20px" }}
              >
                <Box
                  color="#F49040"
                  fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                >
                  <GoLock />
                </Box>
              </InputLeftElement>
              <Input
                placeholder="Enter your password"
                type={show ? "text" : "password"}
                bg="white"
                py={{ base: "20px", sm: "24px", md: "26px" }}
                paddingLeft={{ base: "54px", sm: "60px", md: "68px" }}
                paddingRight={{ base: "54px", sm: "60px", md: "68px" }}
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                borderRadius="30px"
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                value={updatedPassword}
                onChange={(e) => setUpdatedPassword(e.target.value)}
              />
              <InputRightElement
                width="4.5rem"
                py={{ base: "21px", sm: "24px", md: "26px" }}
              >
                {show ? (
                  <Box
                    color="#F49040"
                    fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                  >
                    <GoEye
                      color="#F49040"
                      onClick={handleClick}
                      cursor="pointer"
                    />
                  </Box>
                ) : (
                  <Box
                    color="#F49040"
                    fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                  >
                    <GoEyeClosed
                      color="#F49040"
                      onClick={handleClick}
                      cursor="pointer"
                    />
                  </Box>
                )}
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* confirm Password Input */}
          <FormControl isRequired>
            <FormLabel
              color="#FFF"
              fontSize={{ base: "12px", sm: "14px" }}
              mb={2}
              ml={3}
              fontWeight="light"
            >
              Confirm Password
            </FormLabel>{" "}
            {/* Label Added */}
            <InputGroup>
              <InputLeftElement
                py={{ base: "20px", sm: "24px", md: "26px" }}
                mx={{ base: "12px", sm: "16px", md: "20px" }}
              >
                <Box
                  color="#F49040"
                  fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                >
                  <GoLock />
                </Box>
              </InputLeftElement>
              <Input
                placeholder="Confirm your password"
                type={showed ? "text" : "password"}
                bg="white"
                py={{ base: "20px", sm: "24px", md: "26px" }}
                paddingLeft={{ base: "54px", sm: "60px", md: "68px" }}
                paddingRight={{ base: "54px", sm: "60px", md: "68px" }}
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                borderRadius="30px"
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement
                width="4.5rem"
                py={{ base: "21px", sm: "24px", md: "26px" }}
              >
                {showed ? (
                  <Box
                    color="#F49040"
                    fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                  >
                    <GoEye
                      color="#F49040"
                      onClick={handleClicked}
                      cursor="pointer"
                    />
                  </Box>
                ) : (
                  <Box
                    color="#F49040"
                    fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                  >
                    <GoEyeClosed
                      color="#F49040"
                      onClick={handleClicked}
                      cursor="pointer"
                    />
                  </Box>
                )}
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* Remember Me & Forgot Password */}
          <Checkbox
            colorScheme="white"
            color="#FFFFFF"
            mx={3}
            size={{ base: "sm", sm: "md", md: "lg" }}
            onChange={(e) => setRememberMe(e.target.checked)}
          >
            Remember me
          </Checkbox>

          <Button
            isLoading={isLoading}
            loadingText="Updating"
            spinnerPlacement="start"
            bg="#F49040"
            color="white"
            width="full"
            borderRadius="30px"
            type="submit"
            h={{ base: "34px", sm: "42px", md: "48px" }}
            fontSize={{ base: "14px", sm: "16px", md: "18px" }}
            mb={{ base: "2px", sm: "8px", md: "12px" }}
            _hover={{
              border: "2px solid #F49040",
              color: "#F49040",
              bg: "none",
              boxShadow: "0px 2px 5px #F49040",
            }}
            onClick={() => Navigate('/forgotpassword')}
            _focus={{ outline: "none", boxShadow: "none",  }}
          >
            Change Password
          </Button>
        </VStack>
      </Box>
    </BOX>
  );
};

export default ResetPassword;
