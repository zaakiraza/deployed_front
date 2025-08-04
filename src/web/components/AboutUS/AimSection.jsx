import {
  Box,
  Text,
  Heading,
  Image,
  Flex,
  Stack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import aim1 from "../../../assets/aim1.png";
import aim2 from "../../../assets/aim2.png";
import aim3 from "../../../assets/aim3.png";
import aim4 from "../../../assets/aim4.png";
import aim5 from "../../../assets/aim5.png";

export default function AimSection() {
  return (
    <Box maxW="1436px" width="92%">
      <Flex
        mx={"auto"}
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-evenly"
        paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
        gap={{ base:"36px", md: "24px", lg: "36px" }}
        flexWrap="wrap"
      >
        {/* Grid Container */}
        <Box
          maxW="500px"
          bg="white"
          p={1}
          borderRadius="12px"
          boxShadow="2xl"
          width={{ base: "90%", md: "50%", lg: "90%" }}
        >
          <Grid
            templateColumns="repeat(3, 1fr)"
            templateRows="auto auto"
            gap={1}
          >
            {/* Large image - top left, spans 2 columns */}
            <GridItem colSpan={2}>
              <Image
                src={aim1}
                borderRadius="8px"
                objectFit="cover"
                w="100%"
                h="150px"
              />
            </GridItem>

            {/* Single image - top right */}
            <GridItem>
              <Image
                src={aim2}
                borderRadius="8px"
                objectFit="cover"
                w="100%"
                h="150px"
              />
            </GridItem>

            {/* Bottom row - 3 equal images */}
            <GridItem>
              <Image
                src={aim4}
                borderRadius="8px"
                objectFit="cover"
                w="100%"
                h="150px"
              />
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Image
                src={aim3}
                borderRadius="8px"
                objectFit="cover"
                w="100%"
                h="150px"
              />
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 3 }}>
              <Image
                src={aim5}
                borderRadius="8px"
                objectFit="cover"
                w="100%"
                h="150px"
              />
            </GridItem>
          </Grid>
        </Box>

        {/* Text Section */}
        <Stack
          flex={1}
          maxW="720px"
          width="100%"
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading
            fontSize={{ base: "28px", sm: "36px", lg: "42px" }}
            color="#F49040"
            fontWeight="700"
            mb={{ base: "14px", sm: "18px", md: "24px", lg: "28px" }}
          >
            What We Aim To Be
          </Heading>
          <Text
            fontSize={{ base: "16px", sm: "18px", lg: "20px" }}
            fontWeight={"400"}
            color="#FFFFFF"
          >
            We aspire to reach millions, covering every city, town, and village.
            We firmly believe everyone should have a chance at education, and we
            will do our part to make our dream a reality.
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}
