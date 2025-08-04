import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import dashboardtitle from "../../../assets/dashboardtitle.svg";

function DashboardTitle() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userdata = {
    userName: userInfo?.firstName || userInfo?.email.split("@")[0] || "User",
    courseCompletion: userInfo?.courseCompletion || "0%",
  };

  const handleProfileClick = () => {
    navigate('/dashboard/profile');
  };

  const headingFontSize = useBreakpointValue({
    base: "24px",
    sm: "28px",
    md: "36px",
  });
  const paragraphFontSize = useBreakpointValue({
    base: "14px",
    sm: "16px",
    md: "20px",
  });

  return (
    <Flex
      mt={{ base: "36px", sm: "48px", md: "64px" }}
      maxW={{ base: "75%", md: "85%" }}
      width="952px"
      mx={"auto"}
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      p={{ base: "24px", sm: "36px", md: "48px" }}
      gap={{ base: "12px", sm: "18px", md: "24px" }}
      borderRadius="24px"
      align="center"
      justify="space-between"
      bg="transparent"
      fontFamily="'Poppins', sans-serif"
      flexWrap="wrap"
      boxShadow="2xl"
      bgGradient="linear(to-br, rgba(0, 82, 89, 1) 0%, rgba(255, 255, 255, 0.71) 100%)"
      border="1px solid #FFFFFF35"
      backdropFilter="blur(24px)"
    >
      {/* Left half: text */}
      <Box
        flex="1"
        textAlign={{ base: "center", md: "left" }}
        mr={{ base: 0, md: "36px" }}
      >
        <Heading
          as="h1"
          fontSize={headingFontSize}
          color="#f49040"
          gap={0}
          fontWeight="700"
          mb={{ base: 3, md: 4 }}
          display="flex"
          alignItems="end"
        >
          Welcome Back {userdata.userName}!
          <IconButton
            // position={"relative"}
            // left={"-50%"}
            aria-label="Edit profile"
            icon={<EditIcon />}
            size="sm"
            variant="ghost"
            colorScheme="#da8139"
            ml={2}
            onClick={handleProfileClick}
            _hover={{ bg: "rgba(244, 144, 64, 0.2)" }}
          />
        </Heading>
        <Text
          fontSize={paragraphFontSize}
          lineHeight="1.4"
          color="white"
          fontWeight="300"
          mb={{ base: 3, md: 0 }}
        >
          You’ve learned{" "}
          <Text as="span" fontWeight="600">
            {userdata.courseCompletion}
          </Text>{" "}
          of your goal this week!{" "}
          <Text as="span" fontWeight="600">
            Keep
          </Text>{" "}
          it up and improve your results!
        </Text>
      </Box>

      {/* Right half: enlarged image */}
      <Box
        flex="1"
        minW={{ base: "100%", md: "50%" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={dashboardtitle}
          alt="Dashboard Title"
          maxW={{ base: "80%", md: "400px" }}
          objectFit="contain"
        />
      </Box>
    </Flex>
  );
}

export default DashboardTitle;
