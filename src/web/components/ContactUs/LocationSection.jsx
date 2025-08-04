import { Box, Flex, Heading, Text, Stack } from "@chakra-ui/react";

export default function LocationSection({ firstSection, locationName, data }) {
  const locationArr = data;


  const dataElements = locationArr.map((item, index) => (
    <Flex
      key={index}
      flex="1"
      w={{ base: "100%", md: "auto" }}
      borderRadius="md"
      align="center"
      direction={{ base: "row", sm: "column" }}
      justify={{ base: "left", md: "center" }}
      textAlign={{ base: "left", sm: "center" }}
      gap={4}
      h={"auto"}
    >
      <Box
        minW={{ base: "36px", sm: "42px", md: "64px" }}
        w={{ base: "36px", sm: "54px", md: "86px" }}
        h={{ base: "36px", sm: "54px", md: "86px" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {item.image}
      </Box>
      <Stack spacing={1} w={"auto"}>
        <Text
          fontWeight="bold"
          fontSize={{ base: "16px", sm: "18px", md: "24px" }}
          color="#1F6A75"
          as="span"
          fontFamily={"emoji"}
        >
          {item.title}
        </Text>
        <Text
          color="#0D0D0D"
          fontSize={{ base: "12px", sm: "14px", md: "16px" }}
          as="span"
          fontFamily={"emoji"}
        >
          {item.text}
        </Text>
      </Stack>
    </Flex>
  ));
  return (
    <Box width="100%" bg="white">
      <Box
        maxW="1436px"
        width="92%"
        direction={"column"}
        align="center"
        justify="center"
        paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
        paddingX={{ base: 0, md: "36px" }}
        mx={"auto"}
      >
        <Heading
          fontSize={{ base: "24px", sm: "28px", md: "36px" }}
          color="#FFFFFF"
          bg="#0f4446"
          py={{ base: "6px", sm: "8px", md: "12px" }}
          borderRadius={"full"}
          fontWeight="700"
          textAlign={{ base: "center" }}
          mb={{ base: "42px", sm: "54px", md: "64px", lg: "86px" }}
        >
          {locationName}
        </Heading>

        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align="center"
          flexWrap="wrap"
          gap={{ base: "8px", sm: "12px" }}
        >
          {dataElements}
        </Flex>
      </Box>
    </Box>
  );
}
