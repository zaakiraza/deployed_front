import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  HStack,
  IconButton,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import axios from "axios";
import Footer from './Footer';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();

  const colors = {
    primary: "#F49040",
    secondary: "#1F6A75",
    tertiary: "#146062",
    white: "#FFFFFF",
  };

  // Fetch FAQ data from API
  const fetchFAQs = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api/faq/?page=${page}&limit=${limit}`
      );

      if (response.data.status) {
        setFaqs(response.data.data.faqs);
        setTotalPages(response.data.data.pagination.totalPages || 1);
      } else {
        setFaqs([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError("Failed to load FAQs. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to load FAQs. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleRetry = () => {
    fetchFAQs(currentPage);
  };

  if (loading) {
    return (
      <Box width="100%" py={16} display="flex" justifyContent="center">
        <Flex
          justify="center"
          align="center"
          minH="100%"
          width="100%"
          height="100vh"
        >
          <VStack spacing={4}>
            <Spinner
              size="xl"
              color={colors.primary}
              thickness="4px"
              speed="0.65s"
            />
            <Text color={colors.secondary} fontSize="lg">
              Loading FAQs...
            </Text>
          </VStack>
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box width="100%" py={16} display="flex" justifyContent="center">
        <Container maxW="1200px">
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="lg"
            py={8}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Unable to load FAQs
            </AlertTitle>
            <AlertDescription maxWidth="sm" mb={4}>
              {error}
            </AlertDescription>
            <Button
              colorScheme="orange"
              bg={colors.primary}
              _hover={{ bg: colors.tertiary }}
              onClick={handleRetry}
            >
              Try Again
            </Button>
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg={colors.white} minH="100vh" display="flex" flexDirection="column">
      <Box flex="1" py={16} mt="80px">
        <Container maxW="container.lg" px={4}>
          <VStack spacing={8} align="stretch" width="100%">
            {/* Header Section */}
            <Box textAlign="center" mb={8}>
              <Heading
                as="h1"
                size="2xl"
                color={colors.secondary}
                mb={4}
                fontWeight="bold"
                outline="none"
              >
                Frequently Asked Questions
              </Heading>
              <Text
                fontSize="xl"
                color={colors.tertiary}
                maxW="600px"
                mx="auto"
                lineHeight="1.6"
                outline="none"
              >
                Find answers to common questions about our platform and services
              </Text>
            </Box>

            {/* FAQ Section */}
            {faqs.length === 0 ? (
              <Box textAlign="center" py={12} outline="none">
                <Text fontSize="lg" color={colors.tertiary}>
                  No FAQs available at the moment.
                </Text>
              </Box>
            ) : (
              <Accordion allowMultiple>
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="lg"
                    mb={4}
                    bg={colors.white}
                    outline="none"
                    _focus={{ outline: "none" }}
                    _hover={{
                      outline: "none",
                      shadow: "0 4px 12px rgba(244, 144, 64, 0.15)",
                    }}
                  >
                    <AccordionButton
                      py={6}
                      px={8}
                      borderRadius="lg"
                      outline="none"
                      _focus={{ outline: "none" }}
                    >
                      <Box flex="1" textAlign="left" outline="none">
                        <Text
                          fontSize="lg"
                          fontWeight="semibold"
                          lineHeight="1.5"
                          outline="none"
                          _hover={{ shadow: "none", border: "none" }}
                        >
                          {faq.question}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <hr />
                    <AccordionPanel pb={6} px={8} outline="none">
                      <Text
                        fontSize="md"
                        color={colors.tertiary}
                        lineHeight="1.7"
                        whiteSpace="pre-wrap"
                        outline="none"
                      >
                        {faq.answer}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box mt={8} outline="none">
                <Flex justify="center" align="center" gap={4}>
                  <IconButton
                    icon={<ChevronLeftIcon />}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    colorScheme="orange"
                    bg={colors.primary}
                    _hover={{ bg: colors.tertiary }}
                    _disabled={{
                      opacity: 0.5,
                      cursor: "not-allowed",
                    }}
                    aria-label="Previous page"
                    outline="none"
                  />

                  <HStack spacing={2}>
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        colorScheme={currentPage === i + 1 ? "orange" : "gray"}
                        bg={currentPage === i + 1 ? colors.primary : "gray.200"}
                        color={
                          currentPage === i + 1 ? colors.white : colors.tertiary
                        }
                        _hover={{
                          bg:
                            currentPage === i + 1
                              ? colors.tertiary
                              : colors.primary,
                          color: colors.white,
                        }}
                        size="sm"
                        minW="40px"
                        outline="none"
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </HStack>

                  <IconButton
                    icon={<ChevronRightIcon />}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    colorScheme="orange"
                    bg={colors.primary}
                    _hover={{ bg: colors.tertiary }}
                    _disabled={{
                      opacity: 0.5,
                      cursor: "not-allowed",
                    }}
                    aria-label="Next page"
                    outline="none"
                  />
                </Flex>

                <Text
                  textAlign="center"
                  mt={4}
                  fontSize="sm"
                  color={colors.tertiary}
                  outline="none"
                >
                  Page {currentPage} of {totalPages}
                </Text>
              </Box>
            )}
          </VStack>
        </Container>
      </Box>
      <Box
      margin='auto'
      >
      <Footer/>
      </Box>
    </Box>
  );
};

export default FAQ;