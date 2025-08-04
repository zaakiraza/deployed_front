import React from "react";
import { Box, Flex, Heading, Text, Image, Stack } from "@chakra-ui/react";
// import HeroSection2 from '../ContactUS/HeroSection2'
import HeroSection2 from "../ContactUs/HeroSection2";
import HistorySection from "./HistorySection";
import AimSection from "./AimSection";
import ProgressSection from "./ProgressSection";
import CampusTourSection from "./CampusTourSection";
import FeedbackSection from "./Feedback/FeedbackSection";
import LetsStartWithOTS from "../landingpage/Let's-Start-With-OTS";
import Footer from "../landingpage/Footer";
import BOX from "../../views/BOX";
import ScrollToTopButton from "../ScrollToTopButton";

function AboutUs() {
  return (
    <BOX>
      <HeroSection2>
        <Text
          as="span"
          bg="#F49040"
          display="inline-block"
          paddingY={{ base: "4px", sm: "8px", md: "10px" }}
          paddingX={{ base: "8px", sm: "12px", md: "16px" }}
          mr={{ base: "4px", sm: "8px", md: "12px" }}
        >
          About
        </Text>
        Us
      </HeroSection2>
      <HistorySection />
      <AimSection />
      <ProgressSection />
      <CampusTourSection />
      <FeedbackSection />
      <Footer />
      <ScrollToTopButton />
    </BOX>
  );
}

export default AboutUs;
