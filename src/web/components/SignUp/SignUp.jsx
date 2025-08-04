import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebUserContext } from "../../context/WebUserContext";
import {
  Box,
  Input,
  Button,
  FormControl,
  VStack,
  Heading,
  Checkbox,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormLabel,
  AbsoluteCenter,
  Divider,
  Center,
  useToast,
} from "@chakra-ui/react";
import { GoMail, GoLock, GoEye, GoEyeClosed, GoPerson } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { SlPhone } from "react-icons/sl";
import BOX from "../../views/BOX";
const SignUp = () => {
  const [show, setShow] = useState(false);
  const [showed, setShowed] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { registerUser, newUser } = useWebUserContext();
  const Navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => setShow(!show);
  const handleClicked = () => setShowed(!showed);
  const handleNavigate = () => Navigate("/login");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast({
        title: "Password mismatch",
        status: "error",
        position: "top",
        duration: 1000,
        isClosable: true,
        render: () => (
          <Box
            bg="#F49040"
            color="white"
            px={6}
            py={3}
            borderRadius="md"
            textAlign="center"
            fontWeight="medium"
          >
            Password Mismatch
          </Box>
        ),
      });
    }

    const registerNewUser = {
      email,
      password,
      rememberMe,
      roleName: "Student",
    };
    //  const registerNewUser = { email, password, rememberMe };

    localStorage.setItem("registeredUserEmail", email);

    setIsLoading(true);

    try {
      const result = await registerUser(registerNewUser);
      // console.log("Registration result:", result);
      if (!result.success) {
        toast({
          title: result.message || "Registration failed.",
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
          render: () => (
            <Box
              bg="#F49040"
              color="white"
              px={6}
              py={3}
              borderRadius="md"
              textAlign="center"
              fontWeight="medium"
            >
              {result.message || "Registration failed."}
            </Box>
          ),
        });
        return;
      }

      toast({
        title: "Account created successfully!",
        description: "Please verify your email with the OTP sent.",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
        render: () => (
          <Box
            bg="#F49040"
            color="white"
            px={6}
            py={3}
            borderRadius="md"
            textAlign="center"
            fontWeight="medium"
          >
            <Text>Account created successfully!</Text>
            <Text>Please verify your email with the OTP sent</Text>
          </Box>
        ),
      });

      setUsername("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      Navigate("/signupotp");
    } catch (err) {
      console.error("Error during signup:", err);
      toast({
        title: "Something went wrong.",
        description: "Please try again later.",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
        render: () => (
          <Box
            bg="#F49040"
            color="white"
            px={6}
            py={3}
            borderRadius="md"
            textAlign="center"
            fontWeight="medium"
          >
            <Text>Something went wrong</Text>
            <Text>Please try again later</Text>
          </Box>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BOX>
      <Box
        p={{ base: "14px", sm: "16px", md: "20px" }}
        mt={{ base: "130px", sm: "150px", md: "160px" }}
        mb={{ base: "15px", sm: "15px", md: "20px" }}
        borderRadius="16px"
        boxShadow="xl"
        maxW={{ base: "85%", md: "85%", lg: "85%" }}
        width={{ base: "300px", sm: "360px", md: "400px" }}
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
          mb={{ base: "8px", sm: "10px", md: "16px" }}
          fontSize={{ base: "18px", sm: "20px", md: "22px" }}
          fontWeight="bold"
        >
          Create Your Account
        </Heading>

        <VStack
          spacing={{ base: "6px", sm: "8px", md: "10px" }}
          align="stretch"
          as="form"
          onSubmit={handleSubmit}
        >
          <FormControl isRequired>
            <FormLabel
              color="#FFF"
              fontSize={{ base: "10px", sm: "11px" }}
              mb={1}
              ml={2}
              fontWeight="light"
            >
              Email
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                py={{ base: "16px", sm: "18px", md: "20px" }}
                mx={{ base: "8px", sm: "10px", md: "12px" }}
              >
                <Box
                  color="#F49040"
                  fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                >
                  <GoMail />
                </Box>
              </InputLeftElement>
              <Input
                placeholder="Enter your email"
                bg="white"
                py={{ base: "16px", sm: "18px", md: "20px" }}
                paddingLeft={{ base: "44px", sm: "50px", md: "54px" }}
                fontSize={{ base: "12px", sm: "13px", md: "14px" }}
                borderRadius="25px"
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          {/* <FormControl isRequired>
            <FormLabel
              color="#FFF"
              fontSize={{base:"12px",sm:"14px"}}
              mb={2}
              ml={3}
              fontWeight="light"
            >
              Contact Number
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
                  <SlPhone />
                </Box>
              </InputLeftElement>
              <Input
                placeholder="Enter your contact"
                bg="white"
                py={{ base: "20px", sm: "24px", md: "26px" }}
                paddingLeft={{ base: "54px", sm: "60px", md: "68px" }}
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                borderRadius="30px"
                border="1px solid #F49040"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel
              color="#FFF"
              fontSize={{base:"12px",sm:"14px"}}
              mb={2}
              ml={3}
              fontWeight="light"
            >
              User Name
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
                placeholder="Enter your name"
                bg="white"
                py={{ base: "20px", sm: "24px", md: "26px" }}
                paddingLeft={{ base: "54px", sm: "60px", md: "68px" }}
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                borderRadius="30px"
                border="1px solid #F49040"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
          </FormControl> */}

          <FormControl isRequired>
            <FormLabel
              color="#FFF"
              fontSize={{ base: "10px", sm: "11px" }}
              mb={1}
              ml={2}
              fontWeight="light"
            >
              Create Password
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                height="100%"
                display="flex"
                alignItems="center"
                paddingLeft={{ base: "12px", sm: "15px", md: "18px" }}
              >
                <Box
                  color="#F49040"
                  fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                >
                  <GoLock />
                </Box>
              </InputLeftElement>
              <Input
                placeholder="Enter your password"
                type={show ? "text" : "password"}
                bg="white"
                py={{ base: "16px", sm: "18px", md: "20px" }}
                paddingLeft={{ base: "44px", sm: "50px", md: "54px" }}
                paddingRight={{ base: "44px", sm: "50px", md: "54px" }}
                fontSize={{ base: "12px", sm: "13px", md: "14px" }}
                borderRadius="25px"
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement
                width="3.5rem"
                py={{ base: "16px", sm: "18px", md: "20px" }}
              >
                {show ? (
                  <Box fontSize={{ base: "14px", sm: "16px", md: "18px" }}>
                    <GoEye
                      color="#F49040"
                      onClick={handleClick}
                      cursor="pointer"
                    />
                  </Box>
                ) : (
                  <Box fontSize={{ base: "14px", sm: "16px", md: "18px" }}>
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

          <FormControl isRequired>
            <FormLabel
              color="#FFF"
              fontSize={{ base: "10px", sm: "11px" }}
              mb={1}
              ml={2}
              fontWeight="light"
            >
              Confirm Password
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                height="100%"
                display="flex"
                alignItems="center"
                paddingLeft={{ base: "12px", sm: "15px", md: "18px" }}
              >
                <Box
                  color="#F49040"
                  fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                >
                  <GoLock />
                </Box>
              </InputLeftElement>
              <Input
                placeholder="Confirm your password"
                type={showed ? "text" : "password"}
                bg="white"
                py={{ base: "16px", sm: "18px", md: "20px" }}
                paddingLeft={{ base: "44px", sm: "50px", md: "54px" }}
                paddingRight={{ base: "44px", sm: "50px", md: "54px" }}
                fontSize={{ base: "12px", sm: "13px", md: "14px" }}
                borderRadius="25px"
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement
                width="3.5rem"
                py={{ base: "16px", sm: "18px", md: "20px" }}
              >
                {showed ? (
                  <Box
                    color="#F49040"
                    fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                  >
                    <GoEye
                      color="#F49040"
                      onClick={handleClicked}
                      cursor="pointer"
                    />{" "}
                  </Box>
                ) : (
                  <Box fontSize={{ base: "14px", sm: "16px", md: "18px" }}>
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

          <Checkbox
            colorScheme="white"
            color="#FFFFFF"
            mx={2}
            size={{ base: "xs", sm: "sm", md: "md" }}
            onChange={(e) => setRememberMe(e.target.checked)}
          >
            <Text fontSize={{ base: "10px", sm: "11px", md: "12px" }}>
              Remember me
            </Text>
          </Checkbox>

          <Button
            isLoading={isLoading}
            loadingText="Registering"
            spinnerPlacement="start"
            bg="#F49040"
            color="white"
            width="full"
            borderRadius="25px"
            type="submit"
            h={{ base: "30px", sm: "34px", md: "38px" }}
            fontSize={{ base: "12px", sm: "13px", md: "14px" }}
            _hover={{
              border: "2px solid #F49040",
              color: "#F49040",
              bg: "none",
              boxShadow: "0px 2px 5px #F49040",
            }}
            _focus={{ outline: "none", boxShadow: "none",  }}
          >
            Register
          </Button>

          <Text
            color="#FFFFFF"
            textAlign="center"
            fontSize={{ base: "10px", sm: "11px", md: "12px" }}
            fontWeight={"light"}
          >
            Already have an account?{" "}
            <Text
              as="span"
              color="#F49040"
              onClick={handleNavigate}
              cursor="pointer"
              fontSize={{ base: "11px", sm: "12px", md: "13px" }}
              fontWeight={"semibold"}
              ml={"2px"}
            >
              Login
            </Text>
          </Text>
        </VStack>

        <Center my={2}>
          <Divider
            borderColor="white"
            width={{ base: "60px", sm: "80px", md: "100px" }}
          />
          <Text
            color="white"
            mx={{ base: "8px", sm: "10px", md: "12px" }}
            fontSize={{ base: "10px", sm: "11px", md: "12px" }}
            fontWeight={"semibold"}
          >
            OR
          </Text>
          <Divider
            borderColor="white"
            width={{ base: "60px", sm: "80px", md: "100px" }}
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
            p={{ base: "12px", sm: "14px", md: "16px" }}
            maxW={"200px"}
            maxH={"40px"}
            width="100%"
            bgColor={"white"}
            borderRadius={"10px"}
            mx={"auto"}
            mb={"8px"}
            fontSize={{base: "10px" ,sm: "12px",md:"13px"}}
            _focus={{ outline: "none", boxShadow: "none", bg: "white" }}
            _hover={{ border: "none" }}
          >
            <Box
              as={FcGoogle}
              boxSize={{ base: "18px", sm: "20px", md: "22px" }}
              mr={{ base: "4px", sm: "6px" }}
              fontSize={"12px"}
            />
            Continue with Google
          </Button>
        </Box>
      </Box>
    </BOX>
  );
};

export default SignUp;
