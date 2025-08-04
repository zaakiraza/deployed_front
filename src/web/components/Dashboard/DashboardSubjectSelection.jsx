import React, { useEffect } from 'react';
import { useSubjectContext } from '../../context/WebSubjectContext';
import {
  Box,
  VStack,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import { useChapterContext } from '../../context/WebChapterContext';
import { FiChevronLeft } from "react-icons/fi";

import BOX from '../../views/BOX'
import { useNavigate } from 'react-router-dom';
function DashboardSubjectSelection({ setSelectedView, setIsSidebarOpen }) {
  const navigate = useNavigate();
  // // Handle enrollment data as array
  // const studentEnrolDataStr = localStorage.getItem('studentEnrollmentData');
  // let studentEnrolData = [];
  // try {
  //   studentEnrolData = studentEnrolDataStr ? JSON.parse(studentEnrolDataStr) : [];
  // } catch {
  //   studentEnrolData = [];
  // }
  // const subcategoryId = studentEnrolData[0]?.subcategoryId;

  const subcategoryId = localStorage.getItem('subcategoryId')
  // console.log(id)
  // //  if(!id){

  // //   localStorage.setItem('subcategoryId', subcategoryId)
  // // }
  // // if (subcategoryId) {
  // //   localStorage.setItem('subcategoryId', subcategoryId);
  // // }

  const {
    allSubjects,
    loading,
    setLoading,
    setError,
    getAllSubjects,
    page,
    setPage,
    limit,
    totalSubjects,
  } = useSubjectContext();

  const { getAllChapters } = useChapterContext();

  // Fetch subjects when subcategoryId, page, or limit changes
  useEffect(() => {
    setIsSidebarOpen(false);
    if (!subcategoryId) return;
    setLoading(true);
    getAllSubjects(subcategoryId, page, limit)
      .then(() => setLoading(false))
      .catch(err => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [subcategoryId, page, limit]);

  const subjects = allSubjects;
  const totalPages = Math.ceil(totalSubjects / limit);

  const handleClick = async (id) => {
    try {
      setLoading(true);
      localStorage.setItem('subjectId', id);
      // Pass page and limit (start from page 1)
      await getAllChapters(id, 1, 10); // 10 is default, or use your preferred limit

      setIsSidebarOpen(false);
      setLoading(false);
      navigate('/dashboard/course-details')
    } catch (error) {
      setLoading(false);
    }
  };

  // console.log(allSubjects)

  return (
    <BOX>
      <Box
        style={{ width: "100vw", minHeight: "100vh" }}
      >

        <Box
          maxW={{ base: "75%", md: "85%" }}
          width="952px"
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={{ base: "12px", sm: "16px", md: "18px" }}
          mx={"auto"}

        >
          <Box
            bg={"#FFFFFF"}
            width={"fit-content"}
            borderRadius={"50%"}
            color={"#1F6A75"}
            cursor={"pointer"}
            onClick={() => navigate('/dashboard')}
            padding={{ base: "8px", sm: "12px", md: "16px" }}
            fontSize={{ base: "16", sm: "18px", md: "24px" }}
            border={"none"}
            _hover={{
              transition: "color 0.3s ease",
              border: "1px solid #F49040",
              color: "#F49040",
              dropShadow: "0px 4px 24px #F4904075",
            }}
            _focus={{ outline: "none", boxShadow: "none", }}
          >
            <FiChevronLeft />
          </Box>
          <Box
            // mx={"auto"}
            px={{ base: 4, md: 6 }}
            py={{ base: "64px", md: "86px" }}
            textAlign="center"
            color="white"
          >
            <Heading
              fontSize={{ base: "32px", md: "42px" }}
              fontFamily="Poppins"
              fontWeight="600"
            >
              {/* {className}-Select Subject */}
              {allSubjects[0]?.SubCategory?.name} - Select Subject
            </Heading>
            <Text
              mt={{ base: "2px", md: "4px" }}
              fontSize={{ base: "18px", md: "24px" }}
              fontFamily="Poppins"
              fontWeight="200"
            >
              {/* Resource/{className}/ */}
              Resource/{allSubjects[0]?.SubCategory?.name}/
            </Text>
          </Box>
        </Box>

        <Box
          paddingY={{ base: "36px", md: "64px", lg: "86px" }}
          backgroundColor="white"
          borderTopLeftRadius={{ base: "24px", md: "36px", lg: "64px" }}
          borderTopRightRadius={{ base: "24px", md: "36px", lg: "64px" }}
          width="100%"
        >


          <Box maxW={{ base: "75%", md: "85%" }} width="952px" mx={"auto"}>

            <Box
              // mt={{ base: "36px", sm: "48px", md: "64px" }}
              maxW={{ base: "75%", md: "85%" }}
              width="952px"
              mx="auto"
            // border={"1px solid red"}
            >


              {/* Subjects Grid */}
              <Grid
                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={{ base: "18px", sm: "24px", md: "36px" }}
                width="100%"
              >
                {subjects.map((subject, index) => (
                  <Box
                    key={subject.id || index}
                    textAlign="center"
                    margin="auto"
                    display="flex"
                    // bgGradient="linear(to-br, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.2) 100%)"
                    bg={"white"}
                    flexDirection="column"
                    alignItems="center"
                    p={{ base: "24px", sm: "36px", md: "48px" }}
                    borderRadius={"24px"}
                    border="1px solid #CED4D3"
                    // boxShadow="lg"
                    backdropFilter="blur(60px)"
                    boxSize={"100%"}
                    w={"full"}
                    _hover={{
                      shadow: "xl",
                    }}
                    transition="all 0.3s ease"
                  >
                    <Heading
                      lineHeight="24px"
                      letterSpacing="1%"
                      mb={{ base: "16px", sm: "18px", md: "24px" }}
                      fontSize={{ base: "20px", sm: "24px", md: "28px" }}
                      fontFamily="Poppins"
                      fontWeight="semibold"
                      color="#F49040"
                      textTransform="uppercase"
                    >
                      {subject.name}
                    </Heading>
                    <Image
                      src={subject.imageUrl}
                      alt={subject.imageAlt}
                      objectFit="contain"
                      mb={{ base: "16px", sm: "18px", md: "24px" }}
                      boxSize="180px"
                      width="220px"
                      maxsm={{ width: "full", height: "auto" }}
                    />
                    <Text
                      mb={{ base: "16px", sm: "18px", md: "24px" }}
                      fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                      fontFamily="Poppins"
                      fontWeight="light"
                      lineHeight="100%"
                      letterSpacing="1%"
                      color="#1F6A75"
                    >
                      by {subject.description}
                    </Text>
                    <Button
                      px={4}
                      py={3}
                      fontWeight="light"
                      cursor="pointer"
                      transition="all 0.3s ease"
                      width={{ base: "136px", sm: "220px", md: "186px" }}
                      maxsm={{ width: "full" }}
                      bg="#F49040"
                      color="white"
                      borderRadius="30px"
                      h={{ base: "32px", sm: "38px", md: "42px" }}
                      fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                      _hover={{
                        border: "2px solid #F49040",
                        color: "#F49040",
                        bg: "none",
                        // boxShadow: "0px 2px 5px #F49040",
                      }}
                      _focus={{
                        outline: "none",
                        boxShadow: "none",
                      }}
                      onClick={() => handleClick(subject.id)}
                    >
                      See Detail
                    </Button>
                  </Box>
                ))}
              </Grid>

              <Flex
                width="100%"
                justify="center"
                align="center"
                mt={{ base: "18px", sm: "24px", md: "36px" }}
                mx={"auto"}
              >
                <Button
                  onClick={() => setPage(page - 1)}
                  isDisabled={page === 1}
                  mr={{ base: "4px", sm: "8px", md: "12px" }}
                  px={4}
                  py={3}
                  fontWeight="light"
                  cursor="pointer"
                  transition="all 0.3s ease"
                  width={{ base: "136px", sm: "220px", md: "186px" }}
                  maxsm={{ width: "full" }}
                  border="2px solid #F49040"
                  bg="none"
                  color="#F49040"
                  borderRadius="30px"
                  h={{ base: "36px", sm: "42px", md: "54px" }}
                  fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                  _hover={{
                    border: "none",
                    color: "white",
                    bg: "#F49040",
                    boxShadow: "0px 2px 5px #F49040",
                  }}
                  _disabled={{
                    bg: "none",
                    color: "#CED4D3",
                    border: "2px solid #CED4D3",
                    boxShadow: "none",
                    cursor: "not-allowed",

                  }}

                  _focus={{ outline: "none", boxShadow: "none", }}

                >
                  Previous
                </Button>
                <Text
                  mx={{ base: "4px", sm: "8px", md: "12px" }}
                  textAlign={"center"}
                  color="#1F6A75"
                  fontWeight="regular"
                  fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                >
                  Page {page} of {totalPages}
                </Text>
                <Button
                  onClick={() => setPage(page + 1)}
                  isDisabled={page === totalPages || totalPages === 0}
                  ml={{ base: "4px", sm: "8px", md: "12px" }}
                  px={4}
                  py={3}
                  fontWeight="light"
                  cursor="pointer"
                  transition="all 0.3s ease"
                  width={{ base: "136px", sm: "220px", md: "186px" }}
                  // maxsm={{ width: "full" }}
                  border="2px solid #F49040"
                  bg="none"
                  color="#F49040"
                  borderRadius="30px"
                  h={{ base: "36px", sm: "42px", md: "54px" }}
                  fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                  _hover={{
                    border: "none",
                    color: "white",
                    bg: "#F49040",
                    boxShadow: "0px 2px 5px #F49040",
                  }}
                  _disabled={{
                    bg: "none",
                    color: "#CED4D3",
                    border: "2px solid #CED4D3",
                    boxShadow: "none",
                    cursor: "not-allowed",

                  }}

                  _focus={{ outline: "none", boxShadow: "none", }}

                >
                  Next
                </Button>
              </Flex>
            </Box>

          </Box>

        </Box>

      </Box>
    </BOX>
  );
}

export default DashboardSubjectSelection;