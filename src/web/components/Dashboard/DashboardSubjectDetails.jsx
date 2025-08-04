import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Button,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
// import { useEnrollmentContext } from "../../context/WebEnrollmentContext";
import { useSubjectContext } from "../../context/WebSubjectContext";
import { useChapterContext } from "../../context/WebChapterContext";
import { useDashboardContext } from "../../context/DashboardContext";
import { useEnrollmentContext } from "../../context/WebEnrollmentContext";
import { useNavigate } from "react-router-dom";

function DashboardSubjectDetails() {

  const navigate = useNavigate();
  const { selectedView, setSelectedView } = useDashboardContext();
  const {
    allSubjects,

    setLoading,
    setError,

    getAllSubjects,

    page,
    setPage,
    limit,

    totalSubjects,
  } = useSubjectContext();

  const { fetchChapterCount } = useChapterContext();
  const [chapterCounts, setChapterCounts] = useState({});
  const { studentEnrollmentData } = useEnrollmentContext();
  // const studentEnrollmentStr = localStorage.getItem("studentEnrollmentData");
  // const studentEnrollmentData = studentEnrollmentStr
  //   ? JSON.parse(studentEnrollmentStr)
  //   : null;
  const subcatId = studentEnrollmentData[0]?.subcategoryId;
  if (!localStorage.getItem("subcategoryId")) {
    localStorage.setItem("subcategoryId", subcatId);
  }
  const subcategoryId = localStorage.getItem("subcategoryId");

  useEffect(() => {
    
    if (!subcategoryId) return;
    setLoading(true);
    getAllSubjects(subcategoryId, page, limit)
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, [subcategoryId, page, limit]);

  // Fetch chapter count for each subject
  useEffect(() => {
    async function fetchCounts() {
      const counts = {};
      for (const subject of allSubjects) {
        counts[subject.id] = await fetchChapterCount(subject.id);
      }
      setChapterCounts(counts);
    }
    if (allSubjects.length > 0) {
      fetchCounts();
    }
  }, [allSubjects, fetchChapterCount]);

  const userSubjectData = allSubjects;

  const headingFontSize = useBreakpointValue({
    base: "24px",
    sm: "30px",
    lg: "38px",
  });
  const paragraphFontSize = useBreakpointValue({
    base: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
  });

  const totalPages = Math.ceil(totalSubjects / limit);

  return (
    <Box
      mt={{ base: "18px", sm: "24px", md: "36px" }}
      maxW={{ base: "75%", md: "85%" }}
      width="952px"
      mx={"auto"}
      bg="transparent"
      fontFamily="'Poppins', sans-serif"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} >
        {userSubjectData.map((subject) => (
          <Box
            key={subject.id}
            border="1px solid #ffffffff"
            w="100%"
            display="flex"
            flexDirection="column"
            p={{ base: "24px", sm: "36px", md: "48px" }}
            gap={{ base: "12px", sm: "16px", md: "20px" }}
            borderRadius="24px"
            justify="space-between"
            boxShadow="2xl"
            // border="1px solid #FFFFFF35"
            backdropFilter="blur(24px)"
            bgGradient="linear(to-br, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.1) 100%)"
          >
            <Text
              fontSize={paragraphFontSize}
              color="#FFFFFF"
              fontWeight={400}
              lineHeight="100%"
              letterSpacing="1%"
              fontFamily="Poppins"
              // ml={2}
            >
              Total Chapters {chapterCounts[subject.id] ?? "Loading..."}
            </Text>
            <Heading
              fontSize={headingFontSize}
              // my={6}
              color="#FFFFFF"
              fontWeight={700}
              lineHeight="100%"
              letterSpacing="1%"
              fontFamily="Poppins"
              // ml={2}
            >
              {subject.name.toUpperCase()}
            </Heading>
            
            <Text 
              fontSize={paragraphFontSize}
              color="#FFFFFF"
              fontWeight={400}
              lineHeight="100%"
              letterSpacing="1%"
              fontFamily="Poppins"
              // ml={2}
            >
             {subject.teacher}
            </Text>

            <Text
              fontSize={paragraphFontSize}
              color="#FFFFFF"
              fontWeight={400}
              lineHeight="100%"
              letterSpacing="1%"
              fontFamily="Poppins"
              // ml={2}
            >
              {subject.description}
            </Text>
            <Button
              onClick={() => navigate('/dashboard/subject-selection')}
              mt={3}
              // mb={2}
              // ml={2}
              alignSelf="start"
              lineHeight="28px"
              letterSpacing="-1.1%"
              fontFamily="Poppins"
              // px={4}
              py={3}
              px={{ base: "16px", sm: "24px", md: "32px" }}
              fontWeight="light"
              cursor="pointer"
              transition="all 0.3s ease"
              // width={{ base: "136px", sm: "152px" , md: "136px" }}
              // maxSm={{ width: "full" }}
              bg="#F49040"
              color="white"
              borderRadius="30px"
              h={{ base: "32px", sm: "38px", md: "42px" }}
              fontSize={{ base: "12px", sm: "14px", md: "16px" }}
              _hover={{
                border: "2px solid #F49040",
                color: "#F49040",
                bg: "none",
                boxShadow: "0px 2px 5px #F49040",
              }}
              _focus={{ outline: "none", boxShadow: "none" }}
            >
              Continue
            </Button>
          </Box>
        ))}
      </SimpleGrid>
      {/* Pagination Controls */}
      <Flex width="100%" justify="center" align="center" mt={8} mb={4}>
        <Button
          onClick={() => setPage(page - 1)}
          isDisabled={page === 1}
          mr={2}
          borderRadius="full"
          colorScheme="orange"
          variant="outline"
        >
          Previous
        </Button>
        <Text mx={2} color="#fff" fontWeight="bold">
          Page {page} of {totalPages}
        </Text>
        <Button
          onClick={() => setPage(page + 1)}
          isDisabled={page === totalPages || totalPages === 0}
          ml={2}
          borderRadius="full"
          colorScheme="orange"
          variant="outline"
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
}

export default DashboardSubjectDetails;
