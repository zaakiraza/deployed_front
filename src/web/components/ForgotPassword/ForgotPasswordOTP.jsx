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

function ForgotPasswordOTP() {
  const { verifyOtp, userEmail, resendOtp } = useWebUserContext();
  const [oTP, setOTP] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Timer effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

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
    setTimer(60); // Reset timer immediately for better UX
    
    try {
      const result = await resendOtp(email);
      toast({
        title: result.success ? "Success" : "Failed",
        description: result.message,
        status: result.success ? "success" : "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      
      // Clear OTP fields on resend
      if (result.success) {
        setOTP(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleChange = (value, index) => {
    if (timer === 0) return;

    if (/^\d*$/.test(value)) {
      const newOtp = [...oTP];
      newOtp[index] = value;
      setOTP(newOtp);
      
      // Auto-focus next input
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
        description: "OTP has expired. Please request a new one.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const enteredOtp = oTP.join("");
    if (enteredOtp.length !== 4) {
      toast({
        title: "Incomplete OTP",
        description: "Please enter the full 4-digit OTP.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const result = await verifyOtp(enteredOtp, userEmail);
      if (!result.success) {
        throw new Error(result.message);
      }
      navigate("/resetpassword");
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
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
        width="350px"
        bgGradient="linear(to-br, #FFFFFF00 0%, #FFFFFF20 100%)"
        border="1px solid #FFFFFF35"
        backdropFilter="blur(24px)"
      >
        <Heading
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
          textAlign="center"
          mb={{ base: "16px", sm: "24px", md: "36px" }}
          fontSize={{ base: "14px", sm: "16px", md: "18px" }}
        >
          We have sent you a verification code to
          <Text as="span" fontWeight="semibold" color="#F49040">
            {" "}{userEmail}
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
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                textAlign="center"
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                borderRadius="12px"
                border="1px solid #CED4D3"
                width={{ base: "40px", sm: "48px", md: "56px" }}
                height={{ base: "40px", sm: "48px", md: "56px" }}
                bg="white"
                isDisabled={timer === 0}
                _focus={{
                  borderColor: "#F49040",
                  boxShadow: "0px 2px 5px #F49040",
                }}
              />
            ))}
          </HStack>

          <Box
            fontSize={{ base: "12px", sm: "14px", md: "16px" }}
            fontWeight="semi-bold"
            textAlign="center"
            color="white"
            mb={4}
          >
            {timer === 0 ? (
              <Text
                color={isResending ? "#ccc" : "#F49040"}
                cursor={isResending ? "not-allowed" : "pointer"}
                onClick={() => !isResending && handleResendOtp(userEmail)}
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </Text>
            ) : (
              formatTime(timer)
            )}
          </Box>

          <VStack spacing={3}>
            <Button
              type="submit"
              isDisabled={timer === 0 || oTP.some(digit => digit === "")}
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
              isLoading={isResending}
            >
              Verify
            </Button>
          </VStack>
        </form>
      </Box>
    </BOX>
  );
}

export default ForgotPasswordOTP;