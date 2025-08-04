import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  Button,
  IconButton,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { FaYoutube } from "react-icons/fa";
import axios from "axios";
import { keyframes } from "@emotion/react";

const MotionBox = motion.create(Box);

// Animation keyframes for floating effects
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(-5px) rotate(-1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// API endpoint for testimonials
const TESTIMONIALS_API_URL = "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api/testimonial";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipImageAnim, setFlipImageAnim] = useState(false);
  const [flipTextAnim, setFlipTextAnim] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const autoFlipTimerRef = useRef(null);

  // Define a placeholder image URL for when testimonials are loading or unavailable
  const placeholderImageUrl =
    "https://via.placeholder.com/400x300?text=Testimonials";

  // Vertical flip animation for image (from top to bottom) - improved with easing
  const verticalFlip = keyframes`
    0% { transform: rotateX(0) translateY(0); opacity: 1; }
    25% { opacity: 0.9; }
    50% { transform: rotateX(90deg) translateY(-10px); opacity: 0.6; }
    75% { opacity: 0.9; }
    100% { transform: rotateX(0) translateY(0); opacity: 1; }
  `;
  
  // Horizontal flip animation for image card
  const horizontalFlip = keyframes`
    0% { transform: rotateY(0); opacity: 1; }
    25% { opacity: 0.9; }
    50% { transform: rotateY(90deg); opacity: 0.6; }
    75% { opacity: 0.9; }
    100% { transform: rotateY(0); opacity: 1; }
  `;

  // Function to handle next testimonial with animations - improved timing
  const handleNext = () => {
    if (!testimonials || testimonials.length === 0) return;

    // Start animations
    setFlipImageAnim(true);
    setFlipTextAnim(true);

    // Change the current index after a slight delay - increased for smoother transition
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);

      // Reset animations after the new content is displayed - longer delay for smoother finish
      setTimeout(() => {
        setFlipImageAnim(false);
        setFlipTextAnim(false);
      }, 200);
    }, 700); // Increased to allow more time for the animation to complete
  };

  // Function to handle previous testimonial with animations - improved timing
  const handlePrev = () => {
    if (!testimonials || testimonials.length === 0) return;

    // Start animations
    setFlipImageAnim(true);
    setFlipTextAnim(true);

    // Change the current index after a slight delay - increased for smoother transition
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + testimonials.length) % testimonials.length
      );

      // Reset animations after the new content is displayed - longer delay for smoother finish
      setTimeout(() => {
        setFlipImageAnim(false);
        setFlipTextAnim(false);
      }, 200);
    }, 700); // Increased to allow more time for the animation to complete
  };

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    // Only set up auto-rotation if we have testimonials
    if (testimonials.length > 0) {
      // Clear any existing timer
      if (autoFlipTimerRef.current) {
        clearInterval(autoFlipTimerRef.current);
      }

      // Set up a new timer
      autoFlipTimerRef.current = setInterval(() => {
        handleNext();
      }, 5000); // Change testimonial every 5 seconds

      // Clean up timer when component unmounts or testimonials change
      return () => {
        if (autoFlipTimerRef.current) {
          clearInterval(autoFlipTimerRef.current);
        }
      };
    }
  }, [testimonials, currentIndex]);

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Function to render star rating
  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Box
          as="span"
          key={i}
          color={i < count ? "#F49040" : "rgba(0,0,0,0.2)"}
          fontSize="18px"
          mr="1px"
        >
          ★
        </Box>
      ));
  };

  // Function to extract YouTube video ID from URL
  const getYoutubeVideoId = (url) => {
    if (!url) return null;

    // Match patterns like: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  // Function to get YouTube thumbnail URL from video ID
  const getYoutubeThumbnailUrl = (videoId) => {
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  /**
   * Fetches testimonial data from the API endpoint
   * Handles different possible response structures and processes video URLs
   */
  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(TESTIMONIALS_API_URL);

      // Handle different possible response structures
      let testimonialData = [];

      if (Array.isArray(response.data)) {
        testimonialData = response.data;
      } else if (
        response.data?.data?.testimonials &&
        Array.isArray(response.data.data.testimonials)
      ) {
        testimonialData = response.data.data.testimonials;
      } else if (
        response.data?.testimonials &&
        Array.isArray(response.data.testimonials)
      ) {
        testimonialData = response.data.testimonials;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        testimonialData = response.data.data;
      }

      // Process testimonials to add YouTube thumbnails if videoUrl exists
      const processedTestimonials = testimonialData.map((testimonial) => {
        if (testimonial.videoUrl) {
          const videoId = getYoutubeVideoId(testimonial.videoUrl);
          const thumbnailUrl = getYoutubeThumbnailUrl(videoId);

          // If there's no image_url but we have a video thumbnail, use it
          if (!testimonial.image_url && !testimonial.img_url && thumbnailUrl) {
            return {
              ...testimonial,
              image_url: thumbnailUrl,
              hasVideo: true,
              videoId,
            };
          }

          // Otherwise just add the video info
          return {
            ...testimonial,
            hasVideo: true,
            videoId,
          };
        }

        return testimonial;
      });

      setTestimonials(processedTestimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setError(
        `Failed to load testimonials: ${error.message || "Unknown error"}`
      );
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Horizontal flip animation is defined but not used, can be removed if needed

  return (
      <Container 
        maxW="7xl" 
        px={{ base: 4, md: 8 }} 
        pt={{ base: 2, md: 4 }}
        pb={{ base: 10, md: 12 }} // Reduced bottom padding
        minH={{ base: "550px", md: "650px" }} // Adjusted minimum height
        display="flex"
        flexDirection="column"
        color="white" // Added color since we removed the outer Box
      >
        {isLoading && (
          <Flex justifyContent="center" alignItems="center" height="300px">
            <Text fontSize="xl" color="white">
              Loading testimonials...
            </Text>
          </Flex>
        )}

        {/* Testimonial Content - Only show when not loading and testimonials exist */}
        {!isLoading && testimonials.length > 0 && (
          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "flex-start", lg: "center" }} // Changed to center alignment on large screens
            justify="space-between"
            gap={{ base: 8, lg: 2 }} // Reduced gap between columns
            position="relative"
            mt={{ base: 6, md: 8, lg: 4 }} // Slightly reduced top margin
            flex="1" // Make the flex container grow to fill available space
            minH={{ base: "500px", md: "550px" }} // Minimum height for the content area
          >
            {/* Left Side - Text Content */}
            <Box
              w={{ base: "100%", lg: "40%" }}
              as={motion.div}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems={{ base: "center", lg: "flex-start" }}
            >
              <VStack
                spacing={{ base: 3, md: 4 }}
                align={{ base: "center", lg: "flex-start" }}
                textAlign={{ base: "center", lg: "left" }}
                width="100%"
                maxW={{ base: "100%", lg: "450px" }}
              >
                {/* Testimonial Header - As per reference design */}
        <Box
          textAlign={{ base: "center", lg: "left" }}
          mb={{ base: 8, md: 10 }}
          mt={{ base: 8, md: 10 }} // Added top margin
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            as="span"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="wider"
            fontWeight="medium"
            color="white"
            mb={3}
            display="inline-block"
            borderBottom="2px solid #F49040"
            pb={1}
          >
            TESTIMONIAL
          </Box>
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color="#F49040"
            mt={4}
          >
            What They Say?
          </Heading>
        </Box>
                <Text
                  fontSize={{ base: "md", sm: "lg", md: "xl" }}
                  color="white"
                  fontWeight="500"
                  lineHeight="1.5"
                >
                  Off The School has got more than 100k positive ratings from
                  our users around the world.
                </Text>

                <Text 
                  fontSize={{ base: "sm", sm: "md", lg: "lg" }} 
                  color="white"
                  lineHeight="1.5"
                >
                  Some of the students and teachers were greatly helped by Off
                  The School.
                </Text>

                <Text
                  fontSize={{ base: "sm", sm: "md", lg: "lg" }}
                  color="whiteAlpha.800"
                  mb={{ base: 4, md: 5 }}
                  lineHeight="1.5"
                >
                  Are you too? Please give your assessment
                </Text>

                <Button
                  bg="#F49040"
                  color="#FFFFFF"
                  borderRadius="full"
                  size={{ base: "md", md: "lg" }}
                  fontSize={{ base: "sm", md: "md" }}
                  px={{ base: 6, md: 8 }}
                  py={{ base: 5, md: 6 }}
                  _hover={{
                    bg: "transparent",
                    color: "#F49040",
                    border: "1px solid #F49040",
                    shadow: "0px 0px 12px #F49040",
                    transition: "all 0.3s ease-in-out",
                  }}
                  outline={"none"}
                  _focus={{ outline: "none" }}
                  fontWeight="medium"
                  alignSelf={{ base: "center", lg: "flex-start" }}
                  onClick={() => {
                    const playlistUrl =
                      testimonials[0]?.videoUrl ||
                      testimonials[0]?.videoLink ||
                      "https://www.youtube.com/playlist?list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP";
                    window.open(playlistUrl, "_blank");
                  }}
                >
                  Watch Playlist
                </Button>
              </VStack>
            </Box>

            {/* Right Side - Testimonial Display */}
            <Box
              w={{ base: "100%", lg: "55%" }}
              position="relative"
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              pt={{ base: 0, lg: 9 }} // Removed top padding
              mb={{ base: 0, lg: 3 }} // Further reduced bottom margin for better alignment
            >
              {/* Main Content Wrapper with Perspective - Adjusted for better alignment */}
              <Box
                position="relative"
                width="full"
                height={{ base: "400px", md: "420px" }}
                perspective="1500px"
                display="flex"
                justifyContent="center"
              >
                {/* Main Image Card with VERTICAL Flip Animation (Instagram square post dimensions) */}
                <MotionBox
                  position="relative"
                  overflow="hidden"
                  borderRadius="2xl"
                  height={{ base: "330px", md: "380px" }}
                  width={{ base: "330px", md: "380px" }} // Square dimensions like Instagram
                  mx="auto" // Center the square frame
                  mt={{ base: 2, lg: -4 }} // Reduced negative margin for better alignment
                  animation={
                    flipImageAnim 
                      ? `${horizontalFlip} 1.4s cubic-bezier(0.25, 1, 0.5, 1)` 
                      : `${float} 5s ease-in-out infinite`
                  }
                  transition="all 0.3s ease"
                  bgGradient="linear(to-br, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.03) 100%)"
                  border="1px solid rgba(245, 240, 240, 0.98)"
                  boxShadow="lg"
                  sx={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src={
                      testimonials[currentIndex]?.image_url ||
                      testimonials[currentIndex]?.img_url ||
                      placeholderImageUrl
                    }
                    alt={`Testimonial from ${
                      testimonials[currentIndex]?.name || "student"
                    }`}
                    objectFit="cover"
                    objectPosition="center"
                    w="full"
                    h="full"
                    borderRadius="2xl"
                  />
                </MotionBox>

                {/* Navigation Buttons - Positioned exactly at the red marks */}
                <Flex
                  position="absolute"
                  width="100%"
                  height="100%"
                  zIndex={10}
                  pointerEvents="none"
                >
                  <IconButton
                    position="absolute"
                    left="100px"
                    top="40%"
                    transform="translateY(-50%)"
                    icon={<ChevronLeftIcon boxSize={6} />}
                    aria-label="Previous testimonial"
                    onClick={handlePrev}
                    isRound
                    bg="white"
                    color="#093635"
                    boxShadow="md"
                    _hover={{ transform: "scale(1.1) translateY(-50%)", bg: "white" }}
                    _active={{ transform: "scale(0.95) translateY(-50%)" }}
                    width="32px"
                    height="32px"
                    pointerEvents="auto"
                  />

                  <IconButton
                    position="absolute"
                    right="100px"
                    top="40%"
                    transform="translateY(-50%)"
                    icon={<ChevronRightIcon boxSize={6} />}
                    aria-label="Next testimonial"
                    onClick={handleNext}
                    isRound
                    bg="white"
                    color="#093635"
                    boxShadow="md"
                    _hover={{ transform: "scale(1.1) translateY(-50%)", bg: "white" }}
                    _active={{ transform: "scale(0.95) translateY(-50%)" }}
                    width="32px"
                    height="32px"
                    pointerEvents="auto"
                  />
                </Flex>

                {/* YouTube Video Thumbnail - Adjusted for square frame */}
                {testimonials[currentIndex]?.hasVideo && testimonials[currentIndex]?.videoId && (
                  <Box
                    position="absolute"
                    top="10px"
                    right={{ base: "10px", md: "-40px" }}
                    width={{ base: "180px", md: "200px" }}
                    height={{ base: "100px", md: "120px" }}
                    borderRadius="md"
                    overflow="hidden"
                    boxShadow="lg"
                    zIndex={5}
                    cursor="pointer"
                    onClick={() => {
                      const videoUrl = testimonials[currentIndex]?.videoUrl;
                      if (videoUrl) {
                        window.open(videoUrl, "_blank");
                      }
                    }}
                    _hover={{ transform: "scale(1.05)" }}
                    transition="transform 0.3s ease"
                  >
                    <Image
                      src={`https://img.youtube.com/vi/${testimonials[currentIndex]?.videoId}/hqdefault.jpg`}
                      alt="Video testimonial thumbnail"
                      objectFit="cover"
                      w="full"
                      h="full"
                    />
                    <Flex
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bg="rgba(0,0,0,0.4)"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        as={FaYoutube}
                        size="40px"
                        color="red.500"
                        opacity={0.9}
                      />
                    </Flex>

                    {/* Custom text overlay on video thumbnail as in reference */}
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      bg="rgba(0,0,0,0.7)"
                      p={2}
                      textAlign="center"
                    >
                      <Text color="white" fontSize="xs" fontWeight="bold">
                        {testimonials[currentIndex]?.thumbnailText ||
                          "WATCH TESTIMONIAL"}
                      </Text>
                    </Box>
                  </Box>
                )}

                {/* Testimonial Quote Box - With Hero section style gradient */}
                <Box
                  position="absolute"
                  bottom={{ base: "-15px", md: "-25px" }}
                  right={{ base: "10px", md: "20px" }}
                  width={{ base: "100%", md: "90%" }}
                  maxWidth="450px"
                  bgGradient="linear(to-br, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.13) 100%)"
                  borderRadius="xl"
                  p={{ base: 4, md: 6 }}
                  boxShadow="lg"
                  animation={
                    flipTextAnim 
                      ? `${verticalFlip} 1.4s cubic-bezier(0.25, 1, 0.5, 1)` 
                      : `${pulse} 6s ease-in-out infinite`
                  }
                  transition="all 0.3s ease"
                  border="1px solid rgba(255, 255, 255, 0.2)"
                  zIndex={2}
                  sx={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    fontStyle="italic"
                    color="black"
                    mb={5}
                    lineHeight="1.6"
                  >
                    "
                    {testimonials[currentIndex]?.text ||
                      "Thank you so much for your help. It's exactly what I've been looking for. You won't regret it. It really saves me time and effort. Skilline is exactly what our business has been lacking."}
                    "
                  </Text>

                  <Text
                    fontWeight="bold"
                    fontSize={{ base: "md", md: "lg" }}
                    color="#004e45ff" 
                    mt={2}
                  >
                    {testimonials[currentIndex]?.name || "Gloria Rose"}
                  </Text>

                  <Text fontSize={{ base: "sm", md: "md" }} color="Green.500">
                    {testimonials[currentIndex]?.designation || "Student"}
                  </Text>

                  <Box display="flex" alignItems="center" mt={1}>
                    {renderStars(testimonials[currentIndex]?.rating || 5)}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Flex>
        )}

        {/* If no testimonials, show a message */}
        {!isLoading && testimonials.length === 0 && !error && (
          <Box textAlign="center" py={10}>
            <Text fontSize="xl" color="white">
              No testimonials available at the moment.
            </Text>
          </Box>
        )}

        {/* If there was an error, show the error message */}
        {!isLoading && error && (
          <Box textAlign="center" py={10}>
            <Text fontSize="xl" color="red.300">
              {error}
            </Text>
            <Button
              mt={4}
              colorScheme="teal"
              onClick={() => {
                setError(null);
                fetchTestimonials();
              }}
            >
              Try Again
            </Button>
          </Box>
        )}
      </Container>
  );
};

export default Testimonials;
