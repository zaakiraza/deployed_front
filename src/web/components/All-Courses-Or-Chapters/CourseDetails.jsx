import React, { useEffect, useState } from "react";
import CourseList from "./CourseList";
import CourseGrid from "./CourseGrid";
import gridactive from "../../../assets/gridactive.svg";
import gridinactive from "../../../assets/gridinactive.svg";
import listactive from "../../../assets/listactive.svg";
import listinactive from "../../../assets/listinactive.svg";
import BOX from "../../views/BOX";
import { Box, Button, Heading, Input, Text ,Flex} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { useChapterContext } from "../../context/WebChapterContext";
import { useNavigate } from "react-router-dom";


function CourseDetails({setSelectedView}) {
  const navigate = useNavigate();
  const [listVeiw, setListVeiw] = useState(false);
  const [gridVeiw, setgridVeiw] = useState(true);
  const handlelistView = () => {
    setListVeiw(true);
    setgridVeiw(false);
  };
  const handlegridView = () => {
    setListVeiw(false);
    setgridVeiw(true);
  };
  const { allChapters, getAllChapters, totalChapters } = useChapterContext();

   const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const totalPages = Math.ceil(totalChapters / limit);

  useEffect(()=>{},[page])

// Fetch chapters when page or limit changes
   const handlePageChange = (newPage) => {
    const subjectId = localStorage.getItem('subjectId');
    if (subjectId) {
      getAllChapters(subjectId, newPage, limit);
      setPage(newPage);
    }
  };

 useEffect(() => {
  localStorage.setItem('dashboardchapter', JSON.stringify(allChapters));
}, [allChapters]);

   const studentEnrolChapStr = localStorage.getItem('dashboardchapter');
  let studentEnrolChap = [];
  try {
    studentEnrolChap = studentEnrolChapStr ? JSON.parse(studentEnrolChapStr) : [];
  } catch {
    studentEnrolChap = [];
  }
  const subjectName = studentEnrolChap[0]?.Subject.name;
  const className = studentEnrolChap[0]?.Subject.SubCategory.name;
 
  


  return (
    <BOX>
      <Box style={{ width: "100vw", minHeight: "100vh" }}>
        <Box
        maxW={{ base: "75%", md: "85%" }}
            width="952px"
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={{base: "12px", sm: "16px" ,md: "18px"}}
        mx={"auto"}

        >
          <Box 
          bg={"#FFFFFF"}
          width={"fit-content"}
          borderRadius={"50%"}
          color={"#1F6A75"}
          cursor={"pointer"}
          onClick={() => navigate('/dashboard/subject-selection')}
          padding={{ base: "8px" , sm: "12px", md: "16px" }}
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
            <FiChevronLeft/>
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
              {className}-
              {subjectName}-CHAPTERS
            </Heading>
            <Text
              mt={{base: "2px", md: "4px"}}
              fontSize={{ base: "18px", md: "24px" }}
              fontFamily="Poppins"
              fontWeight="200"
            >
              Resource/{className}/{subjectName}/
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
            <Heading
              color={"#1F6A75"}
              fontSize={{ base: "24px", md: "32px", lg: "36px" }}
            >
              Chapters
            </Heading>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // Corrected here
              }}
              gap={"12px"}
              marginTop={{ base: "18px", md: "24px", lg: "36px" }}
            >
              <Input
                type="text"
                placeholder="Search..."
                height={"48px"}
                width={{ base: "192px", sm: "252px", md: "352px", lg: "402px" }}
                padding={{
                  base: "12px 12px 12px 36px",
                  md: "12px 12px 12px 48px",
                }} // Extra left padding for the icon
                _focus={{ outline: "none", boxShadow: "none", }}
                style={{
                  border: "1px solid #CED4D3",
                  outline: "none",
                  borderRadius: "24px",
                  backgroundImage:
                    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23777" width="18px" height="18px"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>\')',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "12px center",
                  backgroundSize: "18px",
                }}
              />

              <Box
                display={{ base: "none", md: "flex" }}
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #CED4D3",
                  borderRadius: "24px",
                  width: "fit-content",
                  height: "48px",
                  backgroundColor: "white",
                }}
                padding={{ base: "6px", md: "8px" }}
              >
                <Button
                  onClick={handlegridView}
                  style={{
                    border: "none",
                    background: "none",
                    outline: "none",
                  }}
                  display={{ base: "none", md: "block" }}
                  padding={{ base: "0 8px", md: "0 12px" }}
                >
                  {gridVeiw ? (
                    <img src={gridactive} width={"16px"} />
                  ) : (
                    <img src={gridinactive} width={"12px"} />
                  )}
                </Button>

                <Button
                  onClick={handlelistView}
                  style={{
                    border: "none",
                    background: "none",
                    outline: "none",
                  }}
                  display={{ base: "none", md: "block" }}
                  padding={{ base: "0 8px", md: "0 12px" }}
                >
                  {listVeiw ? (
                    <img src={listactive} width={"16px"} />
                  ) : (
                    <img src={listinactive} width={"12px"} />
                  )}
                </Button>
              </Box>
            </Box>
          </Box>

          {listVeiw ? <CourseList chapters={allChapters}setSelectedView={setSelectedView}/> : <CourseGrid chapters={allChapters}setSelectedView={setSelectedView}/>}
           {/* Pagination Controls */}

           
           <Flex
                width="100%"
                justify="center"
                align="center"
                mt={{ base: "18px", sm: "24px", md: "36px" }}
                mx={"auto"}
              >
                <Button
          onClick={() => handlePageChange(page - 1)}
          isDisabled={page === 1}
                  mr={{ base: "4px", sm: "8px", md: "12px" }}
                  px={4}
                  py={3}
                  fontWeight="light"
                  cursor="pointer"
                  transition="all 0.3s ease"
                  width={{ base: "136px", sm: "220px", md: "186px" }}
                  // maxSm={{ width: "full" }}
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
          onClick={() => handlePageChange(page + 1)}
          isDisabled={page === totalPages || totalPages === 0}
                  ml={{ base: "4px", sm: "8px", md: "12px" }}
                  px={4}
                  py={3}
                  fontWeight="light"
                  cursor="pointer"
                  transition="all 0.3s ease"
                  width={{ base: "136px", sm: "220px", md: "186px" }}
                  // maxSm={{ width: "full" }}
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
    </BOX>
  );
}

export default CourseDetails;
