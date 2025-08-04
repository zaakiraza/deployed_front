import React, { useState, useEffect } from "react";
import { useWebUserContext } from "../context/WebUserContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Checkbox,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Divider,
  Center,
  Flex,
} from "@chakra-ui/react";
import { GoMail, GoLock, GoEye, GoEyeClosed } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import BOX from "./BOX";
import { useEnrollmentContext } from "../context/WebEnrollmentContext";

const LogIn = ({ handleRegister }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getEnrollmentsByStudentId } = useEnrollmentContext(); // ✅ Get enrollment function from context
  const Navigate = useNavigate();
  const { loginUser, userLoginToken, loginUserInfo } = useWebUserContext();

  const handleNavigate = () => {
    Navigate("/signup");
  };

  const [isLoginComplete, setIsLoginComplete] = useState(false); // Track login completion

  // useEffect(() => {
  //   console.log(isLoading, "==>isLoading");
  //   console.log(userLoginToken, "==>userLoginToken");
  //   console.log(loginUserInfo, "==>loginUserInfo");
  //   if (isLoginComplete && userLoginToken && loginUserInfo?.id) {
  //     getEnrollments();
  //     setIsLoginComplete(false); // Reset for next login
  //   }
  // }, [isLoginComplete, userLoginToken, loginUserInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userCredentials = { email, password, rememberMe };
    console.log(userCredentials, "==>userCredentials");
    try {
      const result = await loginUser(userCredentials);
      console.log(result, "==>login result");
      if (!result.success) {
        alert(result.message);
        setIsLoading(false);
        return;
      }
      const user = result.user;
      const token = result.token;
      const userId = user.id;
      localStorage.setItem("userId", userId); 

      console.log("User ID:", userId);
      console.log("Token:", token);
      
      setEmail("");
      setPassword("");
      
      const enrollmentResponse = await getEnrollmentsByStudentId(userId, token);

      if (enrollmentResponse.status === false) {
        
        Navigate("/categoryselectionpage");
      }else {
        
        Navigate("/dashboard");
      }

   



      console.log(result);
      // console.log(getEnrollmentsByStudentId(id, userToken))
      setIsLoginComplete(true); // ✅ Triggers useEffect
    } catch (err) {
      console.error("Error during login:", err);
      alert("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // const getEnrollments = async () => {
  //   const id = loginUserInfo.id;
  //   localStorage.setItem("userId", id);
  //   console.log(id, "==>userID");
  //   const response = await getEnrollmentsByStudentId(id, userLoginToken);
  //   console.log("Enrollments fetched:", response);
  //   if (response?.status === false) {
  //     Navigate("/categoryselectionpage");
  //   } else {
  //     console.log("ja raha dashboard");
  //     // Navigate("/dashboard");
  //   }
  // };

  return (
    <BOX>
      <Box
        p={{ base: "16px", sm: "20px", md: "24px" }}
        mt={{ base: "130px", sm: "150px", md: "160px" }}
        mb={{ base: "20px", sm: "20px", md: "30px" }}
        borderRadius="20px"
        boxShadow="2xl"
        maxW={{ base: "90%", md: "90%", lg: "90%" }}
        width={{ base: "320px", sm: "380px", md: "440px" }}
        bgGradient="linear(to-br, #FFFFFF00 0%, #FFFFFF20 100%)"
        border="1px solid #FFFFFF35"
        backdropFilter="blur(24px)"
        mx="auto"
      >
        <Heading
          maxW={"100%"}
          color="#F49040"
          textAlign="center"
          mt={{ base: "0px", sm: "2px", md: "4px" }}
          mb={{ base: "10px", sm: "12px", md: "16px" }}
          fontSize={{ base: "18px", sm: "20px", md: "22px" }}
          fontWeight="bold"
        >
          Login To Your Account
        </Heading>{" "}
        <VStack
          spacing={{ base: "8px", sm: "10px", md: "12px" }}
          align="stretch"
          as="form"
          onSubmit={handleSubmit}
        >
          <FormControl isRequired>
            <FormLabel
              color="#FFF"
              fontSize={{ base: "11px", sm: "12px" }}
              mb={1}
              ml={3}
              fontWeight={"light"}
            >
              Enter Email Address
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                py={{ base: "18px", sm: "20px", md: "22px" }}
                mx={{ base: "10px", sm: "12px", md: "16px" }}
              >
                <Box
                  color="#F49040"
                  fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                >
                  <GoMail />
                </Box>
              </InputLeftElement>
              <Input
                placeholder="Enter your email"
                bg="white"
                py={{ base: "18px", sm: "20px", md: "22px" }}
                paddingLeft={{ base: "48px", sm: "54px", md: "60px" }}
                fontSize={{ base: "13px", sm: "14px", md: "16px" }}
                borderRadius="30px"
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel
              color="#FFF"
              fontSize={{ base: "11px", sm: "12px" }}
              mb={1}
              ml={3}
              fontWeight={"light"}
            >
              Enter Password
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                py={{ base: "18px", sm: "20px", md: "22px" }}
                mx={{ base: "10px", sm: "12px", md: "16px" }}
              >
                <Box
                  color="#F49040"
                  fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                >
                  <GoLock />
                </Box>
              </InputLeftElement>
              <Input
                placeholder="Enter your password"
                type={show ? "text" : "password"}
                bg="white"
                py={{ base: "18px", sm: "20px", md: "22px" }}
                paddingLeft={{ base: "48px", sm: "54px", md: "60px" }}
                paddingRight={{ base: "48px", sm: "54px", md: "60px" }}
                fontSize={{ base: "13px", sm: "14px", md: "16px" }}
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                
                borderRadius="30px"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement
                width="4rem"
                py={{ base: "18px", sm: "20px", md: "22px" }}
              >
                {show ? (
                  <Box fontSize={{ base: "16px", sm: "18px", md: "20px" }}>
                    <GoEye
                      color="#F49040"
                      onClick={handleClick}
                      cursor="pointer"
                    />
                  </Box>
                ) : (
                  <Box fontSize={{ base: "16px", sm: "18px", md: "20px" }}>
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

          <Flex
            flexDirection={{ base: "column-reverse", sm: "row" }}
            alignItems={{ base: "center", sm: "center" }}
            justifyContent="space-between"
            gap={"5px"}
            mx={3}
          >
            <Checkbox
              colorScheme="orange.400"
              color="#FFFFFF"
              size={{ base: "xs", sm: "sm", md: "md" }}
              textAlign="left"
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              <Text fontSize={{ base: "10px", sm: "11px", md: "12px" }}>
                Remember me
              </Text>
            </Checkbox>
            <Text
              color="#F49040"
              cursor="pointer"
              fontSize={{ base: "11px", sm: "12px", md: "14px" }}
              onClick={() => Navigate("/forgotpasswordemail")}
            >
              Forgot Password?
            </Text>
          </Flex>

          <Button
            isLoading={isLoading}
            loadingText="Logging in"
            spinnerPlacement="start"
            bg="#F49040"
            color="white"
            width="full"
            borderRadius="30px"
            type="submit"
            h={{base: "32px" ,sm: "36px",md:"42px"}}
            fontSize={{base: "13px" ,sm: "14px",md:"16px"}}
            _focus={{ outline: "none", boxShadow: "none",  }}

            _hover={{
              border: "2px solid #F49040",
              color: "#F49040",
              bg: "none",
              boxShadow: "0px 2px 5px #F49040",
            }}
          >
            Log In
          </Button>

          <Text
            color="#FFFFFF"
            textAlign="center"
            fontSize={{ base: "10px", sm: "11px", md: "12px" }}
            fontWeight={"light"}
          >
            Don't have an account?{" "}
            <Text
              as="span"
              color="#F49040"
              onClick={handleNavigate}
              cursor="pointer"
              fontSize={{ base: "11px", sm: "12px", md: "14px" }}
              fontWeight={"semibold"}
              ml={"2px"}
            >
              Register
            </Text>
          </Text>
        </VStack>
        <Center my={3}>
          <Divider
            borderColor="white"
            width={{ base: "78px", sm: "112px", md: "142px" }}
          />
          <Text
            color="white"
            mx={{ base: "12px", sm: "14px", md: "16px" }}
            fontSize={{ base: "12px", sm: "14px", md: "16px" }}
            fontWeight={"semibold"}
          >
            OR
          </Text>
          <Divider
            borderColor="white"
            width={{ base: "78px", sm: "112px", md: "142px" }}
          />
        </Center>
        <Box
          maxW={{ base: "95%", md: "580px" }}
          width="full"
          display={"flex"}
          justifyContent={"center"}
        >
          <Button
            variant="outline"
            p={{ base: "12px", sm: "14px", md: "18px" }}
            maxW={"220px"}
            maxH={"42px"}
            width="100%"
            bgColor={"white"}
            borderRadius={"10px"}
            mx={"auto"}
            mb={"10px"}
            fontSize={{base: "11px" ,sm: "13px",md:"14px"}}
            _focus={{ outline: "none", boxShadow: "none", bg: "white" }}
            _hover={{ border: "none" }}
          >
            <Box
              as={FcGoogle}
              boxSize={{ base: "20px", sm: "24px", md: "28px" }}
              mr={{ base: "5px", sm: "6px" }}
              fontSize={"12px"}
            />
            Continue with Google
          </Button>
        </Box>
      </Box>
    </BOX>
  );
};

export default LogIn;
