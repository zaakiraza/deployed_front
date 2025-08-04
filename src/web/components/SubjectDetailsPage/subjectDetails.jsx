import React, { useEffect } from "react";

import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Stack,
  Divider,
  useBreakpointValue,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Skeleton
} from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";

import { FiFileText, FiUsers } from "react-icons/fi";
import star from "../../../assets/Star.svg";
import dollaricon from "../../../assets/Dollaricon.svg";
import clock from "../../../assets/clock.svg";
import BOX from "../../views/BOX";
import { useChapterContext } from "../../context/WebChapterContext";
import { useLessonContext } from "../../context/WebLessonContext";
import { a } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
import { use } from "react";
import { useEnrollmentContext } from "../../context/WebEnrollmentContext";
import { useWebUserContext } from "../../context/WebUserContext";
const SubjectDetailsPage = () => {
  const { userLoginToken } = useWebUserContext();
  const usertoken = userLoginToken || localStorage.getItem("userToken");
  // Add inside your SubjectDetailsPage component
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { studentEnrollments } = useEnrollmentContext();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { allChapters, page, setPage, limit, setLimit, totalChapters } =
    useChapterContext();
  const { getAllLessons } = useLessonContext();

  const chapters = allChapters;

  const subjectId = chapters[0]?.subjectId;

  // console.log("SubjectId:", subjectId);
  // Log all chapters to check if they are fetched correctly

  localStorage.setItem("subjectId", subjectId);

  const subjectTitle = chapters[0]?.Subject?.name;

  const className = chapters[0]?.Subject?.SubCategory?.name;

  const academicsubjects =
    chapters[0]?.Subject?.SubCategory?.Category?.name === "Academic";

  const creatingDate = chapters[0]?.createdAt;
  const creationDate = new Date(creatingDate).toLocaleString();
  //  console.log("Creation Date:", creationDate); // Log the creation date
  // Result will be: ["Urdu"] based on your example

  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const { studentEnrollmentData } = useEnrollmentContext();

  const hasEnrollment =
    studentEnrollmentData &&
    typeof studentEnrollmentData === "object" &&
    Object.keys(studentEnrollmentData).length > 0;

  const handleViewDetail = async (id) => {
    if (id) {
      localStorage.setItem("chapterId", id);
    }
    if (!token) {
      alert("Please Login to view details");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }
    if (token && !hasEnrollment) {
      onOpen(); // Open enrollment modal instead of alert
      return;
    }
    if (token && hasEnrollment) {
      onOpen(); // Open enrollment modal
      return;
    }
  };

  const totalPages = Math.ceil(totalChapters / limit);
  return (
    <BOX>
      <Box
        mt={{ base: "136px", sm: "142px", md: "156px" }}
        mb={{ base: "64px", sm: "86px", md: "136px" }}
        maxW={{ base: "75%", md: "85%" }}
        width="952px"
        mx={"auto"}
      >
        <VStack
          spacing={{ base: "18px", sm: "24px", md: "36px" }}
          align="stretch"
          // maxW="1200px"
          alignItems={"center"}
        >
          {/* Subject Header */}
          <Box
            width="95%"
            paddingY="12px"
            height="auto" // Allow height to adjust based on text
            borderRadius="24px"
            background="linear-gradient(90deg, #F4904035 0.35%, #F4904080 100%)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="1px solid"
            borderColor="#F49040"
            boxShadow="2xl"
            backdropFilter="blur(24px)"
            gap={{ base: "12px", sm: "16px", md: "24px" }}
          >
            <Box
              bg={"none"}
              width={"fit-content"}
              color={"#FFFFFF"}
              cursor={"pointer"}
              // padding={{ base: "8px", sm: "12px", md: "16px" }}
              fontSize={{ base: "24px", sm: "28px", md: "36px" }}
              border={"none"}
              _focus={{ outline: "none", boxShadow: "none" }}
              onClick={() => navigate(-1)}
            >
              <FiChevronLeft />
            </Box>

            <Text
              fontWeight="semibold"
              fontSize={{ base: "18px", sm: "24px", md: "36px" }}
              color="white"
              fontFamily="Poppins"
              textTransform="capitalize"
              textAlign="center"
            >
              Subject Details
            </Text>
          </Box>

          <Box maxW="952px" width="90%">
            <Text
              fontFamily="Poppins"
              fontWeight="600"
              fontSize={{ base: "20px", md: "24px", lg: "32px" }}
              lineHeight="100%"
              letterSpacing="1%"
              textTransform="uppercase"
              color="#ffffff"
              mb={3}
            >
              {subjectTitle}
            </Text>
            <Text
              fontFamily="Poppins"
              fontWeight="200"
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
              lineHeight="100%"
              letterSpacing="1%"
              color="#ffffff"
            >
              Master the Art of Learning {className} {subjectTitle} for the
              Board Exam...
            </Text>
          </Box>

          <Box width="90%">
            <Flex
              flexDirection={{ base: "column", sm: "row" }} // Stack vertically on small screens, horizontally on large screens
              alignItems="flex-start" // Center items on small screens, align to start on large screens
              gap={{ base: "12px", sm: "8px" }} // Equal gap between buttons in both vertical and horizontal layouts
              justifyContent="start" // Ensure buttons are centered horizontally on both layouts
            >
              <Box
                height="40px"
                width="auto"
                padding={4}
                borderRadius="8px"
                backgroundColor="#FFFFFF"
                display="flex"
                alignItems="center"
              >
                <Image
                  src={star}
                  alt="star"
                  width={{ base: "18px", sm: "20px", md: "24px" }}
                />
                <Text
                  ml="8px"
                  color={"#1F6A75"}
                  fontFamily="Poppins"
                  fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                >
                  4.0
                </Text>
              </Box>
              <Box
                height="40px"
                width="auto"
                padding={4}
                borderRadius="8px"
                backgroundColor="#FFFFFF"
                display="flex"
                alignItems="center"
              >
                <Image
                  src={dollaricon}
                  alt="Dollar"
                  width={{ base: "18px", sm: "20px", md: "24px" }}
                />
                <Text
                  ml="8px"
                  color={"#1F6A75"}
                  fontFamily="Poppins"
                  fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                >
                  Free
                </Text>
              </Box>
              <Box
                height="40px"
                width="auto"
                padding={4}
                borderRadius="8px"
                backgroundColor="#FFFFFF"
                display="flex"
                alignItems="center"
              >
                <Image
                  src={clock}
                  alt="Calendar"
                  width={{ base: "18px", sm: "20px", md: "24px" }}
                />
                <Text
                  ml="8px"
                  fontFamily="Poppins"
                  fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                  color={"#1F6A75"}
                >
                  {creationDate}
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box width="90%">
            <Text
              fontFamily="Poppins"
              fontSize={{ base: "20px", md: "28px" }}
              fontWeight="500"
              color="#ffffff"
              textAlign="left"
            >
              {academicsubjects ? "Chapters" : "Courses"}
            </Text>
          </Box>

          <SimpleGrid
            width="92%"
            columns={{ base: 1, md: 2 }}
            spacing={{ base: "18px", sm: "24px", md: "36px" }}
          >
            {chapters.map((chapter) => {
              const randomStarCount = Math.floor(Math.random() * 6); // 0 to 5

              return (
                <Box
                  key={chapter.id}
                  bg="white"
                  borderRadius="12px"
                  boxShadow="xl"
                  border={"1px solid #CED4D3"}
                  p={{ base: "12px", sm: "16px", md: "18px" }}
                >
                  <Skeleton
                    isLoaded={!!chapter.imageUrl} // Only show skeleton when image is not loaded
                    position="relative"
                    overflow={"hidden"}
                    borderRadius={"8px"}
                    border={"1px solid #CED4D3"}
                    height={{ base: "180px", sm: "200px", md: "220px" }} // Set fixed height
                    width="100%" // Set width to match parent
                  >
                    <Image
                      src={chapter.imageUrl}
                      alt={chapter.title}
                      objectFit="cover"
                      w="100%"
                      h="100%" // Make image fill the skeleton container
                      transition="all 0.3s ease"
                      _hover={{
                        transform: "scale(1.2)",
                      }}
                      mx="auto"
                    />
                  </Skeleton>

                  <Box
                    width={"95%"}
                    mx="auto"
                    my={{ base: "8px", sm: "12px", md: "8px", lg: "12px" }}
                  >
                    <VStack
                      alignItems={"baseline"}
                      spacing={{ base: "4px", sm: "8px", md: "4px", lg: "8px" }}
                    >
                      {/* ⭐ Fixed Star Rating */}
                      <HStack
                        spacing={{ base: "6px", sm: "8px" }}
                        align="center"
                        fontSize={{ base: "12px", sm: "16px" }}
                        color="#A2ABAA"
                      >
                        <HStack spacing={{ base: "2px", sm: "4px" }}>
                          {Array(5)
                            .fill("")
                            .map((_, i) => (
                              <Box key={i}>
                                {i < randomStarCount ? (
                                  <Box size={{ base: "12px", sm: "18px" }}>
                                    <FaStar color="#F49040" />
                                  </Box>
                                ) : (
                                  <Box size={{ base: "12px", sm: "18px" }}>
                                    <FaRegStar color="#A2ABAA" />
                                  </Box>
                                )}
                              </Box>
                            ))}
                        </HStack>
                        <Text color={"#0D0D0D"} fontWeight={"medium"}>
                          {chapter.rating || "0"}
                        </Text>
                        <Text>({chapter.reviewCount || "0"})</Text>
                      </HStack>

                      <Heading
                        fontSize={{
                          base: "18px",
                          sm: "24px",
                          md: "18px",
                          lg: "24px",
                        }}
                        noOfLines={2}
                      >
                        {chapter.title}
                      </Heading>

                      <Stack
                        direction="row"
                        fontSize={{
                          base: "14px",
                          sm: "18px",
                          md: "14px",
                          lg: "18px",
                        }}
                        color="#A2ABAA"
                        spacing={3}
                      >
                        <HStack spacing={2}>
                          <FiFileText color="#F49040" />
                          <Text>{chapter.lessonCount || 1} Lessons</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <FiUsers color="#F49040" />
                          <Text> {chapter.studentCount || 0} Students</Text>
                        </HStack>
                      </Stack>

                      <Text
                        fontSize={{ base: "14px", sm: "18px" }}
                        fontWeight="bold"
                        color="#1F6A75"
                      >
                        {chapter.price || "free"}
                      </Text>

                      <Button
                        px={4}
                        py={3}
                        fontWeight="light"
                        cursor="pointer"
                        transition="all 0.3s ease"
                        width="full"
                        bg="none"
                        color="#F49040"
                        borderRadius="30px"
                        border={"1px solid #F49040"}
                        h={{ base: "32px", sm: "42px", md: "32px", lg: "42px" }}
                        fontSize={{
                          base: "12px",
                          sm: "16px",
                          md: "12px",
                          lg: "16px",
                        }}
                        _hover={{
                          border: "2px solid #F49040",
                          color: "#FFFFFF",
                          bg: "#F49040",
                        }}
                        _focus={{
                          outline: "none",
                          ring: 2,
                          ringColor: "#F49040",
                        }}
                        onClick={() => handleViewDetail(chapter.id)}
                      >
                        View Details
                      </Button>
                    </VStack>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>

          <Flex
            width="100%"
            justify="center"
            align="center"
            // my={{ base: "18px", sm: "24px", md: "36px" }}
          >
            <Button
              onClick={() => setPage(page - 1)}
              isDisabled={page === 1}
              mr={{ base: "4px", sm: "8px", md: "12px" }}
              px={4}
              py={3}
              fontWeight="light"
              cursor="pointer"
              transition="all 0.3s ease"
              width={{ base: "136px", sm: "220px", md: "186px" }}
              // maxSm={{ width: "full" }}
              border="2px solid #F49040"
              bg="none"
              color="#F49040"
              borderRadius="30px"
              h={{ base: "36px", sm: "42px", md: "54px" }}
              fontSize={{ base: "12px", sm: "14px", md: "16px" }}
              _hover={{
                border: "none",
                color: "white",
                bg: "#F49040",
                boxShadow: "0px 2px 5px #F49040",
              }}
              _disabled={{
                bg: "none",
                color: "#FFFFFF50",
                border: "2px solid #FFFFFF50",
                boxShadow: "none",
                cursor: "not-allowed",
              }}
              _focus={{ outline: "none", boxShadow: "none" }}
            >
              Previous
            </Button>
            <Text
              mx={{ base: "4px", sm: "8px", md: "12px" }}
              textAlign={"center"}
              color="#FFFFFF"
              fontWeight="light"
              fontSize={{ base: "12px", sm: "14px", md: "16px" }}
            >
              Page {page} of {totalPages}
            </Text>
            <Button
              onClick={() => setPage(page + 1)}
              isDisabled={page === totalPages || totalPages === 0}
              ml={{ base: "4px", sm: "8px", md: "12px" }}
              px={4}
              py={3}
              fontWeight="light"
              cursor="pointer"
              transition="all 0.3s ease"
              width={{ base: "136px", sm: "220px", md: "186px" }}
              // maxSm={{ width: "full" }}
              border="2px solid #F49040"
              bg="none"
              color="#F49040"
              borderRadius="30px"
              h={{ base: "36px", sm: "42px", md: "54px" }}
              fontSize={{ base: "12px", sm: "14px", md: "16px" }}
              _hover={{
                border: "none",
                color: "white",
                bg: "#F49040",
                boxShadow: "0px 2px 5px #F49040",
              }}
              _disabled={{
                bg: "none",
                color: "#FFFFFF50",
                border: "2px solid #FFFFFF50",
                boxShadow: "none",
                cursor: "not-allowed",
              }}
              _focus={{ outline: "none", boxShadow: "none" }}
            >
              Next
            </Button>
          </Flex>
        </VStack>
        {/* Enrollment Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalContent>
            <ModalHeader bg="#F49040" color="white" borderTopRadius="md">
              Enrollment Required
            </ModalHeader>
            <ModalBody py={6}>
              <VStack spacing={4}>
                <Text>
                  You need to enroll in this course to access its content.
                </Text>
                <Button
                  w="full"
                  colorScheme="orange"
                  bg="#F49040"
                  onClick={async () => {
                    try {
                      const subcategoryId =
                        allChapters[0]?.Subject?.SubCategory?.id;
                      const result = await studentEnrollments({
                        studentId: localStorage.getItem("userId"),
                        userToken: token,
                        subcategoryId,
                      });

                      if (result.success === true) {
                        onClose();
                        alert(result.message || " Enrollment successful");
                        navigate("/dashboard");
                      } else {
                        alert(result.message || "Enrollment failed");
                        usertoken &&
                          navigate("/dashboard/category/digitalschool-classes");
                      }
                    } catch (error) {
                      console.error("Enrollment error:", error);
                      alert("Failed to enroll. Please try again.");
                    }
                  }}
                >
                  Enroll Now
                </Button>
                <Button
                  w="full"
                  variant="outline"
                  onClick={() => {
                    onClose();
                    navigate(-1);
                  }}
                >
                  Go Back
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </BOX>
  );
};

export default SubjectDetailsPage;

// <HStack spacing={4} mt={4} justify="left" flexWrap="wrap">
//   <HStack bg="white" px={3} py={1.5} borderRadius="md">
//     <Text fontWeight="bold" color="orange.400">
//       ★ 4.9
//     </Text>
//   </HStack>
//   <HStack bg="white" px={3} py={1.5} borderRadius="md">
//     <Text fontWeight="medium" color="gray.700">
//       Free
//     </Text>
//   </HStack>
//   <HStack bg="white" px={3} py={1.5} borderRadius="md">
//     <Text color="gray.700">📅 23 of August</Text>
//   </HStack>
// </HStack>
