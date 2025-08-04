import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  Image,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import Title from "../../views/Title";
import menuicon from "../../../assets/menuicon.svg";
import logo from "../../../assets/LogoDark.svg";
import { useWebUserContext } from "../../context/WebUserContext";
import { useNavigate } from "react-router-dom";

const DashBoardNavBar = ({ onToggleSidebar, setSelection }) => {
  const [flipped, setFlipped] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleToggle = () => {
    setFlipped((prev) => !prev);
    if (onToggleSidebar) onToggleSidebar();
  };

  const { setLoginUserInfo, setUserLoginToken } = useWebUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoginUserInfo(null);
    setUserLoginToken(null);

    // Remove all relevant items from localStorage
    localStorage.removeItem("categoryId");
    localStorage.removeItem("chapterId");
    localStorage.removeItem("dashboardchapter");
    localStorage.removeItem("studentEnrollmentData");
    localStorage.removeItem("subcategoryId");
    localStorage.removeItem("subjectId");
    localStorage.removeItem("userId");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userdata = {
    userName: userInfo?.firstName || userInfo?.email.split('@')[0] || "User",
    image: userInfo?.imageUrl,
    courseCompletion: userInfo?.courseCompletion || "0%",
  };

  return (
    <>
      <Box
        bg="#FFFFFF"
        p="12px 36px"
        borderBottom={"1px solid #CED4D3"}
        h="72px"
        w={"100vw"}
      >
        <Flex justify="space-between" align="center" h="100%">
          {/* Left Section */}
          <Box
            onClick={handleToggle}
            w={{ base: "36px", md: "48px" }}
            h={{ base: "36px", md: "48px" }}
            borderRadius="24px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            transition="all 0.2s"
            background="#FFFFFF"
            border="2px solid #F49040"
            _hover={{
              boxShadow: "0 4px 12px rgba(244, 144, 64, 0.5)",
            }}
            _focus={{ outline: "none" }}
            tabIndex={0}
          >
            <Image
              boxSize={{ base: "18px", md: "24px" }}
              src={menuicon}
              alt="menu icon"
              style={{
                transition: "transform 0.3s, color 0.3s",
                transform: flipped ? "scaleX(-1)" : "none",
                display: "block",
                outline: "none",
              }}
            />
          </Box>

          {/* Logo Section */}
          <Box>
            <Image src={logo} alt="OTS logo" boxSize={{ base: "176px", md: "238px" }} />
          </Box>

          {/* Right Section (User Profile) */}
          <Flex align="center" display={{ base: "none", md: "flex" }}>
            <Avatar
              size="md"
              src={userdata.image || "#"}
              name={userdata.userName}
              mr={3}
              onClick={() => navigate('/dashboard/profile')}
              cursor={"pointer"}
              _focus={{ outline: "none", boxShadow: "0 0 0 2px #F49040" }}
              tabIndex={0}
            />
            <Box
              onClick={() => navigate('/dashboard/profile')}
              cursor="pointer"
              _focus={{ outline: "none" }}
              tabIndex={0}
            >
              <Text fontSize="sm">({userdata.userName})</Text>
              <Text fontSize="xs" color="gray.500">Student</Text>
            </Box>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FaCaretDown />}
                variant="link"
                _focus={{ outline: "none", boxShadow: "none" }}
                _hover={{ outline: "none", boxShadow: "none", border: "none" }}
                aria-label="User Options"
              />
              <MenuList>
                <MenuItem
                  onClick={() => navigate('/dashboard/profile')}
                  _focus={{ outline: "none", boxShadow: "none" }}
                  _hover={{ outline: "none", boxShadow: "none", border: "none", bg: "#CED4D3" }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={onOpen}
                  _focus={{ outline: "none", boxShadow: "none" }}
                  _hover={{ outline: "none", boxShadow: "none", border: "none", bg: "#CED4D3" }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to logout?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                borderRadius="24px"
                colorScheme="transparent"
                border="1px solid gray"
                color="gray.600"
                _hover={{ bgColor: "gray.100" }}
              >
                Cancel
              </Button>
              <Button
                borderRadius="24px"
                colorScheme="transparent"
                border="1px solid #F49040"
                color="#F49040"
                _hover={{ bgColor: "#F49040", color: "#fff", borderColor: "#F49040" }}
                onClick={() => {
                  handleLogout();
                  onClose();
                }}
                ml={3}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DashBoardNavBar;