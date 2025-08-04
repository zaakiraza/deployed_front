import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Flex,
  VStack,
  HStack,
  Spinner,
  Button,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  useToast,
  Textarea,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  
} from "@chakra-ui/react";
import { FiFileText, FiVideo, FiChevronDown,FiMaximize,  } from "react-icons/fi";
import axios from "axios";
import { useLessonContext } from "../../context/WebLessonContext";

// API Base URL
const API_BASE_URL =
  "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api";

// This helps us check which API endpoints are available and debug API issues
const logApiEndpoint = (endpoint) => {
  console.log(`Calling API endpoint: ${API_BASE_URL}${endpoint}`);
};

function Lesson({ lesson }) {
  let llesson = lesson;
  const studentEnrolChapStr = localStorage.getItem("dashboardchapter");
  let studentEnrolChap = [];
  try {
    studentEnrolChap = studentEnrolChapStr
      ? JSON.parse(studentEnrolChapStr)
      : [];
  } catch {
    studentEnrolChap = [];
  }

  const { getAllLessons, allLessons } = useLessonContext();

  const handleLoadLesson = async (id) => {
    await getAllLessons(id);
    llesson = allLessons;
  };
  // console.log("chapters", studentEnrolChap);
  //  const courseDetails = {
  //   id: "1",
  //   courseName: "Web Developement",
  //   courseDescription:
  //     "Master the basic of Website Development by building 10 Projects in 10 Classes, with HTML ...",
  //   courseRating: "4.9",
  //   cost: "Free",
  //   courseDate: "23 Aug 2025",
  //   exerciseType: "Interactive Coding Exercise",
  //   isEnroled: false,
  // };

  // const courseModules = [
  //   {
  //     id: "1",
  //     moudleNumber: "Module 1",
  //     duration: "1h 32min",
  //     task: [
  //       { title: "Heading & Paragraph Tags", iscomplete: true },
  //       { title: "List, Anchor Tags & add images", iscomplete: false },
  //       { title: "Forms & Table", iscomplete: false },
  //       { title: "Hello World", iscomplete: false },
  //     ],
  //     percentage: "20",
  //   },
  //   {
  //     id: 2,
  //     moudleNumber: "Module 2",
  //     duration: "1h 32min",
  //     task: [
  //       { title: "Images and background", iscomplete: false },
  //       { title: "Anchor Tags Attributes", iscomplete: true },
  //       { title: "Class and id", iscomplete: false },
  //     ],
  //     percentage: "50",
  //   },
  // ];

  // Toast for notifications
  const toast = useToast();

  // PDF viewer state
  const [numPages, setNumPages] = useState(10); // Mock total pages
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfLoading, setPdfLoading] = useState(false);

  // Comments state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false);

  // Rating state
  const [rating, setRating] = useState(3); // Default to 3 stars
  const [submittingRating, setSubmittingRating] = useState(false);

  // Chapter and video popover state
  const {
    isOpen: isChapterOpen,
    onOpen: onChapterOpen,
    onClose: onChapterClose,
  } = useDisclosure();
  const {
    isOpen: isVideoOpen,
    onOpen: onVideoOpen,
    onClose: onVideoClose,
  } = useDisclosure();

  // Detect mobile screen
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Lesson ID - This would typically come from URL parameters or context
  // Dynamically extract lessonId from the current lesson object
  const lessonId = llesson[0]?.id || "";

  // Google Drive document URL - using the specific provided link
  // Converting from view URL to embed URL by replacing /view with /preview
  const originalUrl = llesson[0]?.contentUrl;
  const embedUrl = llesson[0]?.contentUrl;
  // console.log(llesson[0]?.contentUrl);

  const [driveUrl, setDriveUrl] = useState(embedUrl);

  // Load function for Google Drive documents
  const loadPdf = (refresh = false) => {
    setPdfLoading(true);

    // If refresh is requested, briefly unload and reload the iframe
    if (refresh) {
      setDriveUrl("");
      setTimeout(() => {
        setDriveUrl(embedUrl);
      }, 100);
    } else {
      setDriveUrl(embedUrl);
    }

    // Short delay to simulate loading
    setTimeout(() => {
      setPdfLoading(false);
    }, 800);
  };

  const token = localStorage.getItem("userToken");

  // API Functions

  // Fetch comments for the current lesson
  const fetchComments = async () => {
    setCommentsLoading(true);
    try {
      // Log the API endpoint we're calling
      // const endpoint = `/lessons/${lessonId}/comments`;
      const endpoint = `/lesson-comments/lesson/${lessonId}`;
      // logApiEndpoint(endpoint);

      const response = await axios.get(`${API_BASE_URL}${endpoint}`);
      // const response = await axios.get('http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api/lesson-comments/lesson/1');
      // console.log(response.data);
      // Check if the response is successful (status code 200)
      if (response.status === 200) {
        setComments(response.data.data);
        // console.log(comments[0].content);
        // toast({
        //   title: "Comments Successfully Fetched",
        //   description: "Comments loaded successfully",
        //   status: "success",
        //   duration: 3000,
        //   isClosable: true,
        // });
      } else {
        // If response is not successful (e.g., status code other than 200)
        // toast({
        //   title: "Error Fetching Comments",
        //   description: `Server returned status ${response.status}`,
        //   status: "error",
        //   duration: 3000,
        //   isClosable: true,
        // });
        setComments([]);
      }
    } catch (error) {
      // Handle error when axios request fails (network error, API not reachable, etc.)
      // console.error("Error fetching comments:", error);
      // toast({
      //   title: "Error fetching comments",
      //   description: `API Error: ${error.message}`,
      //   status: "error",
      //   duration: 3000,
      //   isClosable: true,
      // });
      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  };

  // Post a new comment
  const postComment = async () => {
    if (!newComment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment before posting.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Try different possible endpoint formats until one works
      // Common API endpoint patterns for comments
      // const endpoint = `/lessons/${lessonId}/comments`;
      const endpoint = `/lesson-comments`;
      const alternateEndpoint = `/comments`;
      const alternateEndpoint2 = `/comment`;

      // logApiEndpoint(endpoint);

      console.log("Trying to post comment with payload:", {
        text: newComment,
        userId: 1,
        lessonId: lessonId, // Include lesson ID in the payload
      });

      // Try the primary endpoint pattern
      const response = await axios.post(
        `${API_BASE_URL}${endpoint}`,
        {
          content: newComment,
          // userId: 1, // This should be the actual user ID from auth context
          lessonId: lessonId, // Include lessonId in the request body as well
        },
        // h
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Comment API response:", response);

      // Add the new comment to the state
      setComments([response.data.data, ...comments]);
      setNewComment(""); // Clear the input

      toast({
        title: "Comment posted",
        description: "Your question has been posted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // console.error("Error posting comment:", error);

      // Show error toast with detailed message
      toast({
        title: "Error posting comment",
        description: `API Error: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      // Do not create mock comment or clear input so user can try again
    }
  };

  // Submit rating for the current lesson
  const submitRating = async () => {
    setSubmittingRating(true);
    try {
      const endpoint = `/lessons/${lessonId}/ratings`;
      // logApiEndpoint(endpoint);

      // console.log("Submitting rating with payload:", {
      //   rating: rating,
      //   userId: 1,
      //   lessonId: lessonId,
      // });

      const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
        rating: rating,
        userId: 1, // This should be the actual user ID from auth context
        lessonId: lessonId, // Include lessonId in the request body as well
      });

      toast({
        title: "Rating submitted",
        description: `Thank you for rating this lesson ${rating} stars!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // console.log("Rating API response:", response);
    } catch (error) {
      // console.error("Error submitting rating:", error);
      toast({
        title: "Error submitting rating",
        description: `API Error: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      // No more success toast on failure
    } finally {
      setSubmittingRating(false);
    }
  };

  // Like a comment
  const likeComment = async (commentId) => {
    try {
      const endpoint = `/comments/${commentId}/like`;
      // logApiEndpoint(endpoint);

      // console.log("Liking comment with payload:", {
      //   userId: 1,
      //   commentId: commentId,
      // });

      const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
        userId: 1, // This should be the actual user ID from auth context
        commentId: commentId, // Include comment ID in the request body as well
      });

      // Only update the UI if the API call is successful
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        return comment;
      });

      setComments(updatedComments);

      // Show success message
      toast({
        title: "Comment liked",
        description: "You liked this comment",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // console.log("Like API response:", response);
    } catch (error) {
      // console.error("Error liking comment:", error);

      // Show error toast with details
      toast({
        title: "Error liking comment",
        description: `API Error: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      // No UI update on API failure
    }
  };

  // Chapter data for the right column
  const chapterData = [
    { id: "01", title: "Scalar and Vector", isActive: true },
    { id: "02", title: "Scalar and Vector" },
    { id: "03", title: "Scalar and Vector" },
    { id: "04", title: "Scalar and Vector" },
    { id: "05", title: "Scalar and Vector" },
    { id: "06", title: "Scalar and Vector" },
    { id: "07", title: "Scalar and Vector" },
    { id: "08", title: "Scalar and Vector" },
    { id: "09", title: "Scalar and Vector" },
  ];

  // Video options data
  const videoOptions = [
    { id: "1", title: "Vector and Vector Addition" },
    { id: "2", title: "Vector and Vector Addition" },
    { id: "3", title: "Vector and Vector Addition" },
    { id: "4", title: "Vector and Vector Addition" },
  ];

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPdfLoading(false);
  }

  // Load PDF and comments on component mount
  useEffect(() => {
    loadPdf(false); // Load document by default
    fetchComments(); // Load comments from API
  }, []);

  // Add after other useDisclosure hooks
  const {
    isOpen: isVideoModalOpen,
    onOpen: openVideoModal,
    onClose: closeVideoModal,
  } = useDisclosure();
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const getEmbedUrl = (url) => {
    try {
      if (!url) return "";

      // Handle different YouTube URL formats
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        // Extract video ID
        let videoId = "";
        if (url.includes("watch?v=")) {
          videoId = url.split("watch?v=")[1];
        } else if (url.includes("youtu.be/")) {
          videoId = url.split("youtu.be/")[1];
        }

        // Remove any additional parameters
        videoId = videoId.split("&")[0];

        return `https://www.youtube.com/embed/${videoId}`;
      }

      return url; // Return original URL if not YouTube
    } catch (error) {
      console.error("Error processing video URL:", error);
      return "";
    }
  };

  // Add this with your other useDisclosure hooks
  const {
    isOpen: isPdfModalOpen,
    onOpen: openPdfModal,
    onClose: closePdfModal,
  } = useDisclosure();

  return (
    <Box
      bg="white"
      mx="auto"
      p={5}
      minHeight="100vh"
      height="auto"
      width="100%"
      maxW="100%"
      overflowY="auto"
    >
      {" "}
      <Box
        bg="#F49040"
        color="white"
        p={{ base: 3, sm: 4 }}
        borderRadius="md"
        fontWeight="bold"
        boxShadow="md"
        mb={4}
        flexShrink={0}
        position="relative"
        zIndex={10}
        minHeight={{ base: "60px", sm: "auto" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
          textAlign="center"
        >
          Chapter - {lesson[0]?.title}
        </Text>

        {/* Mobile chapter and video buttons - Only visible on mobile and positioned within the title bar */}
        <Flex
          position="absolute"
          top="50%"
          right={{ base: "8px", sm: "15px" }}
          transform="translateY(-50%)"
          gap={{ base: 1, sm: 3 }}
          display={{ base: "flex", md: "none" }}
          zIndex={1000}
        >
          {/* Chapter Selection Button */}
          <Popover
            placement="bottom-end"
            isOpen={isChapterOpen}
            onClose={onChapterClose}
            closeOnBlur={true}
            zIndex={1500}
          >
            <PopoverTrigger>
              <IconButton
                onClick={onChapterOpen}
                aria-label="Switch Chapters"
                icon={<FiFileText size="1.2em" />}
                colorScheme="white"
                variant="ghost"
                size={{ base: "sm", sm: "md" }}
                color="white"
                _hover={{
                  bg: "rgba(255,255,255,0.2)",
                  border: "none",
                }}
                _focus={{ outline: "none", boxShadow: "none" }}
              />
            </PopoverTrigger>
            <PopoverContent
              width={{ base: "250px", sm: "280px" }}
              borderColor="#F49040"
              boxShadow="xl"
              bg="white"
              zIndex={1500}
              maxW="90vw"
            >
              <PopoverArrow />
              <PopoverCloseButton
                top={{ base: "12px", sm: "20px" }}
                fontSize={{ base: "10px", sm: "12px" }}
                color="#F49040"
                _hover={{
                  bg: "rgba(255,255,255,0.2)",
                  border: "none",
                }}
                _focus={{ outline: "none", boxShadow: "none" }}
              />
              <PopoverBody p={0}>
                <Box py={6} px={3} bg="#F49040" color="white" fontWeight="bold">
                  Switch Chapters
                </Box>
                <Box maxHeight="300px" overflowY="auto" p={2}>
                  <VStack spacing={2} align="stretch">
                    {studentEnrolChap.map((chapter) => (
                      <HStack
                        key={chapter.id}
                        p={2}
                        bg={
                          chapter.id === llesson[0]?.chapterId
                            ? "#F49040"
                            : "transparent"
                        }
                        color={
                          chapter.id === llesson[0]?.chapterId
                            ? "white"
                            : "inherit"
                        }
                        borderRadius="md"
                        _hover={{
                          bg: "#f0f0f0",
                          color:
                            chapter.id === llesson[0]?.chapterId
                              ? "white"
                              : "inherit",
                        }}
                      >
                        <Box
                          w="20px"
                          h="20px"
                          borderRadius="sm"
                          border="1px solid #F8B67D"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={2}
                        >
                          <Text
                            fontSize="xs"
                            color={
                              chapter.id === llesson[0]?.chapterId
                                ? "white"
                                : "#F8B67D"
                            }
                          ></Text>
                        </Box>
                        <Text
                          fontSize="sm"
                          color="black"
                          onClick={() => {
                            handleLoadLesson(chapter.id);
                          }}
                        >
                          Chapter | {chapter.title}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {/* Video Options Button */}
          <Popover
            placement="bottom-end"
            isOpen={isVideoOpen}
            onClose={onVideoClose}
            closeOnBlur={true}
            zIndex={1500}
          >
            <PopoverTrigger>
              <IconButton
                onClick={onVideoOpen}
                aria-label="Video Topics"
                icon={<FiVideo size="1.2em" />}
                colorScheme="white"
                variant="ghost"
                size={{ base: "sm", sm: "md" }}
                color="white"
                _hover={{
                  bg: "rgba(255,255,255,0.2)",
                  border: "none",
                }}
                _focus={{ outline: "none", boxShadow: "none" }}
              />
            </PopoverTrigger>
            <PopoverContent
              width={{ base: "250px", sm: "280px" }}
              borderColor="#F8B67D"
              boxShadow="xl"
              bg="white"
              zIndex={1500}
              maxW="90vw"
            >
              <PopoverArrow />
              <PopoverCloseButton
                top={{ base: "12px", sm: "20px" }}
                fontSize={{ base: "10px", sm: "12px" }}
                color="#F8B67D"
                _hover={{
                  bg: "rgba(255,255,255,0.2)",
                  border: "none",
                }}
                _focus={{ outline: "none", boxShadow: "none" }}
              />
              <PopoverBody p={0}>
                <Box py={2} px={3} bg="#F8B67D" color="white" fontWeight="bold">
                  Chapter | {llesson[0]?.title} Related Videos
                </Box>
                <Box maxHeight="300px" overflowY="auto" p={2}>
                  <VStack spacing={2} align="stretch">
                    {llesson[0]?.videoUrls.map((video, index) => {
                      const videoUrl = video;
                      const videoLabel = video
                        ? `Video ${index + 1}`
                        : "No related Video Found";

                      return (
                        <HStack
                          key={videoUrl}
                          p={2}
                          borderRadius="md"
                          color="black"
                          onClick={() => {
                            setSelectedVideoUrl(videoUrl);
                            openVideoModal();
                          }}
                          _hover={{ bg: "#f0f0f0" }}
                        >
                          <Box
                            w="20px"
                            h="20px"
                            borderRadius="full"
                            border="1px solid #F8B67D"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mr={2}
                          >
                            <Text fontSize="xs" color="#F8B67D">
                              {index + 1}
                            </Text>
                          </Box>
                          <Text fontSize="sm">{videoLabel}</Text>
                        </HStack>
                      );
                    })}
                  </VStack>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Box>
      <Grid
        templateColumns={{ base: "1fr", md: "7fr 3fr" }} // 70% / 30% on md+
        gap={6}
        minHeight="100%"
      >
        {/* First column - Chapter title, PDF Viewer, and additional containers */}
        <VStack spacing={6} align="stretch">
          {/* Chapter title box - now separate from the PDF viewer with enlarged font */}

          {/* PDF viewer in separate container */}
          <Box
            boxShadow="md"
            bg="white"
            overflow="hidden"
            minH="1000px"
            height="calc(80vh - 100px)"
            border="4px solid rgba(244, 144, 64, 1)"
            borderRadius="24px"
            position="relative"
          >
            <IconButton
              icon={<FiMaximize />}
              position="absolute"
              top="10px"
              right="10px"
              zIndex="10"
              colorScheme="orange"
              onClick={openPdfModal}
              aria-label="Full Screen"
              bg="black"
              color="white"
              _hover={{
                bg: "white",
                color: "#F49040",
                border: "2px solid #F49040",
              }}
            />
            {/* PDF viewer content - full container */}
            <Box
              width="100%"
              height="100%"
              minHeight="700px"
              position="relative"
            >
              {pdfLoading ? (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  width="100%"
                  height="100%"
                  bg="#f9f9f9"
                >
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#1F6A75"
                    size="xl"
                    mb={4}
                  />
                  <Text>Loading document...</Text>
                </Flex>
              ) : (
                <Box width="100%" height="100%" position="relative">
                  <iframe
                    src={embedUrl}
                    title={llesson[0]?.title}
                    width="100%"
                    height="100%"
                    style={{
                      border: "none",
                      display: "block",
                      minHeight: "700px",
                    }}
                    allow="autoplay"
                    allowFullScreen={true}
                  />
                </Box>
              )}
            </Box>
          </Box>

          {/* Question Container */}
          <Box border="2px solid #F8B67D" borderRadius="24px" overflow="hidden">
            <Box
              bg="#F49040"
              color="white"
              p={4}
              textAlign="center"
              fontWeight="medium"
              borderTopLeftRadius="22px"
              borderTopRightRadius="22px"
            >
              <Text fontSize="lg">Leave a Question</Text>
            </Box>
            <Box p={4} bg="white">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                py={{ base: "20px", sm: "23px", md: "25px" }}
                fontSize={{
                  base: "12px",
                  sm: "14px",
                  md: "16px",
                }}
                borderRadius="12px"
                border={"1px solid #CED4D3"}
                placeholder="Write your question here"
                resize="vertical"
                minH={{ base: "80px", sm: "100px", md: "120px" }}
                bg="white"
                color="black"
                _focus={{
                  outline: "none",
                  boxShadow: "0px 0px 12px #F49040",
                  border: "1px solid #F49040",
                  bg: "white",
                }}
              />
              <Flex
                justify="center"
                mt={{ base: "16px", sm: "18px", md: "24px" }}
              >
                <Button
                  bg="#F49040"
                  color="white"
                  width="50%"
                  borderRadius="30px"
                  h={{ base: "28px", sm: "36px", md: "42px" }}
                  fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                  fontWeight={"400"}
                  transition="all 0.3s ease-in-out"
                  _focus={{ outline: "none", boxShadow: "none" }}
                  _hover={{
                    border: "2px solid #F49040",
                    color: "#F49040",
                    bg: "none",
                    boxShadow: "0px 0px 8px #F49040",
                    fontWeight: "400",
                  }}
                  isLoading={commentsLoading}
                  loadingText="Posting..."
                  onClick={postComment}
                >
                  Post Comment
                </Button>
              </Flex>
            </Box>

            <Box p={4} bg="white">
              <Flex align="center" mb={3}>
                <Text fontWeight="medium" color="#F49040">
                  Recent Questions
                </Text>
                {commentsLoading && (
                  <Spinner size="sm" color="#F49040" ml={2} />
                )}
              </Flex>

              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Box key={comment.id} mb={4}>
                    <HStack align="center" mb={2}>
                      <Box
                        w="40px"
                        h="40px"
                        borderRadius="full"
                        overflow="hidden"
                        mr={2}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        bg="gray.200"
                      >
                        {comment.user?.imageUrl ? (
                          <Avatar
                            src={comment.user.imageUrl}
                            name={
                              comment.user?.firstName +
                              " " +
                              comment.user?.lastName
                            }
                            size="sm"
                            width={"100%"}
                            height={"100%"}
                            borderRadius={"full"}
                          />
                        ) : (
                          <Text textAlign="center" lineHeight="40px">
                            {comment.user?.firstName?.[0] || "?"}
                          </Text>
                        )}
                      </Box>
                      <Box>
                        <Text fontWeight="medium">{comment.user.name}</Text>
                        <Text fontSize="sm" color="gray.600" mb={1}>
                          {comment.content}
                        </Text>
                        {/* <HStack spacing={3} fontSize="sm" color="gray.500"> */}
                        {/* <HStack>
                            <Box
                              cursor="pointer"
                              onClick={() => likeComment(comment.id)}
                              _hover={{ color: "#F49040" }}
                            >
                              👍
                            </Box>
                            <Text>{comment?.likes}</Text>
                          </HStack> */}
                        {/* <Text cursor="pointer" _hover={{ color: "#F49040" }}>
                            Reply
                          </Text>
                          <Text cursor="pointer" _hover={{ color: "#F49040" }}>
                            Report
                          </Text> */}
                        {/* </HStack> */}
                      </Box>
                    </HStack>
                  </Box>
                ))
              ) : (
                <Text fontSize="sm" color="gray.500" textAlign="center" py={2}>
                  No questions yet. Be the first to ask!
                </Text>
              )}
            </Box>
          </Box>

          {/* Rating Container */}
          <Box
            border="2px solid #F8B67D"
            borderRadius="24px"
            p={6}
            bg="white"
            mb={6}
          >
            <Text
              fontSize="2xl"
              color="#F49040"
              fontWeight="bold"
              textAlign="center"
              mb={4}
            >
              Rate This Lesson
            </Text>

            <Text textAlign="center" color="gray.600" mb={6}>
              Help us improve our tool to best suit your needs by rating us
              here!
            </Text>

            <Flex justify="center" mb={6}>
              <HStack spacing={2}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Box
                    key={star}
                    as="button"
                    fontSize={{ base: "24px", sm: "36px", md: "42px" }}
                    color={star <= rating ? "#F49040" : "#CED4D3"}
                    _hover={{
                      color: "#F49040",
                      border: "none",
                    }}
                    _focus={{ outline: "none", boxShadow: "none" }}
                    onClick={() => setRating(star)}
                    disabled={submittingRating}
                  >
                    ★
                  </Box>
                ))}
              </HStack>
            </Flex>

            <Flex justify="center" gap={4}>
              <Button
                bg="none"
                px={{ base: "18px", sm: "24px", md: "28px" }}
                borderRadius="30px"
                border="1.5px solid #1F6A75"
                color="#1F6A75"
                h={{ base: "32px", sm: "36px", md: "42px" }}
                fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                fontWeight={"300"}
                _focus={{ outline: "none", boxShadow: "none" }}
                _hover={{
                  border: "none",
                  color: "#1F6A75",
                  bg: "#CED4D3",
                  fontWeight: "400",
                }}
                transition="all 0.3s ease-in-out"
                onClick={() => setRating(3)} // Reset to default 3 stars
                isDisabled={submittingRating}
              >
                Cancel
              </Button>
              <Button
                bg="#F49040"
                color="white"
                px={{ base: "36px", sm: "42px", md: "54px" }}
                borderRadius="30px"
                h={{ base: "32px", sm: "36px", md: "42px" }}
                fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                fontWeight={"300"}
                _focus={{ outline: "none", boxShadow: "none" }}
                _hover={{
                  border: "1.5px solid #F49040",
                  color: "#F49040",
                  bg: "none",
                  boxShadow: "0px 0px 8px #F49040",
                  fontWeight: "400",
                }}
                transition="all 0.3s ease-in-out"
                isLoading={submittingRating}
                loadingText="Submitting..."
                onClick={submitRating}
              >
                Submit
              </Button>
            </Flex>
          </Box>
        </VStack>

        {/* Second column - Chapter Selection and Video Options */}
        <VStack
          spacing={4}
          align="stretch"
          display={{ base: "none", md: "flex" }}
        >
          {/* Chapter Selection Drawer - Only visible on desktop */}
          <Box
            bg="#1F6A75"
            border="2px solid rgba(244, 144, 64, 1)"
            borderRadius="24"
            boxShadow="md"
            overflow="hidden"
          >
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem border="none">
                <AccordionButton
                  bg="#F49040"
                  color="white"
                  fontSize={{ md: "16px", lg: "20px" }}
                  borderRadius={"0px"}
                  border="none"
                  _hover={{
                    border: "none",
                    bg: "#1F6A75",
                  }}
                  _focus={{ outline: "none", boxShadow: "none" }}
                >
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    Suggestion Chapters
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  pb={4}
                  bg="white"
                  maxHeight="300px"
                  overflowY="auto"
                >
                  <VStack spacing={2} align="stretch">
                    {studentEnrolChap.map((chapter) => (
                      <HStack
                        key={chapter.id}
                        p={2}
                        bg={
                          chapter.id === llesson[0]?.chapterId
                            ? "#F49040"
                            : "transparent"
                        }
                        color={
                          chapter.id === llesson[0]?.chapterId
                            ? "white"
                            : "inherit"
                        }
                        borderRadius="md"
                        cursor="pointer"
                        _hover={{
                          bg: "#f0f0f0",
                          color:
                            chapter.id === llesson[0]?.chapterId
                              ? "black"
                              : "inherit",
                        }}
                      >
                        <Box
                          w="20px"
                          h="20px"
                          borderRadius="sm"
                          border="1px solid #F8B67D"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={2}
                        >
                          <Text
                            fontSize="xs"
                            color={
                              chapter.id === llesson[0]?.chapterId
                                ? "white"
                                : "#F8B67D"
                            }
                          ></Text>
                        </Box>
                        <Text
                          fontSize="sm"
                          onClick={() => {
                            handleLoadLesson(chapter.id);
                          }}
                        >
                          Chapter | {chapter.title}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          {/* Video Options Drawer - Only visible on desktop */}
          <Box
            bg="#F8B67D"
            border="2px solid rgba(244, 144, 64, 1)"
            borderRadius="24"
            boxShadow="md"
            overflow="hidden"
          >
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem border="none">
                <AccordionButton
                  bg="#F8B67D"
                  color="white"
                  fontSize={{ md: "16px", lg: "20px" }}
                  borderRadius={"0px"}
                  border="none"
                  _hover={{
                    border: "none",
                    bg: "#e5a86e",
                  }}
                  _focus={{ outline: "none", boxShadow: "none" }}
                >
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    Related Viedos
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  pb={4}
                  bg="white"
                  maxHeight="300px"
                  overflowY="auto"
                >
                  <VStack spacing={2} align="stretch">
                    {llesson[0]?.videoUrls.map((video, index) => {
                      // You can store the URL in a variable here, if needed
                      const videoUrl = video;
                      const videoLabel = video
                        ? `Video ${index + 1}`
                        : "No related Video Found";

                      return (
                        <HStack
                          key={videoUrl}
                          p={2}
                          borderRadius="md"
                          _hover={{ bg: "#f0f0f0" }}
                          onClick={() => {
                            setSelectedVideoUrl(videoUrl);
                            openVideoModal();
                          }} // Opens the video in a new tab
                          cursor="pointer"
                        >
                          <Box
                            w="20px"
                            h="20px"
                            borderRadius="full"
                            border="1px solid #F8B67D"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mr={2}
                          >
                            <Text fontSize="xs" color="#F8B67D">
                              {index + 1}
                            </Text>
                          </Box>
                          <Text
                            fontSize="sm"
                            color="blue.500"
                            isTruncated
                            whiteSpace="normal" // Allow wrapping of text
                            wordBreak="break-word" // Break long words or URLs to the next line
                          >
                            {videoLabel} {/* Display the friendly label */}
                          </Text>
                        </HStack>
                      );
                    })}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </VStack>

        {/* Mobile buttons have been moved to the chapter title bar */}
      </Grid>
      {/* API Status indicator at the bottom of the page */}
      <Flex
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex={100}
        direction="column"
        align="flex-end"
      >
        {/* <Button
          size="sm"
          colorScheme="blue"
          leftIcon={<FiVideo />}
          onClick={async () => {
            try {
              const healthResponse = await axios.get(
                `${API_BASE_URL}/health-check`
              );
              toast({
                title: "API is reachable",
                description: `Status: ${healthResponse.status}`,
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              console.log("API health check response:", healthResponse);
            } catch (error) {
              toast({
                title: "API is unreachable",
                description: `Error: ${error.message}`,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              console.error("API health check error:", error);
            }
          }}
        >
          Test API Connection
        </Button> */}
      </Flex>
      {/* Video Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        size="5xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton
            bg="white"
            color="black"
            zIndex="1500"
            _hover={{
              bg: "#F49040",
              color: "white",
            }}
          />
          <ModalBody p={0}>
            <Box
              w="100%"
              h="0"
              pb="56.25%"
              position="relative"
              borderRadius="xl"
              overflow="hidden"
              bg="black"
            >
              {selectedVideoUrl && (
                <iframe
                  src={getEmbedUrl(selectedVideoUrl)}
                  title="Video Player"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* PDF Full Screen Modal */}
<Modal
  isOpen={isPdfModalOpen}
  onClose={closePdfModal}
  size="full"
  motionPreset="scale"
>
  <ModalOverlay />
  <ModalContent bg="rgba(0, 0, 0, 0.97)" height="100vh">
    <ModalCloseButton
    bg="black"
      color="white"
      zIndex="1500"
      size="lg"
      _hover={{
        bg: "#F49040",
        color: "white",
      }}
    />
    <ModalBody p={0} display="flex" alignItems="center" justifyContent="center">
      <Box width="100%" height="100vh" position="relative">
        <iframe
          src={embedUrl}
          title={`${llesson[0]?.title} - Full Screen`}
          width="100%"
          height="100%"
          style={{
            border: "none",
            display: "block",
          }}
          allow="autoplay"
          allowFullScreen={true}
        />
      </Box>
    </ModalBody>
  </ModalContent>
</Modal>
    </Box>
  );
}

export default Lesson;
