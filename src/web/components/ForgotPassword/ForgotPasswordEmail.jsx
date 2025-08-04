import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  VStack,
  Heading,
  InputGroup,
  FormLabel,
  InputLeftElement,
} from "@chakra-ui/react";
import { GoMail } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useWebUserContext } from "../../context/WebUserContext";
import BOX from "../../views/BOX";

function ForgotPasswordEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const { resetPasswordEmail } = useWebUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setLoading(true); // Start loading

    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    try {
      await resetPasswordEmail(email);
      alert("An OTP has been sent to your email.");
      Navigate("/forgotpasswordotp");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }

    setEmail(""); // Clear email input
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
          Reset Password
        </Heading>
        <VStack
          spacing={{ base: "12px", sm: "16px", md: "24px" }}
          align="stretch"
          as="form"
          onSubmit={handleSubmit}
        >
          {/* Email Input */}
          <FormControl isRequired>
            <FormLabel
              color="#FFF"
              fontSize={{ base: "12px", sm: "14px" }}
              mb={2}
              ml={3}
              fontWeight="light"
            >
              Enter Email Address
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
                  <GoMail />
                </Box>
              </InputLeftElement>
              <Input
                placeholder="Enter your email"
                bg="white"
                py={{ base: "20px", sm: "24px", md: "26px" }}
                paddingLeft={{ base: "54px", sm: "60px", md: "68px" }}
                fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                borderRadius="30px"
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <Button
            isLoading={loading}
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
            _focus={{ outline: "none", boxShadow: "none",  }}
          >
            Continue to Reset Password
          </Button>
        </VStack>
      </Box>
    </BOX>
  );
}

export default ForgotPasswordEmail;
