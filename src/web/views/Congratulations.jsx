import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BOX from "./BOX";


const MotionBox = motion.create(Box);

const Checkmark = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="72"
    height="72"
    initial={{ strokeDasharray: "24", strokeDashoffset: "24", opacity: 0 }}
    animate={{ strokeDashoffset: "0", opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
  >
    <g transform="scale(-1, 1) translate(-24, 0)">
      <circle cx="12" cy="12" r="10" stroke="white" fill="none" />
    </g>
    <polyline points="8 12 11 15 16 9" stroke="white" />
  </motion.svg>
);

const Congratulations = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { message, route } = location.state || {};

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 800);

    const redirectTimer = setTimeout(() => {
      navigate(`/${route}`); // ⬅️ Redirect after 3 seconds
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <BOX>
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
    >
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        borderRadius="12px"
        boxShadow="2xl"
        maxW={{ base: "75%", md: "85%", lg: "100%" }}
        width="328px"
        bgGradient="linear(to-br, #FFFFFF00 0%, #FFFFFF20 100%)"
        border="1px solid #FFFFFF35"
        backdropFilter="blur(24px)"
        p={4}
      >
        <Box my={8} display="flex" justifyContent="center" alignItems="center">
          <Checkmark />
        </Box>

        <Text
          fontSize={{ base: "24px", sm: "26px", md: "28px" }}
          fontWeight="600"
          textAlign="center"
          fontFamily="Poppins"
          color="#ffffff"
          mb={2}
        >
          Congratulations!
        </Text>

        <Text
          fontSize={{ base: "14px", sm: "14px", md: "16px" }}
          fontWeight="300"
          textAlign="center"
          fontFamily="Poppins"
          color="#ffffff"
          mb={6}
        >
          {/* {message || "You have successfully completed the task!"} */}
          {message}
        </Text>
      </MotionBox>
    </Box>

    </BOX>
  );
};

export default Congratulations;
