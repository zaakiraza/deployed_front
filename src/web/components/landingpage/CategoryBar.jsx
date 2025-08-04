// import React, { useState, useRef, useEffect } from 'react';
// import { Box, Flex, Text, Center, Icon, useMediaQuery } from '@chakra-ui/react';
// import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

// const CategoryBar = () => {
//   const scrollRef = useRef(null);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const [isMobile] = useMediaQuery("(max-width: 768px)");
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   // Sample categories - replace with your actual categories
//   const categories = [
//     { id: 1, name: '<>', icon: '⟨/⟩', bgColor: 'teal.50', color: 'teal.500' },
//     { id: 2, name: 'Python', icon: '', bgColor: 'gray.50', color: 'gray.700' },
//     { id: 3, name: 'React', icon: '', bgColor: 'gray.50', color: 'gray.700' },
//     { id: 4, name: 'Next', icon: '', bgColor: 'gray.50', color: 'gray.700' },
//     { id: 5, name: 'UI', icon: '🎨', bgColor: 'gray.50', color: 'gray.700' },
//     { id: 6, name: 'UI & UX', icon: '', bgColor: 'gray.50', color: 'gray.700' },
//     { id: 7, name: 'Vector', icon: '', bgColor: 'gray.50', color: 'gray.700' },
//     { id: 8, name: 'Video', icon: '📹', bgColor: 'orange.50', color: 'orange.500' },
//     { id: 9, name: 'After Effects', icon: '', bgColor: 'gray.50', color: 'gray.700' },
//     { id: 10, name: 'Lightroom', icon: '', bgColor: 'gray.50', color: 'gray.700' },
//     { id: 11, name: 'Photography', icon: '', bgColor: 'gray.50', color: 'gray.700' },
//     { id: 12, name: 'Illustrator', icon: '', bgColor: 'gray.50', color: 'gray.700' },
//   ];

//   // Check if we should show arrows
//   useEffect(() => {
//     const checkScroll = () => {
//       if (!scrollRef.current) return;
      
//       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//       setShowLeftArrow(scrollLeft > 0);
//       setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
//       setScrollPosition(scrollLeft);
//     };
    
//     // Add scroll event listener
//     const scrollContainer = scrollRef.current;
//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', checkScroll);
//       // Initial check
//       checkScroll();
//     }
    
//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', checkScroll);
//       }
//     };
//   }, []);

//   // Handle arrow navigation
//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = direction === 'left' ? -300 : 300;
//       scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   // Touch handlers for mobile swipe
//   const handleMouseDown = (e) => {
//     if (isMobile) return; // Skip on mobile as it handles touch events natively
    
//     setIsDragging(true);
//     setStartX(e.pageX - scrollRef.current.offsetLeft);
//     setScrollLeft(scrollRef.current.scrollLeft);
//   };

//   const handleMouseLeave = () => {
//     setIsDragging(false);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     e.preventDefault();
    
//     const x = e.pageX - scrollRef.current.offsetLeft;
//     const walk = (x - startX) * 2; // Scroll speed multiplier
//     scrollRef.current.scrollLeft = scrollLeft - walk;
//   };

//   // Touch handlers for mobile
//   const handleTouchStart = (e) => {
//     setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
//     setScrollLeft(scrollRef.current.scrollLeft);
//   };

//   const handleTouchMove = (e) => {
//     if (!scrollRef.current) return;
    
//     const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
//     const walk = (startX - x) * 2; // Scroll speed multiplier
//     scrollRef.current.scrollLeft = scrollLeft + walk;
//   };

//   return (
//     <Center width="100%" py={'50px'} mt={-9}>
//       <Box 
//         position="relative" 
//         width={{ base: "95%", md: "85%", lg: "80%" }}
//         maxWidth="1200px"
//         bg="white"
//         borderRadius="lg"
//         shadow="sm"
//       >
//         {/* Left arrow with gradient fade */}
//         {!isMobile && showLeftArrow && (
//           <Flex
//             position="absolute"
//             left={0}
//             top={0}
//             height="100%"
//             width="80px"
//             zIndex={2}
//             alignItems="center"
//             pl={2}
//             background="linear-gradient(to right, white 30%, transparent 100%)"
//             onClick={() => scroll('left')}
//             cursor="pointer"
//           >
//             <Icon as={ChevronLeftIcon} w={6} h={6} color="gray.600" />
//           </Flex>
//         )}
        
//         {/* Categories container */}
//         <Box
//           ref={scrollRef}
//           width="100%"
//           overflowX="auto"
//           py={4}
//           px={{ base: 6, md: 8 }}
//           css={{
//             '&::-webkit-scrollbar': {
//               display: 'none',
//             },
//             scrollbarWidth: 'none',
//           }}
//           onMouseDown={handleMouseDown}
//           onMouseLeave={handleMouseLeave}
//           onMouseUp={handleMouseUp}
//           onMouseMove={handleMouseMove}
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//         >
//           <Flex gap={{ base: 3, md: 4 }}>
//             {categories.map((category, index) => (
//               <Box
//                 key={`${category.id}-${index}`}
//                 bg={category.bgColor}
//                 px={8}
//                 py={2}
//                 borderRadius="md"
//                 whiteSpace="nowrap"
//                 cursor="pointer"
//                 transition="all 0.2s"
//                 _hover={{ transform: 'translateY(-2px)', shadow: 'sm' }}
//               >
//                 <Flex alignItems="center">
//                   {category.icon && (
//                     <Text mr={2} fontSize="sm">{category.icon}</Text>
//                   )}
//                   <Text color={category.color} fontWeight="medium">
//                     {category.name}
//                   </Text>
//                 </Flex>
//               </Box>
//             ))}
//           </Flex>
//         </Box>
        
//         {/* Right arrow with gradient fade */}
//         {!isMobile && showRightArrow && (
//           <Flex
//             position="absolute"
//             right={0}
//             top={0}
//             height="100%"
//             width="80px"
//             zIndex={2}
//             alignItems="center"
//             justifyContent="flex-end"
//             pr={2}
//             background="linear-gradient(to left, white 30%, transparent 100%)"
//             onClick={() => scroll('right')}
//             cursor="pointer"
//           >
//             <Icon as={ChevronRightIcon} w={6} h={6} color="gray.600" />
//           </Flex>
//         )}
//       </Box>
//     </Center>
//   );
// };

// export default CategoryBar;
import React, { useState, useRef, useEffect } from 'react';
import { Box, Flex, Text, Center, Icon, useMediaQuery } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

const CategoryBar = () => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Sample categories - replace with your actual categories
  const categories = [
    { id: 1, name: '<>', icon: '⟨/⟩', bgColor: 'teal.50', color: 'teal.500' },
    { id: 2, name: 'Python', icon: '', bgColor: 'gray.50', color: 'gray.700' },
    { id: 3, name: 'React', icon: '', bgColor: 'gray.50', color: 'gray.700' },
    { id: 4, name: 'Next', icon: '', bgColor: 'gray.50', color: 'gray.700' },
    { id: 5, name: 'UI', icon: '🎨', bgColor: 'gray.50', color: 'gray.700' },
    { id: 6, name: 'UI & UX', icon: '', bgColor: 'gray.50', color: 'gray.700' },
    { id: 7, name: 'Vector', icon: '', bgColor: 'gray.50', color: 'gray.700' },
    { id: 8, name: 'Video', icon: '📹', bgColor: 'orange.50', color: 'orange.500' },
    { id: 9, name: 'After Effects', icon: '', bgColor: 'gray.50', color: 'gray.700' },
    { id: 10, name: 'Lightroom', icon: '', bgColor: 'gray.50', color: 'gray.700' },
    { id: 11, name: 'Photography', icon: '', bgColor: 'gray.50', color: 'gray.700' },
    { id: 12, name: 'Illustrator', icon: '', bgColor: 'gray.50', color: 'gray.700' },
  ];

  // Check if we should show arrows (only for desktop)
  useEffect(() => {
    if (isMobile) return; // Skip arrow logic on mobile
    
    const checkScroll = () => {
      if (!scrollRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      setScrollPosition(scrollLeft);
    };
    
    // Add scroll event listener
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
      }
    };
  }, [isMobile]);

  // Handle arrow navigation (desktop only)
  const scroll = (direction) => {
    if (scrollRef.current && !isMobile) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Mouse handlers for desktop drag scrolling
  const handleMouseDown = (e) => {
    if (isMobile) return; // Skip on mobile
    
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isMobile) return;
    e.preventDefault();
    
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Center width="100%" py={'50px'} mt={-9}>
      <Box 
        position="relative" 
        width={{ base: "95%", md: "85%", lg: "80%" }}
        maxWidth="1200px"
        bg="white"
        borderRadius="lg"
        shadow="sm"
      >
        {/* Left arrow with gradient fade (desktop only) */}
        {!isMobile && showLeftArrow && (
          <Flex
            position="absolute"
            left={0}
            top={0}
            height="100%"
            width="80px"
            zIndex={2}
            alignItems="center"
            pl={2}
            background="linear-gradient(to right, white 30%, transparent 100%)"
            onClick={() => scroll('left')}
            cursor="pointer"
          >
            <Icon as={ChevronLeftIcon} w={6} h={6} color="gray.600" />
          </Flex>
        )}
        
        {/* Categories container */}
        <Box
          ref={scrollRef}
          width="100%"
          overflowX={isMobile ? "visible" : "auto"}
          py={4}
          px={{ base: 6, md: 8 }}
          css={!isMobile ? {
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
          } : {}}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <Flex 
            gap={{ base: 3, md: 4 }}
            flexWrap={isMobile ? "wrap" : "nowrap"}
            justifyContent={isMobile ? "center" : "flex-start"}
          >
            {categories.map((category, index) => (
              <Box
                key={`${category.id}-${index}`}
                bg={category.bgColor}
                px={{ base: 4, md: 8 }}
                py={2}
                borderRadius="md"
                whiteSpace="nowrap"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ transform: 'translateY(-2px)', shadow: 'sm' }}
                flexShrink={isMobile ? 1 : 0}
              >
                <Flex alignItems="center">
                  {category.icon && (
                    <Text mr={2} fontSize="sm">{category.icon}</Text>
                  )}
                  <Text 
                    color={category.color} 
                    fontWeight="medium"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    {category.name}
                  </Text>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
        
        {/* Right arrow with gradient fade (desktop only) */}
        {!isMobile && showRightArrow && (
          <Flex
            position="absolute"
            right={0}
            top={0}
            height="100%"
            width="80px"
            zIndex={2}
            alignItems="center"
            justifyContent="flex-end"
            pr={2}
            background="linear-gradient(to left, white 30%, transparent 100%)"
            onClick={() => scroll('right')}
            cursor="pointer"
          >
            <Icon as={ChevronRightIcon} w={6} h={6} color="gray.600" />
          </Flex>
        )}
      </Box>
    </Center>
  );
};

export default CategoryBar;