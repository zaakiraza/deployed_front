import React, { useState } from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Input, 
  InputGroup, 
  InputRightElement,
  Button,
  Heading,
  Center,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const inputSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const iconSize = useBreakpointValue({ base: "16px", md: "18px" });
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement your search logic here
  };

  return (
    <Center w="100%" flexDirection="column" py={8} px={4}>
      {/* Hero Title */}
      <Box textAlign="center" mb={10} maxW="800px">
        <Heading 
          fontSize={{ base: "lg", sm: "3xl", md: "4xl", lg: "5xl" }} 
          fontWeight="bold" 
          lineHeight="1.2"
          mb={4}
        >
          Search Among <Text as="span" color="orange.400">52</Text> Courses And Find Your Favorite Course
        </Heading>
        
        {/* Arrow illustration */}
        <Box 
          position="relative" 
          w="full" 
          h="50px" 
          display={{ base: "none", md: "block" }}
        >
          <Box 
            position="absolute" 
            right={{ base: "20px", lg: "0" }} 
            bottom="0" 
            transform="rotate(30deg)"
          >
            <img src=".\src\assets\SearchCourses-Arrow.svg" alt="error" />
          </Box>
        </Box>
      </Box>

      {/* Search form */}
      <Box width={{ base: "100%", sm: "90%", md: "80%", lg: "60%" }} maxW="800px">
        <Flex 
          as="form" 
          onSubmit={handleSearch}
          position="relative"
          borderRadius="full"
          boxShadow="sm"
          overflow="hidden"
        >
          {/* Categories Button */}
          <Button
            borderRadius="full"
            bg="orange.400"
            color="white"
            _hover={{ bg: "orange.500" }}
            px={{ base: 4, md: 6 }}
            py={{ base: 5, md: 6 }}
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="medium"
            minW={{ base: "100px", md: "120px" }}
            h="auto"
            zIndex="2"
            position="absolute"
            left="0"
            top="0"
            bottom="0"
          >
            Categories
          </Button>
          
          {/* Search Input */}
          <InputGroup size={inputSize}>
            <Input
              placeholder="Search Courses Here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              pl={{ base: "110px", md: "130px" }}
              pr="50px"
              py={{ base: 6, md: 7 }}
              fontSize={{ base: "sm", md: "md" }}
              border="1px solid"
              borderColor="gray.200"
              bg="white"
              borderRadius="full"
              _focus={{ 
                boxShadow: "0 0 0 1px rgba(246, 173, 85, 0.6)",
                borderColor: "orange.300"
              }}
            />
            <InputRightElement 
              h="full" 
              w="50px"
              pr={2}
            >
              <IconButton
                aria-label="Search"
                icon={<SearchIcon w={iconSize} h={iconSize} />}
                size={buttonSize}
                variant="ghost"
                color="orange.400"
                borderRadius="full"
                type="submit"
                _hover={{ bg: "transparent", color: "orange.600" }}
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Box>
    </Center>
  );
};

export default SearchCourses;
