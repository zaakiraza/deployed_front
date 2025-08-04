import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  Text,
  Button,
  FormControl,
  VStack,
  Heading,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useWebUserContext } from "../../context/WebUserContext";
import { useNavigate } from "react-router-dom";
import BOX from "../../views/BOX";

function SignupOtp() {
  const [oTP, setOTP] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { signUpOtp, resendOtp} = useWebUserContext();
  const Navigate = useNavigate();
  const registeredUserEmail = localStorage.getItem("registeredUserEmail");
  const handleResendOtp = async (email) => {
    if (!email) {
      toast({
        title: "Missing Email",
        description: "Email is required to resend OTP.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setIsResending(true);
    const result = await resendOtp(email);

    toast({
      title: result.success ? "Success" : "Failed",
      description: result.message,
      status: result.success ? "success" : "error",
      duration: 4000,
      isClosable: true,
      position: "top",
    });

    if (result.success) {
      setTimer(60); // restart timer
    }
    setIsResending(false);
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const secs = (time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleChange = (value, index) => {
    if (timer === 0) return;

    if (/^\d*$/.test(value)) {
      const newOtp = [...oTP];
      newOtp[index] = value;
      setOTP(newOtp);
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (timer === 0) {
      toast({
        title: "OTP Expired",
        description: "Please request a new OTP.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const enteredOtp = oTP.join("");
    if (enteredOtp.length < 4) {
      toast({
        title: "Incomplete OTP",
        description: "Please enter all 4 digits.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setIsLoading(true);

    const result = await signUpOtp(enteredOtp);

    setIsLoading(false);

    if (!result.success) {
      toast({
        title: "Verification Failed",
        description: result.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    toast({
      title: "OTP Verified",
      description: "You are successfully registered!",
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top",
    });

    Navigate("/congratulations", {
      state: {
        message: "You are Successfully Registered!",
        route: "login",
      },
    });
  };

  return (
    <BOX>
      <Box
        p={{ base: "24px", sm: "32px", md: "36px" }}
        mt={{ base: "136px", sm: "156px", md: "194px" }}
        borderRadius="24px"
        boxShadow="2xl"
        maxW={{ base: "75%", md: "85%", lg: "100%" }}
        width="350px"
        bgGradient="linear(to-br, #FFFFFF00 0%, #FFFFFF20 100%)"
        border="1px solid #FFFFFF35"
        backdropFilter="blur(24px)"
      >
        <Heading
          w={"350px"}
          maxW={"100%"}
          color="#F49040"
          textAlign="center"
          mt={{ base: "2px", sm: "8px", md: "12px" }}
          mb={{ base: "8px", sm: "14px", md: "18px" }}
          fontSize={{ base: "24px", sm: "32px", md: "32px" }}
          fontWeight="bold"
        >
          Verification OTP
        </Heading>

        <Text
          fontWeight="light"
          color="#FFFFFF"
          w={"350px"}
          maxW={"100%"}
          textAlign="center"
          mb={{ base: "16px", sm: "24px", md: "36px" }}
          fontSize={{ base: "14px", sm: "16px", md: "18px" }}
        >
          We have sent you a verification code on{" "}
          <Text as="span" fontWeight="semibold" color="#F49040">
            {registeredUserEmail}
          </Text>
        </Text>

        <form onSubmit={handleVerify}>
          <HStack
            spacing={4}
            justify="center"
            mb={{ base: "16px", sm: "18px", md: "24px" }}
          >
            {oTP.map((digit, index) => (
              <Input
                placeholder="-"
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                textAlign="center"
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                borderRadius="12px"
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                width={{ base: "40px", sm: "48px", md: "56px" }}
                height={{ base: "40px", sm: "48px", md: "56px" }}
                bg="white"
                isDisabled={timer === 0}
              />
            ))}
          </HStack>

          <Box
            fontSize={{ base: "12px", sm: "14px", md: "16px" }}
            fontWeight="semi-bold"
            textAlign="center"
            color="white"
          >
            {timer === 0 ? (
              <Text
                color={isResending ? "#ccc" : "#F49040"}
                cursor={isResending ? "not-allowed" : "pointer"}
                onClick={() =>
                  !isResending && handleResendOtp(registeredUserEmail)
                }
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </Text>
            ) : (
              formatTime(timer)
            )}
          </Box>

          <VStack spacing={3} align="stretch">
            <FormControl isRequired></FormControl>

            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Verifying"
              spinnerPlacement="start"
              isDisabled={timer === 0}
              mb={{ base: "2px", sm: "8px", md: "12px" }}
              bg="#F49040"
              color="white"
              width="full"
              borderRadius="30px"
              h={{ base: "34px", sm: "42px", md: "48px" }}
              fontSize={{ base: "14px", sm: "16px", md: "18px" }}
              _hover={{
                border: "2px solid #F49040",
                color: "#F49040",
                bg: "none",
                boxShadow: "0px 2px 5px #F49040",
              }}
              _focus={{ outline: "none", boxShadow: "none",  }}
            >
              Verify
            </Button>
          </VStack>
        </form>
      </Box>
    </BOX>
  );
}

export default SignupOtp;
