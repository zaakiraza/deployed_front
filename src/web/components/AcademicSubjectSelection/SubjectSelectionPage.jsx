import React from "react";
import { Box, Button, Grid, Heading, Image, Stack, Text, VStack, Flex, Spinner,Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom"; // ✅ Import
import { useNavigate } from "react-router-dom";
import { useSubjectContext } from "../../context/WebSubjectContext"; // ✅ Import the subject context
import { useChapterContext } from "../../context/WebChapterContext";
import { useWebUserContext } from "../../context/WebUserContext";
import { useEnrollmentContext } from "../../context/WebEnrollmentContext"; // ✅ Import the enrollment context
import BOX from '../../views/BOX';


function EnrollButton({ subcategoryId }) {
  const navigate = useNavigate();
  // const { loginUserInfo, userLoginToken } = useWebUserContext(); // ✅ Get user info from context
  const { studentEnrollments, setLoading, loading } = useEnrollmentContext(); // ✅ Get enrollment function from context

  const loginUserStr = localStorage.getItem("userInfo");
  const loginUser = loginUserStr ? JSON.parse(loginUserStr) : null;
  const userLoginToken = localStorage.getItem("userToken");

  const handleEnrollment = async () => {
    setLoading(true); // Set loading state to true
    try {
      // console.log("Handling enrollment for subcategoryId:", subcategoryId);
      // console.log("token", userLoginToken)
      // console.log('loginUser', loginUser)
      if (!loginUser || !userLoginToken) {
        setLoading(false); // Set loading state to false
        alert("Please log in to enroll in a subject.");
        navigate('/login');
        return;
      }

      if (!subcategoryId) {
        setLoading(false); // Set loading state to false
        alert("No subject selected for enrollment.");
        navigate("/dashboard");
        return;
      }

      // console.log("userInfo", loginUser);
      const userId = loginUser?.id;
      // console.log(userId);
      // console.log("Enrolling user:", userId, "in subcategory:", subcategoryId, "with token:", userLoginToken);

      const response = await studentEnrollments({
        studentId: userId,
        userToken: userLoginToken,
        subcategoryId,
      });

      // console.log(response);

      if (response.success === false) {
        setLoading(false); // Set loading state to false
        // If enrollment was not successful (either due to conflict or other errors)
        alert(response.message || "An error occurred. Please try again.");
        navigate("/dashboard");
      } else {
        setLoading(false); // Set loading state to false
        // If enrollment is successful
        alert("Enrollment successful!");
        navigate("/dashboard");

      }
    } catch (error) {
      setLoading(false); // Set loading state to false
      // console.error("Enrollment error:", error);
      alert("An error occurred during enrollment");
      navigate("/dashboard");
    }
  };


  return (
    <Button
    mb={{ base: "64px", sm: "86px", md: "136px" }}

      transition="all 0.2s ease-in-out"
      px={4}
      py={3}
      fontWeight="light"
      cursor="pointer"
      width={{ base: "90%", md: "50%" }}
      // maxSm={{ width: "full" }}
      bg="#F49040"
      color="white"
      borderRadius="30px"
      h={{ base: "48px", sm: "54px", md: "64px" }}
      fontSize={{ base: "14px", sm: "16px", md: "18px" }}
      _hover={{
        border: "2px solid #F49040",
        color: "#F49040",
        bg: "none",
        boxShadow: "0px 2px 5px #F49040",
      }}
      _focus={{ outline: "none", boxShadow: "none", }}


      onClick={handleEnrollment}
      isLoading={loading} // Chakra UI will show a spinner
      loadingText="Enrolling..."
      disabled={loading}

    >
      Enroll Now
    </Button>
  );
}

function SelectSubjectHeader({ className }) {
  return (
    <Box
      position="relative"
      mb={9}
      h="82px"
      w={{ base: "100%", md: "952px" }}
      borderRadius="3xl"
      border="1px solid"
      borderColor="orange.400"
      boxShadow="2xl"
      backdropFilter="blur(60px)"
      background="linear-gradient(280.65deg, rgba(244, 144, 64, 0.8) 0.35%, rgba(244, 144, 64, 0.35) 100%)"
    >
      <Heading
        as="h2"
        size="xl"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        color="white"
        textAlign="center"
        fontWeight="bold"
      >
        Select Subject ({className})
      </Heading>
    </Box>
  );
}

// function SubjectCard({ title, instructor, imageUrl, imageAlt, id }) {
//   const navigate = useNavigate();

//   const {
//     allChapters,

//     loading,
//     setLoading,
//     setError,
//     error,
//     getAllChapters,
//     setFilteredChapters,
//   } = useChapterContext(); 

//   // const handleClick = async() => {
//   //   setLoading(true);
//   //   setError(null);
//   //   try {
//   //     await getAllChapters();
//   //     console.log(`Subject ID ${id}`)
//   //     const filtered = allChapters.filter((chapter) => chapter.subjectId === id);
//   //     setFilteredChapters(filtered);
//   //     console.log("Filtered Chapters:", filtered);
//   //     setLoading(false);

//   //   } catch (error) {
//   //     setError(error.message || "Something went wrong");
//   //     setLoading(false);
//   //   }
//   //   navigate("/subject-details");
//   // };


// const handleClick = async() => {
//     // setLoading(true);
//     // setError(null);
//     const navigate = useNavigate();
//     try {
//       await getAllChapters();
//       const filtered = allChapters.filter((chapter) => chapter.subjectId === id);
//       setFilteredChapters(filtered);
//       console.log("Filtered Chapters:", filtered);
//       setLoading(false);

//     } catch (error) {
//       // setError(error.message || "Something went wrong");
//       // setLoading(false);
//     }
//     navigate("/subject-details");
//   };

//   return (
//     <Box
//       position="relative"
//       h="484px"
//       w={{ base: "100%", md: "458px" }}
//       borderRadius="3xl"
//       border="1.5px solid"
//       borderColor="whiteAlpha.500"
//       bgGradient="linear(to-br, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.2) 100%)"
//       boxShadow="2xl"
//       backdropFilter="blur(60px)"
//       px={{ base: 4, md: 5 }}
//       py={{ base: 8, md: 14 }}
//       textAlign="center"
//     >
//       <Stack spacing={3} align="center">
//         <Heading size={{ base: "lg", md: "2xl" }} color="white">
//           {title}
//         </Heading>
//         <Image
//           src={imageUrl}
//           alt={imageAlt}
//           objectFit="contain"
//           h={{ base: "178px", md: "238px" }}
//           w={{ base: "200px", md: "268px" }}
//         />
//         <Text fontSize="md" color="white">
//           by {instructor}
//         </Text>
//         <Button
//   bg="orange.400"
//   color="white"
//   borderRadius="30px"
//   w="286px"
//   h="48px"
//   transition="all 0.2s ease-in-out"
//   _hover={{
//     bg: "white",
//     color: "orange.400",
//   }}
//   onClick={handleClick}
// >
//   See Detail
// </Button>
//       </Stack>
//     </Box>
//   );
// }




function SubjectSelectionPage() {
  const {userLoginToken} = useWebUserContext();
  const token = userLoginToken || localStorage.getItem("userToken");
  const { className } = useParams();
  const navigate = useNavigate();
  const formattedClassName = className?.replace(/-/g, " ").toUpperCase();
  const { allSubjects, page, setPage, limit, setLimit, totalSubjects } = useSubjectContext(); // ✅ Use the subject context to get all subjects
  const { setLoading, getAllChapters, } = useChapterContext();
  const subjects = allSubjects;
  console.log("Subjects in SubjectSelectionPage:", subjects);
  const handleClick = async (id) => {

    try {
      setLoading(true);
      // console.log("Selected Subject ID:", id);
      await getAllChapters(id);

      setLoading(false);

    } catch (error) {
      // setError(error.message || "Something went wrong");
      // setLoading(false);
    }
    if(!token){navigate("/subject-details");}
    else{navigate(`/dashboard/category/digitalschool-classes/subjects/${formattedClassName}/subject-details`)}
  };
  const totalPages = Math.ceil(totalSubjects / limit);
  // const subcategoryId = subjects[0]?.subcategoryId; 
  // localStorage.setItem("subcategoryId", subcategoryId);

  return (
    <BOX>
      <Box
        mt={{ base: "136px", sm: "142px", md: "156px" }}
        maxW={{ base: "75%", md: "85%" }}
        width="952px"
        mx={"auto"}
        fontFamily="Poppins"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
      >
        <VStack spacing={{ base: "18px", sm: "24px", md: "36px" }}>
          {/* Header */}
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
              Select Subject{" "}
              {formattedClassName ? `(${formattedClassName})` : ""}
            </Text>
          </Box>

          <Flex
            gap={{ base: "18px", sm: "24px", md: "36px" }}
            flexDirection={{ base: "column", sm: "row" }}
            flexWrap="wrap"
            maxW="952px"
            width="90%"
            justify="center"
            align="center"
          >
            {/* Subjects Grid */}
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Two columns on medium and larger screens
              gap={{ base: "18px", sm: "24px", md: "36px" }}
              width="100%" // Ensure grid takes full width
            >
              {subjects.map((subject, index) => (
                <Box
                  key={index}
                  textAlign="center"
                  margin="auto" // Center the card
                  display="flex"
                  
                  bgGradient="linear(to-br, rgba(0, 82, 89, 1) 0%, rgba(255, 255, 255, 0.45) 100%)"
                  flexDirection="column"
                  alignItems="center"
                  p={{ base: "24px", sm: "36px", md: "48px" }}
                  borderRadius={"24px"}
                  border="1px solid"
                  borderColor="#ffffffff"
                  boxShadow="lg"
                  backdropFilter="blur(60px)"
                  boxSize={"100%"} // Responsive box size
                  // maxWidth={{ base: "full", sm: "320px", md: "400px" }}
                  w={"full"}
                // width={{ base: "100%", md: "45%" }}
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
                    boxSize="300px"
                    width="280px"
                    
                  // border={"1px solid #F49040"}
                  // maxSm={{ width: "full", height: "auto" }}
                  />
                  <Text
                    mb={{ base: "16px", sm: "18px", md: "24px" }}
                    fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                    fontFamily="Poppins"
                    fontWeight="light"
                    lineHeight="100%"
                    letterSpacing="1%"
                    color="#ffffff"
                  >
                    {subject.description}
                  </Text>
                  <Button
                    px={4}
                    py={3}
                    fontWeight="light"
                    cursor="pointer"
                    transition="all 0.3s ease"
                    width={{ base: "136px", sm: "220px", md: "186px" }}
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
                    _focus={{ outline: "none", boxShadow: "none", }}
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
            // my={{ base: "18px", sm: "24px", md: "36px" }}
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
                      color: "#FFFFFF50",
                      border: "2px solid #FFFFFF50",
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
               color="#FFFFFF" 
               fontWeight="light"
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
                      color: "#FFFFFF50",
                      border: "2px solid #FFFFFF50",
                      boxShadow: "none",
                      cursor: "not-allowed",
                      
                    }}
                    
                    _focus={{ outline: "none", boxShadow: "none", }}
              >
                Next
              </Button>
            </Flex>
          </Flex>
          {/* {console.log("Subjects ", subjects)} */}
          <EnrollButton subcategoryId={subjects[0]?.subcategoryId} />
        </VStack>
      </Box>
    </BOX>
  );
}

export default SubjectSelectionPage;