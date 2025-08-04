import React, { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Link,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Image,
  HStack,
  VStack,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import axios from "axios";
import { FiTwitter } from "react-icons/fi";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

// Import assets
import Logo from "../../../assets/Logo.svg";
import GooglePlay from "../../../assets/GooglePlay.svg";
import QrCode from "../../../assets/Qr_Code.svg";
import { color } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const logoSize = useBreakpointValue({
    base: "212px",
    sm: "256px",
    md: "286px",
    lg: "320px",
  });
  const qrCodeSize = useBreakpointValue({ base: "80px", md: "120px" });
  const storeButtonSize = useBreakpointValue({ base: "110px", md: "130px" });
  const [inputActive, setInputActive] = useState(false);

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    const api = await axios.post(
      "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api/subscribers/subscribe",
      {
        email: email,
      }
    );
    setMessage(api.data.message);
  };

  return (
    <Box
      color="white"
      w={"100vw"}
      backgroundImage="linear-gradient(to right, #1F6A75, #093635)"
    >
      <Box
        maxW="1436px"
        width="92%"
        direction={"column"}
        align="center"
        justify="center"
        paddingY={{ base: "42px", sm: "54px", md: "64px", lg: "86px" }}
        textAlign={{ base: "center", md: "left" }}
        mx={"auto"}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "1.5fr 1fr 1fr 1fr 1fr",
          }}
          gap={{ base: "18px", sm: "24px", md: "36px" }}
          mx={"auto"}
        >
          {/* Column 1: Logo, Description, and Subscribe */}
          <VStack
            align={{ base: "center", md: "flex-start" }}
            spacing={{ base: "16px", sm: "18px", md: "24px" }}
          >
            <Image src={Logo} alt="Off The School" width={logoSize} />
            <Text
              color="#FFFFFF"
              fontSize={{ base: "12px", sm: "14px", md: "16px" }}
            >
              Welcome to Pakistan's first free edtech platform, where you can
              learn smartly at your own place.
            </Text>
            <Box width="90%">
              <Heading
                as="h5"
                color="#FFFFFF"
                fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                fontWeight="semibold"
                mb={{ base: "14px", sm: "16px", md: "20px" }}
              >
                Subscribe
              </Heading>

              <InputGroup>
                <Input
                  placeholder="Enter your email"
                  variant="outline"
                  borderColor="#FFFFFF"
                  color="#0D0D0D"
                  _placeholder={{ color: "#8a8a8aff" }}
                  _hover={{
                    borderColor: "#F49040",
                    shadow: "0px 0px 12px #F49040",
                  }}
                  _focus={{
                    borderColor: "#F49040",
                    color: "#0D0D0D",
                    bg: "#FFFFFF",
                    shadow: "0px 0px 12px #F49040",
                    outline: "none",
                  }}
                  bg="#FFFFFF"
                  borderRadius="30px"
                  fontSize={{ base: "16px", md: "18px" }}
                  onFocus={() => setInputActive(true)}
                  onBlur={() => setInputActive(false)}
                />
                <InputRightElement width="3rem">
                  <IconButton
                    color="#0D0D0D"
                    _focus={{ color: "#F49040", outline: "none", boxShadow: "none" }}
                    _hover={{ bg: "#F49040", color: "#FFFFFF", outline: "none", boxShadow: "none" }}
                    _active={{ outline: "none", boxShadow: "none" }}
                    h={{ base: "18px", sm: "24px", md: "28px" }}
                    borderRadius="full"
                    bg="transparent"
                    aria-label="Send email"
                    icon={<ArrowForwardIcon />}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    sx={{
                      '&:hover, &:focus, &:active': {
                        outline: 'none !important',
                        boxShadow: 'none !important',
                        border: 'none !important'
                      }
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
          </VStack>

          {/* Column 2: School Campus */}
          <Box>
            <Heading
              as="h4"
              color="#F49040"
              fontSize={{ base: "18px", sm: "20px", md: "22px" }}
              fontWeight="semibold"
              mb={{ base: "16px", sm: "18px", md: "24px" }}
            >
              School Campus
            </Heading>
            <Text
              as={RouterLink}
              to="https://g.co/kgs/5iEJ9MT"
              color="#FFFFFF"
              fontSize={{ base: "14px", sm: "16px", md: "18px" }}
              mb={{ base: "8px", sm: "12px", md: "16px" }}
              cursor="pointer"
              _hover={{ textDecoration: "none", color: "#F49040" }}
            >
              D/1, Opposite Baghdadi Masjid, Martin Quarters, Near Jail Road
              Karachi, Sindh, Pakistan.
            </Text>
            {/* <Link
              href="tel:+92 301 0687687"
              cursor={"pointer"}
              color="#FFFFFF"
              fontSize={{ base: "14px", sm: "16px", md: "18px" }}
              mb={{ base: "8px", sm: "12px", md: "16px" }}
              _hover={{ textDecoration: "none", color: "#F49040" }}
            >
              +92 301 0687687
            </Link> */}
            <Link
              href="mailto:info@offtheschool.io"
              display="block"
              marginTop={"20px"}
              color="#FFFFFF"
              fontSize={{ base: "14px", sm: "16px", md: "18px" }}
              mb={{ base: "8px", sm: "12px", md: "16px" }}
              _hover={{ textDecoration: "none", color: "#F49040" }}
            >
              info@offtheschool.io
            </Link>
            <Link
              href="tel:+92 301 0687687"
              cursor={"pointer"}
              color="#FFFFFF"
              fontSize={{ base: "14px", sm: "16px", md: "18px" }}
              mb={{ base: "8px", sm: "12px", md: "16px" }}
              _hover={{ textDecoration: "none", color: "#F49040" }}
            >
              +92 301 0687687
            </Link>
          </Box>

          {/* Column 3: EdTech Office */}
          <Box>
            <Heading
              as="h4"
              color="#F49040"
              fontSize={{ base: "18px", sm: "20px", md: "22px" }}
              fontWeight="semibold"
              mb={{ base: "16px", sm: "18px", md: "24px" }}
            >
              EdTech Office
            </Heading>
            <Text
              as={RouterLink}
              to="https://g.co/kgs/5iEJ9MT"
              display={"block"}
              color="#FFFFFF"
              _hover={{ color: "#F49040" }}
              fontSize={{ base: "14px", sm: "16px", md: "18px" }}
              mb={{ base: "8px", sm: "12px", md: "16px" }}
            >
              Office # 302, 3rd Floor, Plot 9C, Sehar Lane 9, Sehar Commercial,
              DHA Phase 7, Karachi, Pakistan.
            </Text>
            <Link
              href="tel:+92 301 0687687"
              cursor={"pointer"}
              color="#FFFFFF"
              fontSize={{ base: "14px", sm: "16px", md: "18px" }}
              mb={{ base: "8px", sm: "12px", md: "16px" }}
              _hover={{ textDecoration: "none", color: "#F49040" }}
            >
              +92 301 0687687
            </Link>
            <Link
              href="mailto:support@edu.offtheschool.io"
              display="block"
              color="#FFFFFF"
              fontSize={{ base: "14px", sm: "16px", md: "18px" }}
              mb={{ base: "8px", sm: "12px", md: "16px" }}
              _hover={{ textDecoration: "none", color: "#F49040" }}
            >
              support@edu.offtheschool.io
            </Link>
          </Box>

          {/* Column 4: Quick Link */}
          <Box>
            <Heading
              as="h4"
              color="#F49040"
              fontSize={{ base: "18px", sm: "20px", md: "22px" }}
              fontWeight="semibold"
              mb={{ base: "16px", sm: "18px", md: "24px" }}
            >
              Quick Link
            </Heading>
            <LinkSection
              items={[
                { text: "Privacy Policy", href: "/privacy-policy" },
                { text: "Terms Of Use", href: "/terms-of-use" },
                { text: "FAQ", href: "/faq" },
                { text: "About", href: "/aboutus" },
                { text: "Contact", href: "/contactus" },
              ]}
            />
          </Box>

          {/* Column 5: Download App */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignContent={"center"}
          >
            <Heading
              as="h4"
              color="#F49040"
              fontSize={{ base: "18px", sm: "20px", md: "22px" }}
              fontWeight="semibold"
              mb={{ base: "16px", sm: "18px", md: "24px" }}
            >
              Download App
            </Heading>
            <Text
              color="#FFFFFF"
              fontSize={{ base: "12px", sm: "14px", md: "16px" }}
              mb={{ base: "14px", sm: "16px", md: "18px" }}
            >
              Download the App from Play Store
            </Text>
            <Image
              src={QrCode}
              alt="QR Code"
              width={qrCodeSize}
              mb={{ base: "14px", sm: "16px", md: "18px" }}
              mx={{ base: "auto", md: "0" }}
            />
            <Flex
              gap={4}
              direction={{ base: "row", lg: "column" }}
              mx={{ base: "auto", md: "0" }}
            >
              <Image
                src={GooglePlay}
                alt="Google Play"
                width={storeButtonSize}
              />
            </Flex>
          </Box>
        </Grid>

        {/* Social Media Icons */}
        <Flex justify="center" mt={{ base: "24px", md: "36px" }}>
          <HStack
            spacing={{ base: "16px", sm: "18px", md: "24px" }}
            color="#FFFFFF"
            fontSize={{ base: "18px", sm: "24px", md: "28px" }}
          >
            <Link
              href="https://facebook.com/OffTheSchool"
              isExternal
              _hover={{ color: "#F49040" }}
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://x.com/offtheschool"
              isExternal
              _hover={{ color: "#F49040" }}
            >
              <FiTwitter />
            </Link>
            <Link
              href="https://instagram.com/offtheschool_/"
              isExternal
              _hover={{ color: "#F49040" }}
            >
              <FaInstagram />
            </Link>

            <Link
              href="https://linkedin.com/company/off-the-school/"
              isExternal
              _hover={{ color: "#F49040" }}
            >
              <FaLinkedinIn />
            </Link>

            <Link
              href="https://youtube.com/@Off-The-School"
              isExternal
              _hover={{ color: "#F49040" }}
            >
              <FaYoutube />
            </Link>
          </HStack>
        </Flex>

        <Divider
          my={{ base: "16px", sm: "18px", md: "24px" }}
          borderColor="#CED4D3"
        />
        <Text
          fontSize={{ base: "12px", sm: "14px", md: "16px" }}
          textAlign="center"
          color="#CED4D3"
        >
          © All right reserved to Off The School since {currentYear}
        </Text>
      </Box>
    </Box>
  );
};

// Helper component for links
const LinkSection = ({ items }) => (
  <Flex direction="column" gap={{ base: "8px", sm: "12px", md: "16px" }}>
    {items.map((item, index) => (
      <Link
        key={index}
        as={RouterLink}
        to={item.href}
        color="#FFFFFF"
        fontSize={{ base: "14px", sm: "16px", md: "18px" }}
        fontWeight={"normal"}
        _hover={{ textDecoration: "none", color: "#F49040" }}
      >
        {item.text}
      </Link>
    ))}
  </Flex>
);

export default Footer;
