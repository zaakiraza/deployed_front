import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  Flex,
  Button,
  Image,
  VStack,
  HStack,
  AspectRatio,
  Icon,
} from "@chakra-ui/react";
import { FaYoutube, FaPlay } from "react-icons/fa";
import logoImg from "../../../assets/logo.png";

// YouTube API Key and Channel ID
const apiYoutubeKey = "AIzaSyDIS2JrKs2-glhjfw1JtAlLTxxfN4za0nI"; // Replace with your YouTube API Key
const channelId = "UC_iXVfWPu33lh1sfzHdfuBw"; // Replace with your YouTube Channel ID

const SuccessStories = () => {
  const [channelInfo, setChannelInfo] = useState({
    name: "Loading...",
    subscribers: "Loading...",
    videos: "Loading...",
    views: "Loading...",
    logo: logoImg, // Default logo until data is fetched
  });

  const [videoItems, setVideoItems] = useState([]);

  // Fetch YouTube channel information
  const fetchChannelInfo = async () => {
    const channelInfoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiYoutubeKey}`
    );
    const data = await channelInfoResponse.json();
    const channel = data.items[0];
    const logoUrl = channel.snippet.thumbnails.high.url;

    setChannelInfo({
      name: channel.snippet.title,
      subscribers: `${channel.statistics.subscriberCount} Subscribers`,
      videos: `${channel.statistics.videoCount} Videos`,
      views: `${channel.statistics.viewCount} Views`,
      logo: logoUrl, // Set the logo from YouTube API
    });
  };

  // Fetch latest 6 videos
  const fetchVideoItems = async () => {
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=${channelId}&order=date&maxResults=6&key=${apiYoutubeKey}`
    );
    const data = await videoResponse.json();
    const videos = data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      duration: "N/A", // You can fetch duration separately if needed
      views: Math.floor(Math.random() * 50) + 10, // Placeholder for views
    }));
    setVideoItems(videos);
  };

  // Fetch channel info and videos on mount
  useEffect(() => {
    fetchChannelInfo();
    fetchVideoItems();
  }, []);

  return (
    <Box
      w={"100%"}
      pb={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
      bg="white"
    >
      <Box maxW="1200px" w={"92%"} mx={"auto"}>
        {/* Section Header */}
        <VStack spacing={4} mb={12} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontFamily="Poppins, sans-serif"
            fontWeight="bold"
          >
            Our{" "}
            <Text as="span" color="#F49040">
              Success Stories
            </Text>
          </Heading>
          <Text
            color="#A2ABAA"
            fontSize={{ base: "16px", sm: "18px", lg: "20px" }}
            fontWeight={"400"}
            maxW={{ base: "92%", sm: "85%", md: "75%" }}
            mx="auto"
            lineHeight="short"
            letterSpacing="0.2px"
            textAlign="center"
          >
            Create, Connect, Concentrate
          </Text>
        </VStack>

        {/* Channel Banner */}
        <Box
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="lg"
          overflow="hidden"
          mb={{ base: "24px", sm: "36px", md: "42px", lg: "56px" }}
          transition="all 0.3s ease"
          _hover={{
            shadow: "md",
          }}
        >
          <Flex p={6} alignItems="center" justifyContent="space-between">
            <HStack spacing={4}>
              <Box
                width="40px"
                height="40px"
                borderRadius="md"
                overflow="hidden"
              >
                <Image
                  src={channelInfo.logo}
                  fallbackSrc={logoImg}
                  alt="Channel Logo"
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </Box>

              <VStack alignItems="flex-start" spacing={0}>
                <Heading
                  as="h3"
                  fontSize={{
                    base: "14px",
                    sm: "18px",
                    md: "20px",
                    lg: "24px",
                  }}
                  fontWeight="bold"
                  color="#0D0D0D"
                >
                  {channelInfo.name}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {channelInfo.subscribers} • {channelInfo.videos} •{" "}
                  {channelInfo.views}
                </Text>
              </VStack>
            </HStack>

            <Button
              as="a"
              href={`https://www.youtube.com/channel/${channelId}`}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="red"
              size="md"
              leftIcon={<Icon as={FaYoutube} />}
              borderRadius="full"
              _hover={{
                color: "white",
                bg: "#C20000",
              }}
            >
              Subscribe
            </Button>
          </Flex>
        </Box>

        {/* Video Grid */}
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ base: 6, md: 8 }}
          mt={8}
        >
          {videoItems.map((video) => (
            <Box
              key={video.id}
              borderRadius="12px"
              border="1px solid #CED4D3"
              overflow="hidden"
              position="relative"
              transition="all 0.3s ease"
              bg="white"
              w={{ base: "92%", sm: "100%" }}
              mx={"auto"}
              _hover={{
                transform: "translateY(-4px)",
                shadow: "md",
              }}
            >
              {/* Video Thumbnail */}
              <AspectRatio ratio={16 / 9}>
                <Box position="relative" backgroundColor="gray.200">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    borderRadius="12px"
                    loading="lazy"
                  />

                  {/* Play Button Overlay */}
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="rgba(0, 0, 0, 0.2)"
                    transition="all 0.3s ease"
                    _hover={{
                      bg: "rgba(0, 0, 0, 0.4)",
                    }}
                    cursor="pointer"
                    as="a"
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Box
                      bg="rgba(0, 0, 0, 0.6)"
                      borderRadius="full"
                      p={{ base: "12px", md: "16px" }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      boxShadow="0 0 20px rgba(0,0,0,0.4)"
                      transition="all 0.3s ease"
                      fontSize={{
                        base: "14px",
                        sm: "16px",
                        md: "18px",
                        lg: "22px",
                      }}
                      _hover={{
                        transform: "scale(1.1)",
                        bg: "rgba(255, 0, 0, 0.7)",
                      }}
                    >
                      <Icon as={FaPlay} color="white" w={6} h={6} />
                    </Box>
                  </Box>

                  {/* Duration Badge */}
                  <Box
                    position="absolute"
                    bottom="10px"
                    right="10px"
                    bg="rgba(0, 0, 0, 0.7)"
                    color="white"
                    fontSize="xs"
                    fontWeight="bold"
                    py={1}
                    px={2}
                    borderRadius="4px"
                  >
                    {video.duration}
                  </Box>
                </Box>
              </AspectRatio>

              {/* Video Title */}
              <Box py={3} px={4}>
                <Text
                  fontWeight="bold"
                  fontSize="md"
                  lineHeight="1.4"
                  noOfLines={2}
                  title={video.title}
                  fontFamily="Poppins"
                  _hover={{ color: "#F49040" }}
                  transition="color 0.2s ease"
                >
                  {video.title}
                </Text>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Off The School • {video.views}K views
                </Text>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SuccessStories;
