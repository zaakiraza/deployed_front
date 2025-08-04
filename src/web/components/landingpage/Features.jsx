import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Image,
  Flex,
  VStack,
  Icon,
} from "@chakra-ui/react";
import qrCode from "../../../assets/Qr_Code.svg";
import { FiArrowRight } from "react-icons/fi";
import appstore from "../../../assets/appstore.svg";
import googlePlay from "../../../assets/GooglePlay.svg";

// Import new feature images
// Note: You'll need to copy these files from c:\Users\HP\Downloads\ to c:\Users\HP\Desktop\OTS\ots-frontend\src\assets\features\
import dashedLine from "../../../assets/features/dashedline.png";
import mobileMockup1 from "../../../assets/features/mobilemockup1.png";
import mobileMockup2 from "../../../assets/features/mobilemockup2.png";
import mobileMockup3 from "../../../assets/features/mobilemockup3.png";
import mobileMockup1Card from "../../../assets/features/mobilemockup1card.png";
import mobileMockup2Card from "../../../assets/features/mobilemockup2card.png";
import mobileMockup3Card from "../../../assets/features/mobilemockup3card.png";

const Features = () => {
  return (
    <Box
      bg="#1F6A75"
      color="white"
      py={8}
      w="100%"
      position="relative"
      overflow="hidden"
    >
      {/* Orange circular accents - positioned exactly as in the image */}
      <Box
        position="absolute"
        top="15%"
        right="3%"
        width="120px"
        height="120px"
        borderRadius="full"
        bg="#F49040"
        opacity="0.7"
        zIndex="0"
      />
      <Box
        position="absolute"
        top="35%"
        left="-2%"
        width="90px"
        height="90px"
        borderRadius="full"
        bg="#F49040"
        opacity="0.7"
        zIndex="0"
      />
      <Box
        position="absolute"
        bottom="30%"
        right="5%"
        width="120px"
        height="120px"
        borderRadius="full"
        bg="#F49040"
        opacity="0.7"
        zIndex="0"
      />
      <Box
        position="absolute"
        bottom="10%"
        right="20%"
        width="100px"
        height="100px"
        borderRadius="full"
        bg="#F49040"
        opacity="0.7"
        zIndex="0"
      />
      <Container
        maxW="container.xl"
        px={{ base: 4, md: 8 }}
        position="relative"
        zIndex="1"
      >
        {/* Our Features Section */}
        <Box textAlign="center" mb={12} mt={4}>
          <Heading
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="600"
            mb={5}
            color="white"
          >
            Our{" "}
            <Text as="span" color="#F49040" display="inline">
              Features
            </Text>
          </Heading>
          <Text
            fontSize={{ base: "md", md: "xl" }}
            maxW="3xl"
            mx="auto"
            fontWeight="300"
          >
            This very extraordinary feature, can make learning activities more
            efficient
          </Text>
        </Box>

        {/* Classes Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          mb={{ base: 16, md: 24 }}
          position="relative"
        >
          <Box maxW={{ base: "100%", md: "40%" }} pl={4}>
            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="700"
              color="#F49040"
              mb={6}
            >
              Classes
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              mb={4}
              fontWeight="400"
              maxW="md"
            >
              Off The School has got more than 100k positive ratings from our
              users around the world.
            </Text>
          </Box>

          {/* Right side mockup - positioned exactly as in the image */}
          <Box
            position="relative"
            w={{ base: "100%", md: "55%" }}
            maxW="600px"
            mt={{ base: 8, md: 0 }}
            right={{ base: 0, md: "-5%" }}
          >
            <Box position="relative" display="flex" justifyContent="flex-end">
              <Image
                src={mobileMockup1}
                alt="Classes interface"
                w={{ base: "100%", md: "85%" }}
                maxW="400px"
                zIndex={2}
                position="relative"
              />
              <Box
                position="absolute"
                top="35%"
                right="20%"
                zIndex={3}
              >
                <Image
                  src={mobileMockup1Card}
                  alt="Classes Card"
                  width="250px"
                  boxShadow="lg"
                  borderRadius="xl"
                />
              </Box>
            </Box>
          </Box>
          {/* Removed dashed line */}
        </Flex>

        {/* Chapters Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          mb={{ base: 16, md: 24 }}
          position="relative"
        >
          <Box display={{ base: "block", md: "none" }} w="100%" mb={8}>
            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="700"
              color="#F49040"
              mb={4}
            >
              Chapters
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} mb={4}>
              Off The School has got more than 100k positive ratings from our
              users around the world.
            </Text>
          </Box>

          {/* Left side mockup exactly as in the image */}
          <Box
            position="relative"
            w={{ base: "100%", md: "45%" }}
            maxW="500px"
            order={{ base: 2, md: 1 }}
            mt={{ base: 8, md: 0 }}
            ml={{ md: "-2%" }}
          >
            <Box position="relative">
              <Box position="relative" zIndex={2} display="flex" justifyContent="flex-start">
                <Image
                  src={mobileMockup2}
                  alt="Chapters interface"
                  w={{ base: "100%", md: "85%" }}
                  maxW="400px"
                />
              </Box>
              <Box
                position="absolute"
                top="15%"
                left="15%"
                zIndex={3}
              >
                <Image
                  src={mobileMockup2Card}
                  alt="Chapters Card"
                  width="230px"
                  boxShadow="lg"
                  borderRadius="xl"
                />
              </Box>
            </Box>
          </Box>

          {/* Right side text - hidden on mobile, shown on desktop */}
          <Box
            maxW={{ base: "100%", md: "40%" }}
            textAlign={{ base: "center", md: "right" }}
            display={{ base: "none", md: "block" }}
            order={{ base: 1, md: 2 }}
            pr={4}
          >
            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="700"
              color="#F49040"
              mb={6}
            >
              Chapters
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} mb={4} fontWeight="400">
              Off The School has got more than 100k positive ratings from our
              users around the world.
            </Text>
          </Box>

          {/* Removed dashed line */}
        </Flex>

        {/* Lesson Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="flex-start"
          justify="space-between"
          position="relative"
          mb={{ base: 16, md: 24 }}
          mt={8}
        >
          <Box maxW={{ base: "100%", md: "40%" }} pl={4}>
            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="700"
              color="#F49040"
              mb={6}
            >
              Lesson
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              mb={8}
              fontWeight="400"
              maxW="md"
            >
              Off The School has got more than 100k positive ratings from our
              users around the world.
            </Text>

            {/* App download button - styled to match image */}
            <Button
              rightIcon={<Icon as={FiArrowRight} boxSize={5} />}
              bg="#F49040"
              color="white"
              px={8}
              py={6}
              borderRadius="full"
              _hover={{ bg: "#e07d30" }}
              fontSize="lg"
              fontWeight="600"
              mb={8}
              boxShadow="md"
            >
              Get Our App
            </Button>
          </Box>

          {/* Right side mockup with card exactly as shown in image */}
          <Box
            position="relative"
            w={{ base: "100%", md: "55%" }}
            maxW="600px"
            mt={{ base: 8, md: 0 }}
            right={{ md: "-3%" }}
          >
            <Box position="relative" display="flex" justifyContent="flex-end">
              <Image
                src={mobileMockup3}
                alt="Lesson interface"
                w={{ base: "100%", md: "85%" }}
                maxW="400px"
                zIndex={2}
              />
              <Box
                position="absolute"
                top="40%"
                right="20%"
                zIndex={3}
              >
                <Image
                  src={mobileMockup3Card}
                  alt="Lesson Card"
                  width="300px"
                  boxShadow="lg"
                  borderRadius="xl"
                />
              </Box>
            </Box>
          </Box>
        </Flex>

        {/* QR Code and Arrow Section - positioned to match image exactly */}
        <Box
          position="relative"
          mt={20}
          mb={16}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="700"
            color="#F49040"
            mb={8}
            textAlign="center"
          >
            Get Our App
          </Heading>
          {/* Left arrow pointing to QR code */}
          <Box position="absolute" top="-60px" left="30%" zIndex={2}>
            <Box
              as="svg"
              width="120px"
              height="100px"
              viewBox="0 0 120 100"
              fill="none"
            >
              <path
                d="M10,50 Q65,10 120,50"
                stroke="#F49040"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M100,35 L120,50 L100,65"
                stroke="#F49040"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Box>
          </Box>
          
          {/* Right arrow pointing to QR code */}
          <Box position="absolute" top="-60px" right="30%" zIndex={2}>
            <Box
              as="svg"
              width="120px"
              height="100px"
              viewBox="0 0 120 100"
              fill="none"
            >
              <path
                d="M10,50 Q65,10 120,50"
                stroke="#F49040"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M100,35 L120,50 L100,65"
                stroke="#F49040"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Box>
          </Box>

          {/* QR Code - styled exactly like image */}
          <Box
            width="180px"
            height="180px"
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="md"
            zIndex={3}
          >
            <Image
              src={qrCode}
              alt="QR Code to download app"
              w="100%"
              h="100%"
            />
          </Box>
          
          {/* Store buttons */}
          <Flex mt={6} gap={4} justifyContent="center" zIndex={3}>
            <Image src={appstore} alt="App Store" height="40px" />
            <Image src={googlePlay} alt="Google Play" height="40px" />
          </Flex>

          {/* Removed dashed line */}
        </Box>
      </Container>

      {/* Bottom wave shape - exact curve as in image */}
      <Box position="relative" height="150px" mt={8} overflow="hidden">
        <Box
          position="absolute"
          bottom="-120px"
          left="-10%"
          right="-10%"
          height="300px"
          borderTopLeftRadius="50% 80%"
          borderTopRightRadius="50% 80%"
          bg="white"
        />
      </Box>
    </Box>
  );
};

export default Features;
