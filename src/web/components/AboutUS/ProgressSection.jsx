import { Box, Text, Heading, Flex, Stack, Image } from "@chakra-ui/react";
import progressImage from "../../../assets/progress.png";
export default function ProgressSection() {
  return (
    <Box width="100%" bg={"white"}>
      <Flex
        maxW="1436px"
        width="92%"
        mx={"auto"}
        // py={{ base: 10, md: 0 }}
        direction={{ base: "column", md: "row" }}
        textAlign={{ base: "center", md: "left" }}
        align="center"
        justify="center"
        paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
      >
        <Stack
          mr={{ base: 0, md: "36px", lg: "64px" }}
          mb={{ base: "36px", sm: "64px", md: "0px" }}
        >
          <Heading
            fontSize={{ base: "28px", sm: "36px", lg: "42px" }}
            color="#F49040"
            fontWeight="700"
            mb={{ base: "14px", sm: "18px", md: "24px", lg: "28px" }}
            marginLeft={{ base: 0, md: "36px" }}
          >
            Our Progress
          </Heading>
          <Text
            fontSize={{ base: "16px", sm: "18px", lg: "20px" }}
            fontWeight={"400"}
            color="#0D0D0D"
            marginLeft={{ base: 0, md: "36px" }}
          >
            OTS is now a professional and rapidly expanding organization. We
            have procured ample resources to keep our organization stable, and
            now, we are expanding with our EdTech program. Students from all
            over Karachi enroll in our on-campus classes while we connect with
            our online participants from across the world via our live classes
            and recorded lectures. We are thankful to our donors and supporters
            for the progress we have made so far. May Allah help us do more.
          </Text>
        </Stack>
        <Box bg={"white"} p={1}>
          <Image
            borderRadius={"12px"}
            src={progressImage}
            alt="Progress Image"
            minH={{ base: "200px", md: "500px" }}
            h="full"
            maxW={{ base: "100%", md: "300px", lg: "500px" }}
            w={"auto"}
            objectFit={"cover"}
          />
        </Box>
      </Flex>
    </Box>
  );
}
