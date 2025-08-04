import React  from "react";
import { useEffect } from "react";
import { Box, Text, Icon, SimpleGrid, Heading, VStack, Center, Spinner, Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import BOX from "../../views/BOX";
import { useFCategoryContext } from "../../context/CategoryContext";
import { useSubjectContext } from "../../context/WebSubjectContext";
import { useWebUserContext } from "../../context/WebUserContext";



const SelectClasses = () => {
  const {
    subCategories,
    pagination,
    loading,
    error,
    getSubCategories,
    loadNextPage,
    categories,
    getCategories
  } = useFCategoryContext();

  const { allSubjects,setLoading,getAllSubjects, setFilteredSubjects } = useSubjectContext(); // Using the subject context to fetch all subjects

  useEffect(() => {
    
    const categoryId = localStorage.getItem('categoryId');
     getSubCategories(1, 14, categoryId); 
    // console.log("Fetching subcategories...: ", subCategories);
  }, [getSubCategories]);

  // const categoryId = categories.find(category => category.name === "Academic")?.id;

  // console.log("Category ID for Academic: ", categoryId);
  // const academicClasses = subCategories.filter(item => item.categoryId === 1);

  const academicClasses = subCategories;
  const navigate = useNavigate();
  const {userLoginToken} = useWebUserContext();

  const token = userLoginToken || localStorage.getItem("userToken");

  const handleClassSelect = async(className, id) => {
    const formattedClass = className.toLowerCase().replace(/\s+/g, "-");
    // the id will use to fetch chapters of dedicated class;
    setLoading(true);
    // console.log(`Selected class: ${className} with ID: ${id}`);
    await getAllSubjects(id);
    setLoading(false);
    if(!token){navigate(`/subjects/${formattedClass}`);}
    else{navigate(`/dashboard/category/digitalschool-classes/subjects/${formattedClass}`)}

  };


  return (
    <BOX>
      <Box
        mt={{ base: "136px", sm: "142px", md: "156px" }}
        mb={{ base: "64px", sm: "86px", md: "136px" }}

        maxW={{ base: "75%", md: "85%" }}
        width="952px"
        mx={"auto"}
        fontFamily="Poppins"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
      >
        <VStack spacing={{ base: "18px", sm: "24px", md: "36px" }}>
          <Box
            width="95%"
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
              Select Classes
            </Text>
          </Box>

        {error && (
        <Center mb={6}>
          <Text color="red.400" fontWeight="bold">
            {error}
          </Text>
        </Center>
      )}

          {/* Grid for class cards */}
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: "18px", sm: "24px", md: "36px" }}
            width="90%"
          >
            {academicClasses.map(({ id, name }) => (
          <Box
            key={id}
                display="flex"
                justifyContent="space-between"
                textAlign="center"
                bgGradient="linear(to-br, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.2) 100%)"
                alignItems="center"
                p={{ base: "18px", sm: "24px", md: "36px" }}
                borderRadius={"24px"}
                border="1px solid"
                borderColor="#FFFFFF35"
                boxShadow="lg"
                backdropFilter="blur(60px)"
                cursor="pointer"
                transition="all 0.3s ease"
                // maxWidth={{ base: "full", sm: "320px", md: "400px" }}
                w={"full"}
                // width={{ base: "100%", md: "45%" }}
                _hover={{
                  transform: "translateY(-3px)",
                  boxShadow: "xl",
                }}
                onClick={() => handleClassSelect(name, id)}
              >
                <Text
                  fontSize={{ base: "22px", md: "28px", lg: "36px" }}
                  fontWeight="bold"
                  color="white"
                  textTransform="uppercase"
                >
                  {name}
                </Text>
                <Icon
                  as={ChevronRightIcon}
                  color="white"
                  boxSize={{ base: "36px", md: "42px", lg: "48px" }}
                />
              </Box>
            ))}
          </SimpleGrid>
          {loading && (
        <Center mb={6}>
          <Spinner size="lg" color="orange.400" />
        </Center>
      )}

      {/* Load more button */}
      {!loading && pagination.hasNextPage && (
        <Center>
          <Button colorScheme="orange" onClick={loadNextPage}>
            Load More Classes
          </Button>
        </Center>
      )}
        </VStack>
      </Box>
    </BOX>
  );
};

export default SelectClasses;
