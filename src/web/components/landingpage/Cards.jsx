import React from "react";
import {
  Box,
  Center,
  Icon,
  Heading,
  Text,
  VStack,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { BookOpen, Calendar, CheckCircle } from "lucide-react";

export default function FeaturedCourses() {
  return (
    <Box
      w={"100%"}
      paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
      color="white"
      position="relative"
      backgroundImage="linear-gradient(to right, #1F6A75, #093635)"
    >
      <Box maxW="1200px" w={"85%"} mx={"auto"}>
        {/* V-shaped Top design */}
        <Box
          position="absolute"
          top="-1px"
          left="0"
          right="0"
          height={{ base: "50px", sm: "70px", md: "100px", lg: "150px" }}
          width="100%"
          overflow="hidden"
          lineHeight="0"
          zIndex={1}
        >
          <Box
            as="svg"
            viewBox="0 0 1440 150"
            preserveAspectRatio="none"
            position="absolute"
            width="100%"
            height={{ base: "50px", sm: "70px", md: "100px", lg: "150px" }}
            transform="rotate(180deg)" // flip vertically
          >
            <Box as="path" d="M0 0L720 150L1440 0V150H0Z" fill="white" />
          </Box>
        </Box>

        {/* Header Section */}
        <Box
          textAlign="center"
          my={{ base: "24px", sm: "36px", md: "42px", lg: "56px" }}
        >
          <Heading
            as="h1"
            fontSize={{ base: "28px", sm: "36px", lg: "42px" }}
            fontWeight="700"
            mb={{ base: "8px", sm: "12px", md: "18px", lg: "24px" }}
            color={"white"}
          >
            All-In-One{" "}
            <Text as="span" color="#F49040">
              ED-Tech Software.
            </Text>
          </Heading>

          <Text
            color="#CED4D3"
            fontSize={{ base: "16px", sm: "18px", lg: "20px" }}
            fontWeight={"400"}
            maxW={{ base: "92%", sm: "85%", md: "75%" }}
            mx="auto"
            lineHeight="short"
            letterSpacing="0.2px"
            textAlign="center"
          >
            Off The School (OTS) Is A Not-For-Profit Institution And Online
            Platform Dedicated To Bridging The Socio-Economic Gap By Offering
            Accessible Formal And Skills-Based Education To All Individuals.
          </Text>
        </Box>

        {/* Feature Cards */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: "8px", sm: "12px", md: "18px", lg: "24px" }}
          mt={{ base: "36px", sm: "42px", md: "54px", lg: "64px" }}
          mx="auto"
          justifyContent="center"
        >
          {/* Card 1 */}

          <Box pt={"64px"} pb={"24px"} position="relative" zIndex={1} mx="auto">
            <FeatureCard
              icon={BookOpen}
              title="Seamless Online Lessons"
              description="Easily manage & deliver interactive online lessons with a secure & user-friendly platform. Customize lesson plans & resources to fit your needs."
            />
          </Box>

          {/* Card 2 */}
          <Box pt={"64px"} pb={"24px"} position="relative" zIndex={1} mx="auto">
            <FeatureCard
              icon={Calendar}
              title="Effortless Scheduling"
              description="Plan & organize lessons across multiple time slots & locations with ease. Streamline your workflow with an intuitive scheduling system."
            />
          </Box>

          {/* Card 3 */}
          <Box pt={"64px"} pb={"24px"} position="relative" zIndex={1} mx="auto">
            <FeatureCard
              icon={CheckCircle}
              title="Smart Progress Analysis"
              description="Track student performance with insightful analytics. Gain valuable insights to help improve learning outcomes and engagement."
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

// Feature Card Component
// function FeatureCard({
//   icon,
//   title,
//   description,
//   iconColor = "white",
//   iconBg = "teal.200",
//   bgGradient="linear(to-br, rgba(255, 255, 255, 0.13) 10%, rgba(217, 255, 255, 0.56) 90%)",
//   isActiveCard = false,
//   hoverGradient= "linear(to-br, rgb(168, 255, 248), rgb(0, 158, 145)90%)"
// }) {
//   const [isHovered, setIsHovered] = React.useState(false);

//   return (
//   <Box
//       position="relative"
//       flex="1"
//       minW={{ base: "100%", md: "30%" }}
//       textAlign="center"
//       borderRadius="lg"
//       pt={20}
//       pb={8}
//       px={4}
//       overflow="hidden"
//       backdropFilter="blur(90px)"
//       boxShadow="1px 1px 3px rgb(255, 255, 255)"
//       cursor="pointer"
//       transition="transform 0.7s ease"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       _hover={{
//         transform: "translateY(-6px)"
//       }}
//     >      {/* Background Gradient */}      <Box
//         position="absolute"
//         top="0"
//         left="0"
//         right="0"
//         bottom="0"
//         bgGradient={isHovered ? hoverGradient : bgGradient}
//         borderRadius="lg"
//         opacity="0.95"
//         style={{ transition: "background-image 0.7s ease" }}
//         className="background-gradient"
//       />

//       {/* Content Container */}
//       <Box
//         position="relative"
//         zIndex="1"
//         p={8}
//       >        {/* Icon Circle */}        <Flex
//           position="relative"
//           mx="auto"
//           mb={6}
//           w="80px"
//           h="80px"
//           borderRadius="full"
//           bg={isHovered ? "#1F6A75" : iconBg}
//           justifyContent="center"
//           alignItems="center"
//           boxShadow="0 0 15px rgba(255, 255, 255, 0)"
//           style={{ transition: "background-color 0.7s ease" }}
//           className="icon-circle"
//         >
//           <Icon as={icon} w={8} h={8} color={iconColor} />
//         </Flex>
//           {/* Text Content */}
//         <Box>
//           <Heading as="h3" fontSize="2xl" fontWeight="bold" color={isHovered ? "rgb(0, 73, 78)" : "white"} mb={4}
//             transition="color 0.7s ease">
//             {title}
//           </Heading>

//           <Text color={isHovered ? "white" : "whiteAlpha.900"} fontSize="md"
//             transition="color 0.7s ease">
//             {description}
//           </Text>
//         </Box>
//       </Box>
//     </Box>

//   );
// }

function FeatureCard({ icon, title, description }) {
  return (
    <Box
    role="group"
      backgroundImage="linear-gradient(to right, #1F6A75, #093635)"
      border="2px solid #FFFFFF50"
      backdropFilter="blur(24px)"
      borderRadius="16px"
      p={{ base: "8px", sm: "12px", md: "18px", lg: "24px" }}
      h={{ base: "100%", sm: "90%", md: "92%", lg: "92%" }}
      minH="200px"
      w="100%"
      maxW="512px"
      position="relative"
      transition="all 0.3s ease"
      boxShadow="xl"
      _hover={{
        transform: "translateY(-12px)",
        boxShadow: "2xl",
        bgGradient:
          "linear(to-br, rgba(255, 134, 35, 0.5), rgba(244, 144, 64, 0.2))",  
        border: "2px solid rgba(255, 134, 35, 0.5)",
      }}
      sx={{
        filter: "drop-shadow(0px 10px 60px rgba(38, 45, 118, 0.08))",
        "&:hover": {
          filter: "drop-shadow(0px 10px 60px rgba(38, 45, 118, 0.12))",
        },
      }}
    >
      {/* Icon Circle */}
      <Center
        position="absolute"
        top="-60px"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "92px", sm: "136px", md: "112px", lg: "136px" }}
        h={{ base: "92px", sm: "136px", md: "112px", lg: "136px" }}
        borderRadius="full"
        bg="white"
        boxShadow="0 0 0 12px rgba(255, 255, 255, 0.5)"
        zIndex={2}
        color="#F49040"
        _groupHover={{
          bg: "#F49040",
          boxShadow: "0 0 0 12px #F4904050",
          color: "white",
        }}
      >
        <Icon as={icon} w="60px" h="60px"  />
      </Center>

      {/* Content */}
      <VStack
        spacing={{ base: "8px", sm: "12px", md: "18px", lg: "24px" }}
        py={{ base: "48px", sm: "86px", md: "64px", lg: "86px" }}
        textAlign="center"
      >
        <Heading
          as="h3"
          fontSize={{ base: "24px", sm: "28px", md: "28px", lg: "32px" }}
          fontWeight="700"
          fontFamily="Poppins"
          color="#F49040"
          _groupHover={{
          color:  "#FFFFFF",
        }}
        >
          {title}
        </Heading>
        <Text
          color="white"
          lineHeight="1.5"
          fontFamily="Poppins"
          fontSize={{ base: "14px", sm: "16px", lg: "18px" }}
          fontWeight={"400"}
          letterSpacing="0.2px"
          // px={4}
        >
          {description}
        </Text>
      </VStack>
    </Box>
  );
}
