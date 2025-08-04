import React from "react";
import CategoryCard from "./CategoryCard";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFCategoryContext } from "../../context/CategoryContext";
import { useWebUserContext } from "../../context/WebUserContext";

/**
 * CategorySelection component displays a selection interface for different learning categories
 */
const CategorySelection = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = React.useState([]);
  const { getCategories } = useFCategoryContext();

  const handleGetCategories = async () => {
    try {
      const response = await getCategories();
      // console.log(response.data.data.categories);
      setCategoryData(response.data.data.categories);
    } catch (error) {
      alert(error.message);
    }
  };

  React.useEffect(() => {
    handleGetCategories();
  }, [1]);

  const {userLoginToken} = useWebUserContext();

  const token = userLoginToken || localStorage.getItem("userToken");

    
  return (
    <Box
      fontFamily="Poppins"
      height="auto"
      mt={{ base: "136px", sm: "142px", md: "156px" }}
        width="95%"
        // border={"1px solid #F4ffff"} // Border 
        mx={"auto"} // Center the box
    >
      <VStack spacing={{ base: "18px", sm: "24px", md: "36px" }}>
        <Box
          width="100%"
          paddingY="12px"
          height="auto" // Allow height to adjust based on text
          borderRadius="24px"
          background="linear-gradient(90deg, #F4904035 0.35%, #F4904080 100%)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border="1px solid"
          borderColor="#F49040"
          boxShadow="2xl"
          backdropFilter="blur(24px)"
        >
          <Text
            fontWeight="semibold"
            fontSize={{ base: "18px", sm: "24px", md: "36px" }}
            color="white"
            fontFamily="Poppins"
            textTransform="capitalize"
            textAlign="center"
          >
            Select Category
          </Text>
        </Box>

        <Flex
          gap={{ base: "18px", sm: "24px", md: "36px" }}
          flexDirection={{ base: "column", sm: "row" }}
          flexWrap="wrap"
          maxW="952px"
          width="95%"
          justify="center"
          align="center"
          // border={"1px solid #F49040"} // Border color
        >
          {categoryData.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.name}
              imageUrl={category.imageUrl}
              imageAlt={category.name}
              onContinue={() => {
                if (!token){navigate(
                  `/${category.name.toLowerCase().trim().replace(/\s+/g, "")}`
                );}else{
                  navigate('/dashboard/category/digitalschool-classes');
                }
              }} // Updated navigation
            />
          ))}
          {/* <CategoryCard
          title="Academics"
          imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/9f5782a31f17063012a0074d95d493d17144bb7c"
          imageAlt="Educational Video"
          onContinue={() => navigate("/selectclasses")} // Updated navigation
        /> */}

          {/* <CategoryCard
          title="Skill Based"
          imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/aadf06ed556660c9f36913226be6799cd321215e"
          imageAlt="Learning Various Courses"
          onContinue={() => navigate("/selectweekendcourses")}
        /> */}
        </Flex>
      </VStack>
    </Box>
  );
};

export default CategorySelection;
