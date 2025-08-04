import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import ForgotPasswordEmail from "./ForgotPasswordEmail";
import ForgotPasswordOTP from "./ForgotPasswordOTP";
import ResetPassword from "./ResetPassword";
import { useWebUserContext } from "../../context/WebUserContext";
import BOX from "../../views/BOX";

function ForgotPasswordJourney() {
  const { userEmail, resetotp } = useWebUserContext();

  return (
    <BOX>
    <Box

      width="100vw"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
     
      <Flex
        flex="2"
        width="100%"
        // justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        
        
        {/* Conditional Rendering based on userEmail and otp */}
        {userEmail === "" && resetotp === "" && <ForgotPasswordEmail />}
        {userEmail !== "" && resetotp === "" && <ForgotPasswordOTP />}
        {userEmail !== "" && resetotp !== "" && <ResetPassword />}
      </Flex>
    </Box>

    </BOX>
  );
}

export default ForgotPasswordJourney;
