import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Image,
  Button,
  Tag,
  HStack,
  VStack,
  Link,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

// Sample data for news and resources
const newsAndResources = [
  {
    id: 1,
    type: 'News',
    title: 'Off The School Launches New Interactive Learning Tools',
    excerpt: 'Exciting new features designed to enhance student engagement and improve learning outcomes.',
    date: 'May 15, 2025',
    category: 'Product Update',
    imageUrl: 'https://images.unsplash.com/photo-1600195077909-46e573870d99?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 2,
    type: 'Resource',
    title: 'Complete Guide to Remote Learning Success',
    excerpt: 'Essential strategies and tools for teachers and students to thrive in virtual classrooms.',
    date: 'May 10, 2025',
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1597153519933-ef027f3e3262?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 3,
    type: 'News',
    title: 'Off The School Partners with Leading Universities',
    excerpt: 'New partnerships aim to expand educational opportunities and provide enhanced curriculum resources.',
    date: 'May 5, 2025',
    category: 'Partnership',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 4,
    type: 'Resource',
    title: 'Best Practice Assessment Techniques for Modern Education',
    excerpt: 'Innovative methods to evaluate student progress and understanding in today\'s learning environment.',
    date: 'April 28, 2025',
    category: 'Teaching',
    imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 5,
    type: 'News',
    title: 'Off The School Reaches 1 Million User Milestone',
    excerpt: 'Our platform celebrates growing community of educators and learners across the country.',
    date: 'April 20, 2025',
    category: 'Milestone',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 6,
    type: 'Resource',
    title: 'Integrating Technology in Traditional Classroom Settings',
    excerpt: 'How to blend digital tools with conventional teaching methods for optimal learning experiences.',
    date: 'April 15, 2025',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500&auto=format&fit=crop',
  },
];

const LatestNewsAndResources = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'News', 'Resources'];

  const filteredItems = activeFilter === 'All' 
    ? newsAndResources 
    : newsAndResources.filter(item => 
        activeFilter === 'Resources' ? item.type === 'Resource' : item.type === 'News'
      );

  const displayedItems = filteredItems.slice(0, 3); // Show only first 3 items
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <Box py={{ base: 12, md: 20 }} bg="white">
      <Container maxW="7xl">
        {/* Section Header */}
        <Flex 
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          mb={{ base: 8, md: 12 }}
        >
          <Box mb={{ base: 6, md: 0 }}>
            <Heading 
              as="h2" 
              fontSize={{ base: "3xl", md: "4xl" }} 
              fontWeight="bold"
              mb={3}
            >
              <Text as="span" color="#1F6A75">Latest News </Text>
              <Text as="span" color="#F49040">& Resources</Text>
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600"
              maxW="2xl"
            >
              Stay updated with the latest educational news, teaching resources, and platform updates from Off The School.
            </Text>
          </Box>

          {/* Filter Tabs */}
          <HStack 
            spacing={2} 
            p={1}
            bg="gray.100"
            borderRadius="full"
          >
            {filters.map(filter => (
              <Button
                key={filter}
                size="sm"
                px={6}
                borderRadius="full"
                bg={activeFilter === filter ? "#1F6A75" : "transparent"}
                color={activeFilter === filter ? "white" : "gray.600"}
                fontWeight="medium"
                _hover={{
                  bg: activeFilter === filter ? "#1F6A75" : "gray.200"
                }}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </HStack>
        </Flex>

        {/* News and Resources Grid */}
        <SimpleGrid columns={columns} spacing={8}>
          {displayedItems.map((item) => (
            <Box 
              key={item.id} 
              borderRadius="lg" 
              overflow="hidden" 
              bg="white" 
              boxShadow="md"
              transition="transform 0.3s, box-shadow 0.3s"
              _hover={{ 
                transform: "translateY(-5px)",
                boxShadow: "lg"
              }}
            >
              <Box position="relative" h="200px" overflow="hidden">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  objectFit="cover" 
                  w="100%" 
                  h="100%"
                  transition="transform 0.5s"
                  _groupHover={{ transform: "scale(1.05)" }}
                />
                <Tag
                  position="absolute"
                  top="12px"
                  left="12px"
                  colorScheme={item.type === "News" ? "teal" : "orange"}
                  borderRadius="full"
                >
                  {item.type}
                </Tag>
              </Box>
              
              <Box p={5}>
                <Text color="gray.500" fontSize="sm" mb={2}>
                  {item.date} • {item.category}
                </Text>
                
                <Heading 
                  as="h3" 
                  fontSize="xl"
                  fontWeight="bold"
                  mb={3}
                  noOfLines={2}
                  color="#1F6A75"
                >
                  {item.title}
                </Heading>
                
                <Text color="gray.600" fontSize="md" mb={4} noOfLines={2}>
                  {item.excerpt}
                </Text>
                
                <Link 
                  href="#"
                  fontSize="sm"
                  fontWeight="medium"
                  color="#F49040"
                  display="flex"
                  alignItems="center"
                  _hover={{ textDecoration: "none", color: "#E57920" }}
                >
                  Read more
                  <ChevronRightIcon ml={1} />
                </Link>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {/* View All Button */}
        <Flex justify="center" mt={{ base: 8, md: 12 }}>
          <Button
            variant="outline"
            color="#1F6A75"
            borderColor="#1F6A75"
            size="lg"
            borderRadius="full"
            px={8}
            _hover={{
              bg: "#1F6A75",
              color: "white"
            }}
          >
            View All Articles
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default LatestNewsAndResources;