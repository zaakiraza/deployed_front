import {
  Box,
  Flex,
  Input,
  Textarea,
  Button,
  Heading,
  Text,
  Select,
  FormLabel,
  Stack,
  InputGroup,
  InputLeftElement,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useRef } from "react";
import { GoMail, GoPerson } from "react-icons/go";
import { SlPhone } from "react-icons/sl";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    source: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef();
  const toast = useToast();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.message || !formData.source) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Format the data according to API requirements
    const apiData = {
      firstName: formData.name,
      emailAddress: formData.email,
      phoneNumber: formData.phone,
      message: formData.message,
      whereDidYouFindUs: formData.source
    };

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api/help", 
        apiData
      );
      
      if (response.data.status === true) {
        // Show success alert
        setIsAlertOpen(true);
        
        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          source: "",
        });
      } else {
        toast({
          title: "Submission failed",
          description: response.data.message || "Please try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message || "Please try again later",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <Flex
      w={"100%"}
      align="center"
      justify="center"
      paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
    >
      <Flex
        maxW="1200px"
        width="85%"
        overflow="hidden"
        flexDirection={{ base: "column", md: "row" }}
        borderRadius="24px"
        boxShadow="2xl"
        bgGradient="linear(to-br, #FFFFFF00 0%, #FFFFFF20 100%)"
        border="1px solid #FFFFFF35"
        backdropFilter="blur(24px)"
      >
        {/* Left: Form */}
        <Box
          flex="1"
          p={{ base: "24px", sm: "36px", md: "42px", lg: "54px" }}
          color="white"
        >
          <Heading
            color="#F49040"
            fontSize={{ base: "24px", sm: "28px", md: "36px" }}
            fontWeight="bold"
          >
            Get in Touch
          </Heading>
          <Text
            color="#FFFFFF"
            mt={{ base: "2px", sm: "4px", md: "8px" }}
            fontSize={{ base: "16px", sm: "18px", md: "24px" }}
            fontWeight="regular"
            mb={{ base: "12px", sm: "18px", md: "24px" }}
          >
            *All fields are required
          </Text>

          <Stack spacing={{ base: "8px", sm: "12px", md: "16px", lg: "18px" }}>
            <Box>
              <FormLabel
                color="#FFFFFF"
                fontSize={{ base: "12px", sm: "14px" }}
                mb={2}
                ml={3}
                fontWeight="light"
              >
                Username
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
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
                  // px={4}
                  color="black"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  pl={{ base: "40px", sm: "48px", md: "52px" }}
                  py={{ base: "20px", sm: "23px", md: "25px" }}
                  fontSize={{
                    base: "12px",
                    sm: "14px",
                    md: "16px",
                  }}
                  borderRadius="30px"
                  border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                />
              </InputGroup>
            </Box>

            <Box>
              <FormLabel
                color="#FFFFFF"
                fontSize={{ base: "12px", sm: "14px" }}
                mb={2}
                ml={3}
                fontWeight="light"
              >
                Email
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  py={{ base: "20px", sm: "23px", md: "25px" }}
                  mx={{ base: "4px", sm: "8px", md: "12px" }}
                  pointerEvents="none"
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
                  color="black"
                  type="email"
                  name="email"
                  py={{ base: "20px", sm: "23px", md: "25px" }}
                  fontSize={{
                    base: "12px",
                    sm: "14px",
                    md: "16px",
                  }}
                  borderRadius="30px"
                  border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                  value={formData.email}
                  onChange={handleChange}
                  pl={{ base: "40px", sm: "48px", md: "52px" }}
                />
              </InputGroup>
            </Box>

            <Box>
              <FormLabel
                color="#FFFFFF"
                fontSize={{ base: "12px", sm: "14px" }}
                mb={2}
                ml={3}
                fontWeight="light"
              >
                Phone Number
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  py={{ base: "20px", sm: "23px", md: "25px" }}
                  mx={{ base: "4px", sm: "8px", md: "12px" }}
                  pointerEvents="none"
                >
                  <Box
                    color="#F49040"
                    fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                  >
                    <SlPhone />
                  </Box>
                </InputLeftElement>
                <Input
                  placeholder="Enter phone number"
                  bg="white"
                  color="black"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pl={{ base: "40px", sm: "48px", md: "52px" }}
                  py={{ base: "20px", sm: "23px", md: "25px" }}
                  fontSize={{
                    base: "12px",
                    sm: "14px",
                    md: "16px",
                  }}
                  borderRadius="30px"
                  border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                />
              </InputGroup>
            </Box>

            <Box>
              <FormLabel
                color="#FFFFFF"
                fontSize={{ base: "12px", sm: "14px" }}
                mb={2}
                ml={3}
                fontWeight="light"
              >
                Message
              </FormLabel>
              <Textarea
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
                placeholder="Write your question here"
                bg="white"
                color="black"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Box>

            <Box>
              <FormLabel
                color="#FFFFFF"
                fontSize={{ base: "12px", sm: "14px" }}
                ml={3}
                fontWeight="light"
              >
                Where Did You Find Us
              </FormLabel>
              <Select
                // pl={{ base: "40px", sm: "48px", md: "52px" }}
                // py={{ base: "20px", sm: "23px", md: "25px" }}
                h={{ base: "42px", sm: "48px", md: "52px" }}
                fontSize={{
                  base: "12px",
                  sm: "14px",
                  md: "16px",
                }}
                borderRadius="30px"
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                placeholder="Where Did You Find Us"
                bg="white"
                color="black"
                name="source"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="google">Google</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </Select>
            </Box>

            <Button
              bg="#F49040"
              color="white"
              width="100%"
              borderRadius="30px"
              type="submit"
              h={{ base: "32px", sm: "42px", md: "52px" }}
              fontSize={{ base: "12px", sm: "14px", md: "16px" }}
              fontWeight={"300"}
              _hover={{
                border: "1.5px solid #F49040",
                color: "#F49040",
                bg: "none",
                boxShadow: "0px 0px 8px #F49040",
                fontWeight: "400",
                transition: "all 0.3s ease-in-out",
              }}
              _focus={{ outline: "none", boxShadow: "none",  }}
              mt={2}
              onClick={handleSubmit}
              isLoading={isSubmitting}
              loadingText="Sending..."
            >
              Send Message
            </Button>
          </Stack>
        </Box>

        {/* Right: Map */}
        <Box
          flex={{ base: "1", md: "1.3" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
        >
          <Box
            bg="white"
            overflow="hidden"
            w="100%"
            h="100%"
          >
            <Box
              as="iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.250855295102!2d67.04314657482747!3d24.889423544099003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f1e3ebb3a57%3A0x71b5c1fc3fadfcab!2sOff%20The%20School!5e0!3m2!1sen!2s!4v1749096657807!5m2!1sen!2s"
              width="100%"
              height="100%"
              border="0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ minHeight: "400px", display: "block" }}
            />
          </Box>
        </Box>
      </Flex>

      {/* Success Alert Dialog */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeAlert}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="16px">
            <AlertDialogHeader 
              fontSize="lg" 
              fontWeight="bold" 
              color="#1F6A75"
              borderBottomWidth="1px"
            >
              Success
            </AlertDialogHeader>

            <AlertDialogBody py={4}>
              Help submission created successfully
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={closeAlert}
                bg="#F49040"
                color="white"
                _hover={{
                  border: "1.5px solid #F49040",
                  color: "#F49040",
                  bg: "none",
                  boxShadow: "0px 0px 8px #F49040",
                  fontWeight: "400",
                }}
                borderRadius="30px"
              >
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}
