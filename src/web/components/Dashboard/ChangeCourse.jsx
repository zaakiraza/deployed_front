import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FiArrowRight, FiChevronDown, FiBookOpen } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DashboardSubjectDetails from "./DashboardSubjectDetails";
import BOX from "../../views/BOX";

function ChangeCourse({ setSelectedView, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const [classId, setClassId] = useState("");
  const [availableClasses, setAvailableClasses] = useState([]);

  useEffect(() => {
    setIsSidebarOpen(false);
    try {
      const studentEnrollmentStr = localStorage.getItem("studentEnrollmentData");
      if (studentEnrollmentStr) {
        const studentEnrollmentData = JSON.parse(studentEnrollmentStr);
        const transformedData = Array.isArray(studentEnrollmentData)
          ? studentEnrollmentData.map((data) => ({
              id: data?.subcategory?.id || "",
              name: data?.subcategory?.name || "Unknown Class",
            }))
          : [];

        setAvailableClasses(transformedData);
          if (localStorage.getItem('subcategoryId')){
          setClassId(Number(localStorage.getItem('subcategoryId')))
          // console.log(classId)
        }
      }
    } catch (error) {
      console.error("Error parsing enrollment data:", error);
      setAvailableClasses([]);
    }
  }, []);

  const handleChange = (value) => {
    setClassId(value);
  };

  const handleSetId = () => {
    if (classId) {
      localStorage.setItem("subcategoryId", classId);
      navigate("/dashboard");
    } else {
      alert("Please select a class first");
    }
  };

  return (
    <BOX>
      <Box
        mt={{ base: "36px", sm: "48px", md: "64px" }}
        bgGradient="linear(to-br, rgba(0, 82, 89, 1) 0%, rgba(255, 255, 255, 0.45) 100%)"
        maxW={{ base: "75%", md: "85%" }}
        width="952px"
        mx="auto"
        display="flex"
        flexDirection="column"
        py={{ base: "20px", sm: "32px", md: "40px" }}
        gap={{ base: "12px", sm: "18px", md: "24px" }}
        borderRadius="24px"
        alignItems="center"
        justifyContent="space-between"
        fontFamily="'Poppins', sans-serif"
        flexWrap="wrap"
        boxShadow="2xl"
        border="1px solid #ffffffff"
        backdropFilter="blur(24px)"
        zIndex={10}
      >
        <Box maxW={{ base: "80%", sm: "90%", md: "100%" }} width="500px">
          <Heading
            color="#F49040"
            textAlign="center"
            mt={{ base: "2px", sm: "8px", md: "12px" }}
            mb={{ base: "16px", sm: "24px", md: "36px" }}
            fontSize={{ base: "24px", sm: "28px", md: "36px" }}
            fontWeight="bold"
          >
            Switch Classes
          </Heading>

          <Box>
            <Text
              as="span"
              color="#FFF"
              fontSize={{ base: "12px", sm: "14px" }}
              mb={2}
              ml={3}
              fontWeight="light"
            >
              Select Class
            </Text>
            <Menu placement="bottom" matchWidth>
              <MenuButton
                as={Button}
                rightIcon={<FiChevronDown color="#F49040" size="20" />}
                bg="white"
              h={{ base: "42px", sm: "48px", md: "52px" }}
              borderRadius="30px"
              color="#A2ABAA"
              iconcolor="#F49040"

                w="100%"
                textAlign="left"
                border={"1px solid #CED4D3"}
                _focus={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                _active={{ outline: "none", boxShadow: "0px 0px 12px #F49040", border: "1px solid #F49040", bg: "white" }}
                _hover={{ outline: "none", boxShadow: "none", border: "1px solid #F49040", bg: "white" }}
                pl={{
                base: "12px",
                sm: "16px",
                md: "20px",
              }}
              >
                <Box display="flex" alignItems="center">
                  <Box
                    mr={{ base: "8px", sm: "12px", md: "16px" }}
                    color="#F49040"
                    fontSize={{ base: "14px", sm: "18px", md: "20px" }}
                  >
                    <FiBookOpen />
                  </Box>
                  <Text
                    as="span"
                    fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                    fontWeight="regular"
                    color="#0D0D0D"
                  >
                    {classId
                      ? availableClasses.find((cls) => cls.id === classId)?.name
                      : "Select your Class"}
                  </Text>
                </Box>
              </MenuButton>
              <MenuList
                width="auto"
                boxShadow="0 0 4px #A2ABAA"
                border="1px solid #A2ABAA"
                borderRadius="12px"
                zIndex={10}
                py={0}
                bg="#FFFFFF"
                maxHeight="240px"
                overflowY="auto"
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "8px",
                    borderRadius: "8px",
                    backgroundColor: "#A2ABAA",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#A2ABAA",
                    borderRadius: "8px",
                  },
                }}
              >
                {availableClasses.length > 0 ? (
                  availableClasses.map((cls) => (
                    <MenuItem
                      key={cls.id}
                      onClick={() => handleChange(cls.id)}
                      pl={{ base: "12px", sm: "14px", md: "16px" }}
                      h="42px"
                      _hover={{ bg: "#FFF", border: "1px solid #A2ABAA" }}
                      justifyContent="flex-start"
                      fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                      fontWeight="regular"
                      color="#0D0D0D"
                    >
                      {cls.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem
                    pl={{ base: "12px", sm: "14px", md: "16px" }}
                    h="42px"
                    _hover={{ 
                      bg: "#FFF", 
                      border: "1px solid #A2ABAA",
                    }}
                    _focus={{ outline: "none", boxShadow: "none", }}
                    justifyContent="flex-start"
                    fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                    fontWeight="regular"
                    color="#0D0D0D"
                    isDisabled
                  >
                    No classes available
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap={{ base: "4px", sm: "8px", md: "12px" }}
            mt={{ base: "12px", sm: "16px", md: "20px" }}
            mb={{ base: "2px", sm: "8px", md: "12px" }}
          >
            <Button
              bg="none"
          width="50%"
          borderRadius="30px"
          type="button"
          border="1.5px solid #ffffffff"
          color="#CED4D3"
          h={{ base: "32px", sm: "42px", md: "52px" }}
          fontSize={{ base: "12px", sm: "14px", md: "16px" }}
          fontWeight={"300"}
          _focus={{ outline: "none", boxShadow: "none", }}
          _hover={{
            border: "none",
            color: "#1F6A75",
            bg: "#CED4D3",
            fontWeight: "400",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={()=>{setClassId("")}}
            >
              Cancel
            </Button>
            <Button
              bg="#F49040"
          color="white"
          width="100%"
          borderRadius="30px"
          type="submit"
          h={{ base: "32px", sm: "42px", md: "52px" }}
          fontSize={{ base: "12px", sm: "14px", md: "16px" }}
          fontWeight={"300"}
          _focus={{ outline: "none", boxShadow: "none", }}
          _hover={{
            border: "1.5px solid #F49040",
            color: "#F49040",
            bg: "none",
            boxShadow: "0px 0px 8px #F49040",
            fontWeight: "400",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={handleSetId}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Box>

      <DashboardSubjectDetails setSelectedView={setSelectedView} />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="1px solid #F49040"
        py={{ base: "12px", sm: "16px", md: "18px" }}
        px={{ base: "18px", sm: "24px", md: "36px" }}
        borderRadius="36px"
        my={{ base: "18px", sm: "24px", md: "36px" }}
        color="#F49040"
        fontSize={{ base: "16px", sm: "18px", md: "24px" }}
        gap={{ base: "8px", sm: "12px", md: "16px" }}
        cursor={"pointer"}
        _focus={{ outline: "none", boxShadow: "none", }}
        _hover={{
          bg: "#F49040",
          color: "white",
          transition: "all 0.3s ease-in-out",
        }}
        onClick={() => navigate("/dashboard/category")}
      >
        <Text as="span">Enroll in another Class</Text>
        <FiArrowRight />
      </Box>
    </BOX>
  );
}

export default ChangeCourse;
