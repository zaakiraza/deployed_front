import React from "react";
import { Box, Button, Heading, Image } from "@chakra-ui/react";

/**
 * CategoryCard component displays a single category option with title, image, and action button
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The category title
 * @param {string} props.imageUrl - URL for the category image
 * @param {string} props.imageAlt - Alt text for the category image
 * @param {function} props.onContinue - Function to call when Continue button is clicked
 */
const CategoryCard = ({ title, imageUrl, imageAlt, onContinue = () => {} }) => {
  return (
    <Box
      display="flex"
      bgGradient="linear(to-br, rgba(0, 82, 89, 1) 0%, rgba(255, 255, 255, 0.48) 100%)"
      flexDirection="column"
      alignItems="center"
      p={{ base: "18px", sm: "24px", md: "32px" }}
      borderRadius={"20px"}
      border="1px solid"
      borderColor="#FFFFFF35"
      boxShadow="lg"
      backdropFilter="blur(60px)"
      // maxWidth={{ base: "full", sm: "320px", md: "400px" }}
      width={{ base: "100%", md: "42%" }}
      // maxSm={{ width: "full", p: 4 }}
    >
      <Heading
        mb={{ base: "12px", sm: "14px", md: "18px" }}
        fontSize={{ base: "18px", sm: "20px", md: "24px" }}
        fontFamily="Poppins"
        fontWeight="semibold"
        color="#F49040"
        textTransform="capitalize"
      >
        {title}
      </Heading>
      <Image
        src={imageUrl}
        alt={imageAlt}
        objectFit="contain"
        mb={{ base: "12px", sm: "14px", md: "18px" }}
        boxSize={{ base: "140px", sm: "150px", md: "160px" }}
        width={{ base: "160px", sm: "180px", md: "190px" }}
        // border={"1px solid #F49040"}
        // maxSm={{ width: "full", height: "auto" }}
      />
      <Button
        onClick={onContinue}
        px={3}
        py={2}
        fontWeight="light"
        cursor="pointer"
        transition="all 0.3s ease"
        width={{ base: "120px", sm: "140px", md: "160px" }}
        // maxSm={{ width: "full" }}
        bg="#F49040"
        color="white"
        borderRadius="25px"
        h={{ base: "28px", sm: "32px", md: "36px" }}
        fontSize={{ base: "11px", sm: "12px", md: "14px" }}
        _hover={{
          border: "2px solid #F49040",
          color: "#F49040",
          bg: "none",
          boxShadow: "0px 2px 5px #F49040",
        }}
        _focus={{ outline: "none", boxShadow: "none", }}
      >
        Continue
      </Button>
    </Box>
  );
};

export default CategoryCard;
