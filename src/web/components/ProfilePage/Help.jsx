import React from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GoMail, GoPerson } from "react-icons/go";
import { SlPhone } from "react-icons/sl";
import { useForm } from "react-hook-form";

// Dummy Field components for demonstration. Replace with your actual Field components if needed.
const Field = {
  Root: ({ children, invalid }) => (
    <FormControl
      isInvalid={invalid}
      mb={{ base: "12px", sm: "16px", md: "20px" }}
    >
      {children}
    </FormControl>
  ),
  Label: ({ children }) => (
    <FormLabel
      color="#1F6A75"
      fontSize={{ base: "12px", sm: "14px" }}
      mb={2}
      ml={3}
      fontWeight="light"
    >
      {children}
    </FormLabel>
  ),
  HelperText: ({ children }) => (
    <Text color="#A2ABAA" fontSize="sm" ml={3} mt={1}>
      {children}
    </Text>
  ),
  ErrorText: ({ children }) => (
    <Text color="red.500" fontSize="sm" ml={3} mt={1}>
      {children}
    </Text>
  ),
};

export default function Help() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert("Message sent!\n" + JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <Box
      border="2px solid #CED4D3"
      borderRadius="24px"
      p={{ base: "28px", md: "32px", lg: "40px" }}
      mb={{ base: "18px", md: "24px", lg: "36px" }}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        textAlign="left"
        mt={{ base: "2px", sm: "8px", md: "12px" }}
        mb={{ base: "16px", sm: "24px", md: "36px" }}
      >
        <Heading
          color="#F49040"
          fontSize={{ base: "24px", sm: "28px", md: "36px" }}
          fontWeight="bold"
        >
          Get in Touch
        </Heading>
        <Text
          color="#1F6A75"
          mt={{ base: "2px", sm: "8px", md: "12px" }}
          fontSize={{ base: "16px", sm: "18px", md: "24px" }}
          fontWeight="regular"
        >
          *All fields are required
        </Text>
      </Box>

      {/* Username */}
      <FormControl
        isRequired
        mb={{ base: "12px", sm: "16px", md: "20px" }}
        isInvalid={!!errors.username}
      >
        <FormLabel
          color="#1F6A75"
          fontSize={{ base: "12px", sm: "14px" }}
          mb={2}
          ml={3}
          fontWeight="light"
        >
          User Name
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            py={{ base: "20px", sm: "23px", md: "25px" }}
            mx={{ base: "4px", sm: "8px", md: "12px" }}
          >
            <Box
              color="#F49040"
              fontSize={{ base: "16px", sm: "18px", md: "20px" }}
            >
              <GoPerson />
            </Box>
          </InputLeftElement>
          <Input
            placeholder="Enter your name"
            bg="white"
            py={{ base: "20px", sm: "23px", md: "25px" }}
            fontSize={{
              base: "12px",
              sm: "14px",
              md: "16px",
            }}
            pl={{
              base: "40px",
              sm: "48px",
              md: "52px",
            }}
            borderRadius="30px"
            border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
            {...register("username", { required: "Name is required" })}
          />
        </InputGroup>
        {errors.username && (
          <Text color="red.500" fontSize="sm" ml={3} mt={1}>
            {errors.username.message}
          </Text>
        )}
      </FormControl>

      {/* Email */}
      <FormControl
        isRequired
        mb={{ base: "12px", sm: "16px", md: "20px" }}
        isInvalid={!!errors.email}
      >
        <FormLabel
          color="#1F6A75"
          fontSize={{ base: "12px", sm: "14px" }}
          mb={2}
          ml={3}
          fontWeight="light"
        >
          Enter Email Address
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            py={{ base: "20px", sm: "23px", md: "25px" }}
            mx={{ base: "4px", sm: "8px", md: "12px" }}
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
            py={{ base: "20px", sm: "23px", md: "25px" }}
            fontSize={{
              base: "12px",
              sm: "14px",
              md: "16px",
            }}
            pl={{
              base: "40px",
              sm: "48px",
              md: "52px",
            }}
            borderRadius="30px"
            border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
          />
        </InputGroup>
        {errors.email && (
          <Text color="red.500" fontSize="sm" ml={3} mt={1}>
            {errors.email.message}
          </Text>
        )}
      </FormControl>

      {/* Phone Number */}
      <FormControl
        isRequired
        mb={{ base: "12px", sm: "16px", md: "20px" }}
        isInvalid={!!errors.phone}
      >
        <FormLabel
          color="#1F6A75"
          fontSize={{ base: "12px", sm: "14px" }}
          mb={2}
          ml={3}
          fontWeight="light"
        >
          Contact Number
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            py={{ base: "20px", sm: "23px", md: "25px" }}
            mx={{ base: "4px", sm: "8px", md: "12px" }}
          >
            <Box
              color="#F49040"
              fontSize={{ base: "16px", sm: "18px", md: "20px" }}
            >
              <SlPhone />
            </Box>
          </InputLeftElement>
          <Input
            placeholder="Enter your contact"
            bg="white"
            py={{ base: "20px", sm: "23px", md: "25px" }}
            fontSize={{
              base: "12px",
              sm: "14px",
              md: "16px",
            }}
            pl={{
              base: "40px",
              sm: "48px",
              md: "52px",
            }}
            borderRadius="30px"
            border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
            type="tel"
            {...register("phone", {
              required: "Contact number is required",
              minLength: { value: 7, message: "Enter a valid phone number" },
            })}
          />
        </InputGroup>
        {errors.phone && (
          <Text color="red.500" fontSize="sm" ml={3} mt={1}>
            {errors.phone.message}
          </Text>
        )}
      </FormControl>

      {/* Message using Field.Root */}
      <Field.Root invalid={!!errors.message}>
        <Field.Label>Write Message</Field.Label>
        <InputGroup>
          <Textarea
            placeholder="Enter your message"
            bg="white"
            py={{ base: "20px", sm: "23px", md: "25px" }}
            fontSize={{
              base: "12px",
              sm: "14px",
              md: "16px",
            }}
            borderRadius="12px"
            border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
            resize="vertical"
            minH={{ base: "80px", sm: "100px", md: "120px" }}
            {...register("message", { required: "Message is required" })}
          />
        </InputGroup>
        <Field.HelperText>
          A short description of your query or issue
        </Field.HelperText>
        <Field.ErrorText>{errors.message?.message}</Field.ErrorText>
      </Field.Root>

      {/* Action Buttons */}
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems="center"
        justifyContent="space-between"
        gap={{ base: "4px", sm: "8px", md: "12px" }}
        mt={{ base: "18px", sm: "24px", md: "36px" }}
        mb={{ base: "2px", sm: "8px", md: "12px" }}
      >
        <Button
          bg="none"
          width="50%"
          borderRadius="30px"
          type="button"
          border="1.5px solid #1F6A75"
          color="#1F6A75"
          h={{ base: "32px", sm: "42px", md: "52px" }}
          fontSize={{ base: "12px", sm: "14px", md: "16px" }}
          fontWeight={"300"}
          _focus={{ outline: "none", boxShadow: "none", }}
          _hover={{
            border: "none",
            color: "#1F6A75",
            bg: "#CED4D3",
            fontWeight: "400",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          bg="#F49040"
          color="white"
          width="100%"
          borderRadius="30px"
          type="submit"
          h={{ base: "32px", sm: "42px", md: "52px" }}
          fontSize={{ base: "12px", sm: "14px", md: "16px" }}
          fontWeight={"300"}
          _focus={{ outline: "none", boxShadow: "none", }}
          _hover={{
            border: "1.5px solid #F49040",
            color: "#F49040",
            bg: "none",
            boxShadow: "0px 0px 8px #F49040",
            fontWeight: "400",
            transition: "all 0.3s ease-in-out",
          }}
        >
          Send Message
        </Button>
      </Box>
    </Box>
  );
}
