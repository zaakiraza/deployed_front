import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContactFormSection from "../ContactUs/ContactFormSection";
import axios from "axios";
import { Global, css } from "@emotion/react";
import {
  Box,
  Button,
  Text,
  Flex,
  Heading,
  RadioGroup,
  CircularProgress,
  CircularProgressLabel,
  VStack,
  Stack,
  Radio,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Image,
  Divider,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiChevronLeft, FiUser, FiCamera } from "react-icons/fi";
import { GoLock, GoQuestion, GoSignOut } from "react-icons/go";
import BOX from "../../views/BOX";
import { option } from "framer-motion/client";

const RemoveAccordionOutlines = () => (
  <Global
    styles={css`
      /* Target Accordion button to remove blue outline on hover */
      .chakra-accordion__button:hover {
        box-shadow: none !important;
        outline: none !important;
        border: none !important;
      }

      /* Target Accordion button to remove black outline on click/focus */
      .chakra-accordion__button:focus,
      .chakra-accordion__button[data-focus],
      .chakra-accordion__button:active,
      .chakra-accordion__button[aria-expanded="true"] {
        box-shadow: none !important;
        outline: none !important;
        border: none !important;
      }

      /* Override Chakra UI's default focus styles completely */
      .chakra-accordion button:focus-visible {
        outline: none !important;
        box-shadow: none !important;
        border: none !important;
      }

      /* Target expanded accordion state */
      .chakra-accordion__item [aria-expanded="true"] {
        box-shadow: none !important;
        outline: none !important;
        border: none !important;
      }

      /* Remove all outlines from accordion components */
      .chakra-accordion *,
      .chakra-accordion *:hover,
      .chakra-accordion *:focus,
      .chakra-accordion *:active {
        outline: none !important;
        box-shadow: none !important;
      }

      /* Target all buttons specifically */
      .chakra-button:focus,
      .chakra-button:hover,
      .chakra-button:active,
      .chakra-button[data-focus],
      .chakra-button[data-hover],
      .chakra-button[data-active] {
        outline: none !important;
        box-shadow: none !important;
        border-color: inherit !important;
      }

      /* Account settings buttons specific styles */
      button[variant="outline"]:focus,
      button[variant="outline"]:hover,
      button[variant="outline"]:active,
      .chakra-button[aria-label="Change Password"]:focus,
      .chakra-button[aria-label="Change Password"]:hover,
      .chakra-button[aria-label="Help"]:focus,
      .chakra-button[aria-label="Help"]:hover,
      .chakra-button[aria-label="Logout"]:focus,
      .chakra-button[aria-label="Logout"]:hover {
        outline: none !important;
        box-shadow: none !important;
      }

      /* Extra specificity for outline variant buttons */
      .chakra-button[data-focus][variant="outline"],
      .chakra-button[data-hover][variant="outline"] {
        outline: none !important;
        box-shadow: none !important;
      }

      /* Extremely aggressive style to prevent any focus styles */
      *:focus {
        outline: none !important;
        box-shadow: none !important;
      }

      /* Target Chakra UI's focus rings specifically */
      [data-focus],
      [data-focus-visible],
      [data-hover],
      [data-active],
      *[data-focus],
      *[data-hover],
      *[data-active] {
        outline: none !important;
        box-shadow: none !important;
        border-color: inherit !important;
      }

      /* Additional specificity for accordion buttons */
      .chakra-accordion__button::before,
      .chakra-accordion__button::after {
        outline: none !important;
        box-shadow: none !important;
        border: none !important;
      }
    `}
  />
);

const ProfilePageRedesign = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const baseURL =
    "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api";
  const token = localStorage.getItem("userToken");
  const [savedFormData, setSavedFormData] = useState({
    personalInfo: null,
    educationalInfo: null,
  });

  const [showHelpForm, setShowHelpForm] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    youAre: "",
    city: "",
    country: "",
  });
  const [educationalInfo, setEducationalInfo] = useState({
    className: "",
    institutionType: "",
    institutionName: "",
    boardSystem: "",
    passingYear: "",
    isCurrentEducation: false,
  });

  const calculateProfileCompletion = () => {
    let completion = 0;

    // Check personal info fields
    const personalFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "youAre",
      "city",
      "country",
    ];
    const filledPersonalFields = personalFields.filter(
      (field) =>
        personalInfo[field] && personalInfo[field].toString().trim() !== ""
    );
    // Calculate percentage based on filled fields
    const personalPercentage = Math.floor(
      (filledPersonalFields.length / personalFields.length) * 50
    );
    completion += personalPercentage;

    // Check educational info fields
    const eduFields = [
      "className",
      "institutionType",
      "institutionName",
      "boardSystem",
      "passingYear",
    ];
    const filledEduFields = eduFields.filter(
      (field) =>
        educationalInfo[field] &&
        educationalInfo[field].toString().trim() !== ""
    );
    // Calculate percentage based on filled fields
    const eduPercentage = Math.floor(
      (filledEduFields.length / eduFields.length) * 50
    );
    completion += eduPercentage;

    return completion;
  };
  const completionPercentage = calculateProfileCompletion();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!token) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }
        const response = await axios.get(`${baseURL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        if (response.data.status === true && response.data.data) {
          const apiUser = response.data.data;
          if (apiUser.imageUrl) setAvatar(apiUser.imageUrl);
          let formattedDOB = "";
          if (apiUser.dob) {
            formattedDOB = new Date(apiUser.dob).toISOString().split("T")[0];
          }
          setPersonalInfo({
            firstName: apiUser.firstName || "",
            lastName: apiUser.lastName || "",
            dateOfBirth: formattedDOB,
            gender: apiUser.gender || "",
            imageUrl: apiUser.imageUrl || "",
            youAre: apiUser.youAre || "",
            city: apiUser.city || "",
            country: apiUser.country || "",
          });
          if (
            Object.keys(apiUser.educationalInfo).length != 0 ||
            apiUser.educationalInfo.length != 0
          ) {
            const latestEducation = apiUser.educationalInfo[0];
            setEducationalInfo({
              className: latestEducation.className || null,
              institutionType: latestEducation.institutionType || null,
              institutionName: latestEducation.institutionName || null,
              boardSystem: latestEducation.boardSystem || null,
              passingYear: latestEducation.passingYear || null,
              isCurrentEducation: latestEducation.isCurrentEducation || false,
            });
          }
        } else {
          setError(response.data.message || "Failed to fetch user data");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching user data");
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [toast]);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !(file.type === "image/jpeg" || file.type === "image/png")) {
      toast({
        title: "Invalid file format",
        description: "Please select a JPEG or PNG image.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const fileType = file.type;
    const fileName = `${Date.now()}-${file.name}`;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${baseURL}/s3/upload-url?fileType=${encodeURIComponent(
          fileType
        )}&fileName=${encodeURIComponent(fileName)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status && res.data.data.uploadUrl) {
        const uploadUrl = res.data.data.uploadUrl;
        await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": fileType,
          },
          body: file,
        });
        const imageUrl = uploadUrl.split("?")[0];
        console.log("Uploaded image URL:", imageUrl);
        // imageUrl = "d1anu2ld58f7nz.cloudfront.net"
        setAvatar(imageUrl);
        setPersonalInfo((prev) => ({
          ...prev,
          imageUrl,
        }));
        setSavedFormData((prevData) => ({
          ...prevData,
          personalInfo: {
            ...(prevData.personalInfo || personalInfo),
            imageUrl,
          },
        }));
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been uploaded.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error getting upload URL",
          description: res.data.message || "Failed to get S3 upload URL.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error uploading image",
        description:
          err.response?.data?.message ||
          err.message ||
          "Failed to upload image.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEducationalInfoChange = (field, value) => {
    if (field === "passingYear") {
      const currentYear = new Date().getFullYear();
      const isCurrentEducation = parseInt(value) >= currentYear;

      setEducationalInfo((prev) => ({
        ...prev,
        [field]: value,
        isCurrentEducation,
      }));
    } else {
      setEducationalInfo((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmitPersonalInfo = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        throw new Error("No authentication token found");
      }
      setIsLoading(true);
      setSavedFormData((prevData) => ({
        ...prevData,
        personalInfo: { ...personalInfo },
      }));

      toast({
        title: "Personal information saved successfully",
        description: "Your personal information has been saved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error saving personal information",
        description:
          err.response?.data?.message ||
          err.message ||
          "Failed to save personal information",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitEducationalInfo = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        throw new Error("No authentication token found");
      }
      setIsLoading(true);
      const requiredFields = [
        "className",
        "institutionType",
        "institutionName",
        "boardSystem",
        "passingYear",
      ];
      const hasAllRequiredFields = requiredFields.every(
        (field) =>
          educationalInfo[field] &&
          educationalInfo[field].toString().trim() !== ""
      );
      if (!hasAllRequiredFields) {
        throw new Error(
          "Please fill in all required educational information fields"
        );
      }
      setSavedFormData((prevData) => ({
        ...prevData,
        educationalInfo: { ...educationalInfo },
      }));
      toast({
        title: "Educational information saved successfully",
        description: "Your educational information has been saved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error saving educational information",
        description:
          err.response?.data?.message ||
          err.message ||
          "Failed to save educational information",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleChangePassword = () => {
    navigate("/forgotpassword");
  };

  const handleHelp = () => {
    setShowHelpForm(!showHelpForm);
  };

  const handleUpdateProfile = async () => {
    try {
      setIsUpdating(true);
      const hasPersonalInfo =
        savedFormData.personalInfo ||
        Object.values(personalInfo).some((v) => v);
      const hasEducationalInfo = savedFormData.educationalInfo;
      if (!hasPersonalInfo && !hasEducationalInfo) {
        toast({
          title: "No changes to update",
          description:
            "Please save changes in at least one section before updating profile",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        setIsUpdating(false);
        return;
      }

      const profilePersonalInfo = personalInfo;
      const formattedProfileData = {
        firstName: profilePersonalInfo?.firstName || "",
        lastName: profilePersonalInfo?.lastName || "",
        dob: profilePersonalInfo?.dateOfBirth || "",
        gender: profilePersonalInfo?.gender || "",
        imageUrl: profilePersonalInfo?.imageUrl || "",
        youAre: "Professional",
        educationalInfo: {
          className: educationalInfo.className || "",
          institutionType: educationalInfo.institutionType || "",
          institutionName: educationalInfo.institutionName || "",
          boardSystem: educationalInfo.boardSystem || "",
          passingYear: parseInt(educationalInfo.passingYear) || 0,
          isCurrentEducation: educationalInfo.isCurrentEducation || false,
        },
      };

      if (!token) {
        throw new Error("No authentication token found");
      }

      const loadingToastId = toast({
        title: "Updating profile...",
        description: "Please wait while your profile is being updated",
        status: "loading",
        duration: null,
        isClosable: false,
      });

      const response = await axios.put(
        `${baseURL}/users/profile`,
        formattedProfileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.close(loadingToastId);

      toast({
        title: "Profile updated successfully",
        description: `Status: ${
          response.data.status ? "Success" : "Failed"
        } - ${response.data.message || "Profile updated"}`,
        status: response.data.status ? "success" : "warning",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update profile";
      toast({
        title: "Error updating profile",
        description: `Error: ${errorMessage}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      if (err.response?.data) {
        console.log("API Error Details:", err.response.data);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <BOX>
      <RemoveAccordionOutlines />

      <Box style={{ width: "100vw", minHeight: "100vh" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="50px 0"
        >
          <Box
            bg="#FFFFFF"
            width="fit-content"
            borderRadius="50%"
            color="#1F6A75"
            cursor="pointer"
            onClick={() => navigate(-1)}
            padding={{ base: "8px", sm: "12px", md: "16px" }}
            fontSize={{ base: "16", sm: "18px", md: "24px" }}
            border={"1px solid white"}
            _hover={{
              transition: "color 0.3s ease",
              border: "1px solid #F49040",
              color: "#F49040",
              dropShadow: "0px 4px 24px #F4904075",
            }}
          >
            <FiChevronLeft />
          </Box>
          <Box px={{ base: 4, md: 6 }} textAlign="center" color="white">
            <Heading
              fontSize={{ base: "32px", md: "42px" }}
              fontFamily="Poppins"
              fontWeight="600"
            >
              PROFILE
            </Heading>
          </Box>
        </Box>

        <Box
          paddingY={{ base: "36px", md: "64px", lg: "35px" }}
          paddingX={{ base: "16px", md: "24px", lg: "32px" }}
          backgroundColor="white"
          borderTopLeftRadius={{ base: "24px", md: "36px", lg: "64px" }}
          borderTopRightRadius={{ base: "24px", md: "36px", lg: "64px" }}
          width="100%"
          minHeight="80vh"
        >
          <Box maxW={{ base: "100%", md: "800px" }} mx="auto">
            <Box mb={8}>
              <HStack spacing={4} align="center" mb={6}>
                <Heading size="lg" color="#1F6A75">
                  Profile Completion
                </Heading>
                <CircularProgress
                  value={completionPercentage}
                  color="#F49040"
                  size="60px"
                  thickness="8px"
                >
                  <CircularProgressLabel color="#1F6A75" fontSize="sm">
                    {completionPercentage}%
                  </CircularProgressLabel>
                </CircularProgress>
              </HStack>

              {isLoading && (
                <Box textAlign="center" py={4}>
                  <Text>Loading your profile data...</Text>
                </Box>
              )}

              {error && (
                <Box
                  textAlign="center"
                  py={4}
                  bg="red.50"
                  color="red.600"
                  borderRadius="md"
                  mb={4}
                >
                  <Text>Error loading profile: {error}</Text>
                </Box>
              )}

              <Flex direction="column" alignItems="center" mb={8}>
                <Box
                  position="relative"
                  width={{ base: "120px", md: "150px" }}
                  height={{ base: "120px", md: "150px" }}
                >
                  <Box
                    width="100%"
                    height="100%"
                    borderRadius="full"
                    overflow="hidden"
                    bg="gray.100"
                    border="3px solid #F49040"
                    position="relative"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt="User Avatar"
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    ) : (
                      <FiUser fontSize="60px" color="#1F6A75" />
                    )}
                  </Box>
                  <IconButton
                    icon={<FiCamera />}
                    aria-label="Change profile picture"
                    size="sm"
                    colorScheme="teal"
                    position="absolute"
                    bottom="0"
                    right="0"
                    rounded="full"
                    onClick={handleAvatarClick}
                    _hover={{
                      bg: "#F49040",
                    }}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/jpeg, image/png"
                    style={{ display: "none" }}
                  />
                </Box>
                <Text mt={2} color="#1F6A75" fontWeight="500">
                  Change Profile Picture
                </Text>
              </Flex>

              <Accordion
                allowToggle
                sx={{
                  "& *:focus": { outline: "none", boxShadow: "none" },
                  "& *:hover": { outline: "none", boxShadow: "none" },
                  "& *:active": { outline: "none", boxShadow: "none" },
                }}
              >
                <AccordionItem
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  mb={4}
                  sx={{
                    "&:hover": {
                      outline: "none",
                      boxShadow: "none",
                    },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                    "& button:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  <h2>
                    <AccordionButton
                      bgGradient="linear-gradient( #F49040, #F49040)"
                      color="white"
                      _hover={{
                        bg: "#26808eff",
                        outline: "none",
                        boxShadow: "none",
                      }}
                      _focus={{ outline: "none", boxShadow: "none" }}
                      _active={{ outline: "none", boxShadow: "none" }}
                      borderRadius="md"
                      // onClick={() => setActiveSection("personal")}
                    >
                      <Box flex="1" textAlign="left" fontWeight="600">
                        Personal Info
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <form onSubmit={handleSubmitPersonalInfo}>
                      <VStack spacing={4} align="stretch">
                        <HStack spacing={4}>
                          <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input
                              value={personalInfo.firstName}
                              onChange={(e) =>
                                handlePersonalInfoChange(
                                  "firstName",
                                  e.target.value
                                )
                              }
                              placeholder="First Name"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                              value={personalInfo.lastName}
                              onChange={(e) =>
                                handlePersonalInfoChange(
                                  "lastName",
                                  e.target.value
                                )
                              }
                              placeholder="Last Name"
                            />
                          </FormControl>
                        </HStack>
                        <FormControl>
                          <FormLabel>Date of Birth</FormLabel>
                          <Input
                            type="date"
                            value={personalInfo.dateOfBirth}
                            onChange={(e) =>
                              handlePersonalInfoChange(
                                "dateOfBirth",
                                e.target.value
                              )
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Gender</FormLabel>
                          <RadioGroup
                            value={personalInfo.gender}
                            onChange={(value) =>
                              handlePersonalInfoChange("gender", value)
                            }
                          >
                            <Stack direction="row">
                              <Radio value="Male">Male</Radio>
                              <Radio value="Female">Female</Radio>
                              <Radio value="Other">Other</Radio>
                            </Stack>
                          </RadioGroup>
                        </FormControl>
                        <FormControl>
                          <FormLabel>You Are</FormLabel>
                          <RadioGroup
                            value={personalInfo.gender}
                            onChange={(value) =>
                              handlePersonalInfoChange("gender", value)
                            }
                          >
                            <Stack direction="row">
                              <Radio value="Parent">Parent</Radio>
                              <Radio value="teacher">Teacher</Radio>
                              <Radio value="Student">Student</Radio>
                            </Stack>
                          </RadioGroup>
                        </FormControl>
                        <FormControl>
                          <FormLabel>City</FormLabel>
                          <Input
                            type="text"
                            value={personalInfo.city}
                            onChange={(e) =>
                              handlePersonalInfoChange("city", e.target.value)
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Country</FormLabel>
                          <Input
                            type="text"
                            value={personalInfo.country}
                            onChange={(e) =>
                              handlePersonalInfoChange(
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          colorScheme="teal"
                          bg="#F49040"
                          _hover={{ bg: "#e07e30" }}
                          alignSelf="flex-end"
                        >
                          Save Changes
                        </Button>
                      </VStack>
                    </form>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  mb={4}
                >
                  <h2>
                    <AccordionButton
                      bgGradient="linear-gradient( #F49040, #F49040)"
                      color="white"
                      _hover={{ bg: "#26808eff" }}
                      _focus={{ outline: "none", boxShadow: "none" }}
                      _active={{ outline: "none", boxShadow: "none" }}
                      borderRadius="md"
                    >
                      <Box flex="1" textAlign="left" fontWeight="600">
                        Educational Info
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <form onSubmit={handleSubmitEducationalInfo}>
                      <VStack spacing={4} align="stretch">
                        <FormControl>
                          <FormLabel>Class Name</FormLabel>
                          <Select
                            value={educationalInfo.className}
                            onChange={(e) =>
                              handleEducationalInfoChange(
                                "className",
                                e.target.value
                              )
                            }
                          >
                            {[...Array(12)].map((_, i) => (
                              <option key={i} value={`Class ${i + 1}`}>
                                Class {i + 1}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Institution Type</FormLabel>
                          <Select
                            value={educationalInfo.institutionType}
                            onChange={(e) =>
                              handleEducationalInfoChange(
                                "institutionType",
                                e.target.value
                              )
                            }
                          >
                            <option value="Govt">Govt</option>
                            <option value="Private">Private</option>
                            <option value="Home schooling">
                              Home schooling
                            </option>
                          </Select>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Institution Name</FormLabel>
                          <Input
                            value={educationalInfo.institutionName}
                            onChange={(e) =>
                              handleEducationalInfoChange(
                                "institutionName",
                                e.target.value
                              )
                            }
                            placeholder="Institution Name"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Board System</FormLabel>
                          <Select
                            value={educationalInfo.boardSystem}
                            onChange={(e) =>
                              handleEducationalInfoChange(
                                "boardSystem",
                                e.target.value
                              )
                            }
                          >
                            <option value="Sindh Board">Sindh Board</option>
                            <option value="Punjab Board">Punjab Board</option>
                            <option value="Federal">Federal</option>
                            <option value="Cambridge">Cambridge</option>
                            <option value="KPK Board">KPK Board</option>
                            <option value="Other">Other</option>
                          </Select>
                        </FormControl>
                        {educationalInfo.boardSystem === "Other" && (
                          <FormControl>
                            <FormLabel>Custom Board System</FormLabel>
                            <Input placeholder="Enter board system name" />
                          </FormControl>
                        )}
                        <FormControl>
                          <FormLabel>Passing Year</FormLabel>
                          <Input
                            type="number"
                            value={educationalInfo.passingYear}
                            onChange={(e) =>
                              handleEducationalInfoChange(
                                "passingYear",
                                e.target.value
                              )
                            }
                            placeholder="Passing Year"
                          />
                        </FormControl>
                        <FormControl display="flex" alignItems="center">
                          <Checkbox
                            isChecked={educationalInfo.isCurrentEducation}
                            isReadOnly
                            colorScheme="teal"
                          />
                          <FormLabel mb="0" ml={2}>
                            Current Education
                          </FormLabel>
                        </FormControl>
                        <Button
                          type="submit"
                          colorScheme="teal"
                          bg="#F49040"
                          _hover={{ bg: "#e07e30" }}
                          alignSelf="flex-end"
                        >
                          Save Changes
                        </Button>
                      </VStack>
                    </form>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Flex justifyContent="center" mt={6}>
                <Button
                  size="lg"
                  colorScheme="teal"
                  bg="#1F6A75"
                  _hover={{ bg: "#174D55" }}
                  leftIcon={<FiUser />}
                  onClick={handleUpdateProfile}
                  isLoading={isUpdating}
                >
                  Update My Profile
                </Button>
              </Flex>
            </Box>

            <Divider my={8} />

            <VStack spacing={4} align="stretch" mb={8}>
              <Heading size="md" color="#1F6A75" mb={2}>
                Account Settings
              </Heading>

              <Button
                leftIcon={<GoLock />}
                variant="outline"
                colorScheme="teal"
                size="lg"
                justifyContent="flex-start"
                onClick={handleChangePassword}
                _focus={{ boxShadow: "none", outline: "none" }}
                _hover={{ bg: "#72fffdc2", boxShadow: "none" }}
                _active={{ boxShadow: "none", outline: "none" }}
              >
                Change Password
              </Button>

              <Button
                leftIcon={<GoQuestion />}
                variant="outline"
                colorScheme="teal"
                size="lg"
                justifyContent="flex-start"
                onClick={handleHelp}
                _focus={{ boxShadow: "none", outline: "none" }}
                _hover={{ bg: "#72fffdc2", boxShadow: "none", outline: "none" }}
                _active={{ boxShadow: "none", outline: "none" }}
              >
                Help
              </Button>

              {showHelpForm && (
                <Box
                  mt={4}
                  p={4}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="#1F6A75"
                  boxShadow="sm"
                  bg="#1F6A75"
                >
                  <ContactFormSection />
                </Box>
              )}
              <Button
                leftIcon={<GoSignOut />}
                variant="outline"
                colorScheme="red"
                size="lg"
                justifyContent="flex-start"
                onClick={handleLogout}
                _focus={{ boxShadow: "none", outline: "none" }}
                _hover={{ bg: "#ffb8b8dc", boxShadow: "none", outline: "none" }}
                _active={{ boxShadow: "none", outline: "none" }}
              >
                Logout
              </Button>
            </VStack>
          </Box>
        </Box>
      </Box>
    </BOX>
  );
};

export default ProfilePageRedesign;
