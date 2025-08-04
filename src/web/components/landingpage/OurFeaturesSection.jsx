import React from "react";
import OurFeaturesImage from "../../../assets/OurFeaturesImage.svg";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Image,
  Grid,
  GridItem,
  Stack,
  Icon,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";

const OurFeaturesSection = () => {
  // Responsive values for layout
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const gap = useBreakpointValue({ base: 8, md: 12 });

  return (
    <Box w="full" overflow="hidden">
      {/* Our Features Section */}
      <Box
        position="relative"
        pt="16"
        pb={{base: "32", md: "40"}}
        px="4"
        bgGradient="linear(to-b, #1F6A75, #093635)"
        clipPath="polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)"
        color="white"
        overflow="visible"
      >
        <Container maxW="6xl" position="relative" zIndex="1">
          {/* Section Title */}
          <Flex direction="column" align="center" mb="12">
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              textAlign="center"
            >
              Our{" "}
              <Text as="span" color="#F49040">
                Features
              </Text>
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              textAlign="center"
              maxW="3xl"
              mt="4"
            >
              This very extraordinary feature, can make learning activities more efficient
            </Text>
          </Flex>

          {/* Main Content: Image + Feature List */}
          <Flex
            direction={flexDirection}
            gap={gap}
            align="center"
            mb="20"
          >
            {/* Left Side: Features Image */}
            <Box
              flex="2"
              position="relative"
              rounded="lg"
              overflow="hidden"
            >
              <Image
                src={OurFeaturesImage}
                alt="Our Features"
                objectFit="contain"
                w="full"
                maxH="600px"
              />
            </Box>            {/* Right Side: Feature List */}
            <Box flex="1">
              <Heading
                as="h3"
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                fontWeight="bold"
                mb="6"
                lineHeight="1.2"
              >
                A{" "}
                <Text as="span" color="#F49040">
                  User Interface
                </Text>{" "}
                designed for the classroom
              </Heading>

              <Stack spacing="8" mt="8">
                {/* Feature 1 */}
                <Flex align="center">
                  <Box
                    w={{ base: "30px", lg: "50px" }}
                    h={{ base: "20px", lg: "30px" }}
                    bg="#F49040"
                    rounded="full"
                    mr={{ base: "4", lg: "5" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      viewBox="0 0 24 24"
                      boxSize={{ base: 3, lg: 5 }}
                      color="white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </Icon>
                  </Box>
                  <Text fontSize={{ base: "md", lg: "lg" }} fontWeight="medium">
                    Teachers don't get lost in the grid view and have a dedicated Podium space.
                  </Text>
                </Flex>

                {/* Feature 2 */}
                <Flex align="center">
                  <Box
                    w={{ base: "30px", lg: "50px" }}
                    h={{ base: "20px", lg: "30px" }}
                    bg="#F49040"
                    rounded="full"
                    mr={{ base: "4", lg: "5" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      viewBox="0 0 24 24"
                      boxSize={{ base: 3, lg: 5 }}
                      color="white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </Icon>
                  </Box>
                  <Text fontSize={{ base: "md", lg: "lg" }} fontWeight="medium">
                    TA's and presenters can be moved to the front of the class.
                  </Text>
                </Flex>

                {/* Feature 3 */}
                <Flex align="center">
                  <Box
                    w={{ base: "30px", lg: "50px" }}
                    h={{ base: "20px", lg: "30px" }}
                    bg="#F49040"
                    rounded="full"
                    mr={{ base: "4", lg: "5" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      viewBox="0 0 24 24"
                      boxSize={{ base: 3, lg: 5 }}
                      color="white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </Icon>
                  </Box>
                  <Text fontSize={{ base: "md", lg: "lg" }} fontWeight="medium">
                    Teachers can easily see all students and class data at one time.
                  </Text>
                </Flex>
              </Stack>
            </Box>
          </Flex>

          {/* Circle Decoration */}          
          <Box
            position="absolute"
            bottom="-30px"
            right="5%"
            opacity="0.3"
            zIndex="0"
            display={{ base: "none", md: "block" }}
          >
            <Box w="60px" h="60px" bg="white" rounded="full" />
          </Box>
        </Container>  
      </Box>
    </Box>
  );
};

export default OurFeaturesSection;