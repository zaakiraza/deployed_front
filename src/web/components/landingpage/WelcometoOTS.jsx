import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Flex,
  Center,
  SimpleGrid,
  Icon,
  Stat,
  StatNumber,
  StatLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const WelcometoOTS = () => {
  // State to track active container index
  const [activeIndex, setActiveIndex] = useState(0);

  // State for animation
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);

  // Statistics data with actual numeric values
  const stats = [
    {
      number: "25K+",
      label: "Active Students",
      target: 25000,
      suffix: "K+",
      divisor: 1000,
    },
    {
      number: "899",
      label: "Total Courses",
      target: 899,
      suffix: "",
      divisor: 1,
    },
    { number: "158", label: "Instructor", target: 158, suffix: "", divisor: 1 },
    {
      number: "100%",
      label: "Satisfaction Rate",
      target: 100,
      suffix: "%",
      divisor: 1,
    },
  ];

  // Animation function
  const animateNumber = (start, end, duration, index, divisor, suffix) => {
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);

      setAnimatedNumbers((prev) => {
        const newNumbers = [...prev];
        newNumbers[index] = current;
        return newNumbers;
      });

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };

    requestAnimationFrame(updateNumber);
  };

  // Intersection Observer for scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          // Start animations for all numbers with different delays
          stats.forEach((stat, index) => {
            setTimeout(() => {
              animateNumber(
                0,
                stat.target,
                2000,
                index,
                stat.divisor,
                stat.suffix
              );
            }, index * 200); // Stagger animations
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Format number for display
  const formatNumber = (num, stat) => {
    if (stat.suffix === "K+") {
      return Math.floor(num / stat.divisor) + stat.suffix;
    } else if (stat.suffix === "%") {
      return num + stat.suffix;
    } else {
      return num.toString();
    }
  };

  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate("/signup"); // Navigate to the signup page when the button is clicked
  };

  return (
    <Box width="100%" bg={"white"} ref={sectionRef}>
      <Flex
        maxW="1200px"
        width="92%"
        mx={"auto"}
        align="center"
        justify="center"
        paddingY={{ base: "42px", sm: "54px", md: "86px", lg: "136px" }}
      >
        <VStack
          spacing={{ base: "8px", sm: "12px", md: "16px", lg: "18px" }}
          textAlign="center"
        >
          {/* Subtitle */}
          <Text
            color="#1F6A75"
            fontSize={{ base: "12px", sm: "16px", md: "18px", lg: "24px" }}
            fontWeight="semibold"
            fontFamily="Poppins"
            letterSpacing="0.5px"
          >
            Learning Together
          </Text>

          {/* Main Heading */}
          <Heading
            as="h1"
            fontSize={{ base: "24px", sm: "28px", md: "36px", lg: "42px" }}
            fontWeight="bold"
            color="#F49040"
            lineHeight="1"
            fontFamily="Poppins"
            letterSpacing="0.5px"
          >
            Welcome To OTS
          </Heading>

          {/* Description */}
          <Text
            fontSize={{ base: "10px", sm: "12px", md: "14px", lg: "16px" }}
            color="#0D0D0D"
            maxW={{ base: "90%", md: "70%", lg: "80%" }}
            lineHeight="tall"
            fontFamily="Poppins, sans-serif"
          >
            Off The School (OTS) Is A Not-For-Profit Institution And Online
            Platform Dedicated To Bridging The Socio-Economic Gap By Offering
            Accessible Formal And Skills-Based Education To All Individuals.
          </Text>

          {/* Learn More Button */}

          <Button
            bg="#F49040"
            color="#FFFFFF"
            fontFamily="Poppins"
            fontWeight={{ base: 300, md: 400 }}
            fontSize={{ base: "12px", md: "14px", lg: "16px" }}
            lineHeight="28px"
            letterSpacing="-1.1%"
            textAlign="center"
            w="auto"
            outline={"none"}
            borderRadius="full"
            paddingY={{ base: "8px", sm: "12px", md: "18px", lg: "22px" }}
            paddingX={{ base: "16px", sm: "20px", md: "24px" }}
            _hover={{
              bg: "none",
              color: "#F49040",
              border: "1px solid #F49040",
              shadow: "0px 0px 12px #F49040",
              transition: "all 0.3s ease-in-out",
            }}
            onClick={() => window.open("https://offtheschool.io/", "_blank")}
            _focus={{ outline: "none", boxShadow: "none", bg: "none" }}
            // onClick={handleClick}    ---> will add link to current website
            rightIcon={
              <Flex
                align="center"
                justify="center"
                fontSize={{
                  base: "14px",
                  sm: "16px",
                  md: "18px",
                  lg: "20px",
                }}
              >
                <Icon as={FiArrowRight} />
              </Flex>
            }
          >
            Learn More
          </Button>

          {/* Statistics Section */}
          <SimpleGrid
            w="auto"
            mt={{ base: "12px", sm: "16px", md: "20px", lg: "24px" }}
            columns={{ base: 2, md: 4 }}
            justify="center"
            // align = "stretch"
            gap={{ base: "8px", sm: "12px", md: "16px", lg: "18px" }}
          >
            {stats.map((stat, index) => (
              <Box
                key={index}
                borderRadius="12px"
                py={{ base: "16px", sm: "20px", md: "24px", lg: "36px" }}
                bg={activeIndex === index ? "#F49040" : "white"}
                border="1.5px solid"
                borderColor={
                  activeIndex === index ? "#F49040" : "rgba(31, 106, 117, 1)"
                }
                width={{ base: "136px", sm: "164px", md: "156px", lg: "186px" }}
                // height={{ base: "auto", md: "136px", lg: "156px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                transition="all 0.3s ease"
                onMouseEnter={() => setActiveIndex(index)}
                _hover={{
                  position: "relative",
                  bg: "#F49040",
                  borderColor: "#F49040",
                  transform: "translateY(-5px) scale(1.05)",
                  boxShadow: "2xl",
                  zIndex: 1,
                }}
                cursor="pointer"
              >
                <Stat>
                  <StatNumber
                    fontSize={{
                      base: "24px",
                      sm: "36px",
                      md: "42px",
                      lg: "48px",
                    }}
                    fontWeight="bold"
                    fontFamily="Poppins, sans-serif"
                    color={
                      activeIndex === index ? "white" : "rgba(31, 106, 117, 1)"
                    }
                    transition="all 0.3s ease"
                    _groupHover={{ color: "white" }}
                  >
                    {isVisible
                      ? formatNumber(animatedNumbers[index], stat)
                      : "0"}
                  </StatNumber>
                  <StatLabel
                    fontSize={{
                      base: "12px",
                      sm: "14px",
                      md: "16px",
                      lg: "18px",
                    }}
                    fontWeight="light"
                    fontFamily="Poppins, sans-serif"
                    color={
                      activeIndex === index ? "white" : "rgba(31, 106, 117, 1)"
                    }
                    // mt={2}
                    transition="all 0.3s ease"
                    _groupHover={{ color: "white" }}
                  >
                    {stat.label}
                  </StatLabel>
                </Stat>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Flex>
    </Box>
  );
};

export default WelcometoOTS;
