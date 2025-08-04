import React from "react";
import { Box, Flex, Heading, Text, Image, Stack } from "@chakra-ui/react";
import HeroSection2 from "./HeroSection2";
import LocationSection from "./LocationSection";
import ContactFormSection from "./ContactFormSection";
import Footer from "../landingpage/Footer";
import BOX from "../../views/BOX";
import map_icon from "../../../assets/map_icon.svg";
import phone_icon from "../../../assets/phone icon.svg";
import mail_icon from "../../../assets/mail_icon.svg";
import ScrollToTopButton from "../ScrollToTopButton";

function ContactUs() {
  const edTechArr = [
    {
      image: (
            <Image
        src={map_icon}

        boxSize="100%"
        objectFit="contain"
        alt="Location"
      />
      ),
      title: "Location",
      text: "Office # 302, 3rd Floor, Plot 9C, Sehar Lane 9, Sehar Commercial, DHA Phase 7, Karachi, Pakistan.",
    },
    {
      image: (
      <Image
        src={phone_icon}
        boxSize="100%"
        objectFit="contain"
        alt="Phone"
      />       
      ),
      title: "Phone",
      text: "+92 325 0687687",
    },
    {
      image: (
        <Image
        src={mail_icon}
        boxSize="100%"
        objectFit="contain"
        alt="Email"
      />
      ),
      title: "Email",
      text: "support@offtheschool.io",
    },
  ];

  const schoolCampusArr = [
    {
      image: (
              <Image
        src={map_icon}
        boxSize="100%"
        objectFit="contain"
        alt="Location"
      />
      ),
      title: "Location",
      text: "Opposite Baghdadi Masjid, D/1 Martin Quarters, Near Jail Road Karachi, Sindh, Pakistan.",
    },
    {
      image: (
        <Image
        src={phone_icon}
        boxSize="100%"
        objectFit="contain"
        alt="Phone"
      />
      ),
      title: "Phone",
      text: "+92 301 0687687\n+92 307 0687687\n(021) 34124797"
        .split("\n")
        .map((line, index) => {
          return (
            <Text key={index} fontSize="sm">
              {line}
            </Text>
          );
        }),
    },
    {
      image: (
        <Image
        src={mail_icon}
        boxSize="100%"
        objectFit="contain"
        alt="Email"
      />
      ),
      title: "Email",
      text: "info@offtheschool.io",
    },
  ];
  return (
    <BOX>
      <HeroSection2>
        Get In{" "}
        <Text
          as="span"
          bg="#F49040"
          display="inline-block"
          paddingY={{ base: "4px", sm: "8px", md: "10px" }}
          paddingX={{ base: "8px", sm: "12px", md: "16px" }}
          mr={{ base: "4px", sm: "8px", md: "12px" }}
        >
          Touch
        </Text>
      </HeroSection2>
      <LocationSection
        firstSection={true}
        locationName="Ed Tech Office"
        data={edTechArr}
      />
      <ContactFormSection />
      <LocationSection
        firstSection={false}
        locationName="School Campus"
        data={schoolCampusArr}
      />
      <Footer />
      <ScrollToTopButton />

    </BOX>
  );
}

export default ContactUs;
