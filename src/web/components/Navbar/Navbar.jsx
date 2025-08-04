// import React from "react";
// import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
// import logo from "../../../assets/Logo.svg";
// import { useNavigate } from "react-router-dom";
// import styles from "./Navbar.module.css"
// import { RxHamburgerMenu } from "react-icons/rx";

// function Navbar() {
//   const Navigate = useNavigate();
//   const handleLogin = () => {
//     Navigate('/login')
//   }

//   const handleSignup = () => {
//     Navigate('/signup')
//   }
//   return (
//     <Box
//       position="absolute"
//       top="36px"
//       left="50%"
//       transform="translateX(-50%)"
//       maxW="1436px"
//       width="90%"
//       height="72px"
//       bg="#09363525"
//       border="1px solid #FFFFFF50"
//       borderRadius="64px"
//       boxShadow="2xl"
//       backdropFilter="blur(24px)"
//       px={16} // Adds padding on smaller screens
//     >
//       <Flex
//         alignItems="center"
//         justifyContent="space-between"
//         height="100%"
//         flexWrap="wrap"
//       >
//         {/* Logo and Branding */}
//         <Box alignItems="center" className={styles.logo}>
//           <Image src={logo} alt="Logo" width="206px" />
//         </Box>

//         {/* Centered Navigation Links (Hidden on Small Screens) */}
//         <Flex
//           flex="1"
//           justifyContent="center"
//           gap={9}
//           display={{ base: "none", md: "flex" }}
//           color="white"
//           className={styles.navLinks}
//         >
//           <Text cursor="pointer" _hover={{ color: "orange.400", fontWeight: "medium"}}>Home</Text>
//           <Text cursor="pointer" _hover={{ color: "orange.400", fontWeight: "medium" }}>Courses</Text>
//           <Text cursor="pointer" _hover={{ color: "orange.400", fontWeight: "medium" }}>About Us</Text>
//           <Text cursor="pointer" _hover={{ color: "orange.400", fontWeight: "medium" }}>Contact Us</Text>
//         </Flex>

//         {/* Auth Buttons */}
//         <Flex gap={3} className={styles.authButtons}>
//           <Button
//             px={4}
//             borderRadius="24px"
//             colorScheme="transparent"
//             size="sm"
//             border="1px solid #F49040"
//             color={"#F49040"}
//             _hover={{ bgColor: "#F49040", color: "#fff", borderColor:"#F49040"}}
//             display={{ base: "none", md: "block" }}
//             onClick={handleLogin}
//           >
//             Login
//           </Button>
//           <Button
//             px={4}
//             borderRadius="24px"
//             colorScheme="transparent"
//             size="sm"
//             bgColor= "#F49040"
//             color= "#fff"
//             _hover={{ border: "1px solid #F49040", color: "#F49040", bg: "none"}}
//             display={{ base: "none", md: "block" }}
//             onClick={handleSignup}
//           >
//             Register
//           </Button>
//         </Flex>

//         {/* Hamburger Icon (shown via CSS only) */}
//         <Flex>
//             <Button
//                 variant="outline"
//                 p={6}
//                 width="full"
//                 bgColor={"white"}
//                 borderRadius={"12px"}
//               >
//                 <Box as={RxHamburgerMenu} boxSize={"32px"} mr={2} fontSize={"14px"} />
//             </Button>
//         </Flex>

//       </Flex>
//     </Box>
//   );
// }

// export default Navbar;

import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/Logo.svg";
import styles from "./Navbar.module.css";
import { useWebUserContext } from "../../context/WebUserContext";
import { useEnrollmentContext } from "../../context/WebEnrollmentContext";
import { useRef } from "react";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef();
  const { loginUserInfo, setLoginUserInfo, setUserLoginToken } =
    useWebUserContext();
  const { setStudentEnrollmentData } = useEnrollmentContext();
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = localStorage.getItem("userInfo");
  const storedToken = localStorage.getItem("userToken");

  const handleSignOut = () => {
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

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <Box
        position="fixed"
        top="36px"
        left="50%"
        transform="translateX(-50%)"
        maxW="1436px"
        width="92%"
        height="72px"
        bg="#09363575"
        border="1px solid #FFFFFF50"
        borderRadius="64px"
        boxShadow="2xl"
        backdropFilter="blur(24px)"
        px={9}
        zIndex={1000}
        className={styles.container}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          height="100%"
          flexWrap="wrap"
        >
          {/* Logo */}
          <Box alignItems="center" className={styles.logo} width="206px">
            <Image src={logo} alt="Logo" width={"100%"} h={"auto"} />
          </Box>

          {/* Centered Links (Desktop only) */}
          <Flex
            flex="1"
            justifyContent="center"
            // gap={9}
            display={{ base: "none", md: "flex" }}
            color="white"
            className={styles.links}
          >
            <Text
              cursor="pointer"
              color={location.pathname === "/home" ? "#F49040" : "white"}
              fontWeight={location.pathname === "/home" ? "medium" : "normal"}
              _hover={{ color: "#F49040", fontWeight: "medium" }}
              onClick={() => navigate("/home")}
            >
              Home
            </Text>
            <Text
              cursor="pointer"
              color={
                location.pathname === "/categoryselectionpage"
                  ? "#F49040"
                  : "white"
              }
              fontWeight={
                location.pathname === "/categoryselectionpage"
                  ? "medium"
                  : "normal"
              }
              _hover={{ color: "#F49040", fontWeight: "medium" }}
              onClick={() => navigate("/categoryselectionpage")}
            >
              Courses
            </Text>
            <Text
              cursor="pointer"
              color={location.pathname === "/aboutus" ? "#F49040" : "white"}
              fontWeight={
                location.pathname === "/aboutus" ? "medium" : "normal"
              }
              _hover={{ color: "#F49040", fontWeight: "medium" }}
              onClick={() => navigate("/aboutus")}
            >
              About Us
            </Text>
            <Text
              cursor="pointer"
              color={location.pathname === "/contactus" ? "#F49040" : "white"}
              fontWeight={
                location.pathname === "/contactus" ? "medium" : "normal"
              }
              _hover={{ color: "#F49040", fontWeight: "medium" }}
              onClick={() => navigate("/contactus")}
            >
              Contact Us
            </Text>
          </Flex>

          {/* Auth Buttons (Desktop only) */}

          {storedUser ? (
            <>
              <Flex
                gap={3}
                display={{ base: "none", md: "flex" }}
                className={styles.authbtn}
              >
                <Button
                  px={5}
                  py={0}
                  borderRadius="24px"
                  colorScheme="transparent"
                  border="1px solid #F49040"
                  color={"#F49040"}
                  _hover={{
                    bgColor: "#F49040",
                    color: "#fff",
                    borderColor: "#F49040",
                  }}
                  _focus={{ outline: "none", boxShadow: "none" }}
                  size={"sm"}
                  onClick={onAlertOpen} // Changed from handleSignOut to onOpen
                >
                  Sign Out
                </Button>
              </Flex>

              {/* Add the AlertDialog component */}
              <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={onAlertClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent bg="#093635" color="white" border="1px solid #FFFFFF50">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Sign Out Confirmation
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure you want to sign out?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button
                        ref={cancelRef}
                        onClick={onAlertClose}
                        borderRadius="24px"
                        colorScheme="transparent"
                         border="1px solid #F49040"
                         _focus={{ outline: "none", boxShadow: "none" }}
                        color="#ffff"
                        _hover={{
                          bgColor: "#F49040",
                          color: "#fff",
                          borderColor: "#F49040",
                        }}
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        borderRadius="24px"
                        colorScheme="transparent"
                        border="1px solid #F49040"
                        color="#F49040"
                        _hover={{
                          bgColor: "#F49040",
                          color: "#fff",
                          borderColor: "#F49040",
                        }}
                        onClick={() => {
                          handleSignOut();
                          onAlertClose();
                        }}
                        ml={3}
                        size="sm"
                      >
                        Sign Out
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
          ) : (
            <Flex
              gap={3}
              display={{ base: "none", md: "flex" }}
              className={styles.authbtn}
            >
              <Button
                px={5}
                py={0}
                borderRadius="24px"
                colorScheme="transparent"
                border="1px solid #F49040"
                color={"#F49040"}
                _hover={{
                  bgColor: "#F49040",
                  color: "#fff",
                  borderColor: "#F49040",
                }}
                _focus={{ outline: "none", boxShadow: "none" }}
                size={"sm"}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                px={4}
                borderRadius="24px"
                colorScheme="transparent"
                bgColor="#F49040"
                color="#fff"
                size={"sm"}
                _hover={{
                  border: "1px solid #F49040",
                  color: "#F49040",
                  bg: "none",
                }}
                _focus={{ outline: "none", boxShadow: "none" }}
                onClick={handleSignup}
              >
                Register
              </Button>
            </Flex>
          )}

          {/* Hamburger Icon (Mobile only) */}
          <Flex>
            <Button
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              aria-label="Open Menu"
              variant="ghost"
              color="white"
              fontSize="24px"
              border={"none"}
              p={0}
              className={styles.hamburgerIcon}
              _hover={{ color: "#fff", borderColor: "#FFFFFF", bg: "none" }}
              _focus={{ outline: "none", boxShadow: "none" }}
            >
              <Box as={RxHamburgerMenu} boxSize={"24px"} fontSize={"14px"} />
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#093635" color="white">
          <DrawerCloseButton
            mx={5}
            my={3}
            border={"none"}
            _hover={{ color: "#fff", borderColor: "#FFFFFF", bg: "none" }}
            _focus={{ outline: "none", boxShadow: "none" }}
          />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody display="flex" flexDirection="column" gap={4}>
            <Text
              cursor="pointer"
              color={location.pathname === "/" ? "#F49040" : "white"}
              fontWeight={location.pathname === "/" ? "medium" : "normal"}
              _hover={{ color: "#F49040" }}
              onClick={() => {
                navigate("/");
                onClose();
              }}
            >
              Home
            </Text>
            <Text
              cursor="pointer"
              color={
                location.pathname === "/categoryselectionpage"
                  ? "#F49040"
                  : "white"
              }
              fontWeight={
                location.pathname === "/categoryselectionpage"
                  ? "medium"
                  : "normal"
              }
              _hover={{ color: "#F49040" }}
              onClick={() => {
                navigate("/categoryselectionpage");
                onClose();
              }}
            >
              Courses
            </Text>
            <Text
              cursor="pointer"
              color={location.pathname === "/aboutus" ? "#F49040" : "white"}
              fontWeight={
                location.pathname === "/aboutus" ? "medium" : "normal"
              }
              _hover={{ color: "#F49040" }}
              onClick={() => {
                navigate("/aboutus");
                onClose();
              }}
            >
              About Us
            </Text>
            <Text
              cursor="pointer"
              color={location.pathname === "/contactus" ? "#F49040" : "white"}
              fontWeight={
                location.pathname === "/contactus" ? "medium" : "normal"
              }
              _hover={{ color: "#F49040" }}
              onClick={() => {
                navigate("/contactus");
                onClose();
              }}
            >
              Contact Us
            </Text>
            {storedUser ? (
               <>
             
                <Button
                  px={5}
                  py={0}
                  borderRadius="24px"
                  colorScheme="transparent"
                  border="1px solid #F49040"
                  color={"#F49040"}
                  _hover={{
                    bgColor: "#F49040",
                    color: "#fff",
                    borderColor: "#F49040",
                  }}
                  _focus={{ outline: "none", boxShadow: "none" }}
                  size={"sm"}
                  onClick={onAlertOpen} // Changed from handleSignOut to onOpen
                >
                  Sign Out
                </Button>
             
              {/* Add the AlertDialog component */}
              <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={onAlertClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent bg="#093635" color="white" border="1px solid #FFFFFF50">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Sign Out Confirmation
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure you want to sign out?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button
                        ref={cancelRef}
                        onClick={onAlertClose}
                        borderRadius="24px"
                        colorScheme="transparent"
                         border="1px solid #F49040"
                         _focus={{ outline: "none", boxShadow: "none" }}
                        color="#ffff"
                        _hover={{
                          bgColor: "#F49040",
                          color: "#fff",
                          borderColor: "#F49040",
                        }}
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        borderRadius="24px"
                        colorScheme="transparent"
                        border="1px solid #F49040"
                        color="#F49040"
                        _hover={{
                          bgColor: "#F49040",
                          color: "#fff",
                          borderColor: "#F49040",
                        }}
                        onClick={() => {
                          handleSignOut();
                          onAlertClose();
                          onClose();
                        }}
                        ml={3}
                        size="sm"
                      >
                        Sign Out
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
            ) : (
              <>
                <Button
                  mt={4}
                  onClick={() => {
                    handleLogin();
                    onClose();
                  }}
                  border="1px solid #F49040"
                  color="#F49040"
                  variant="outline"
                  borderRadius="24px"
                  _hover={{
                    bgColor: "#F49040",
                    color: "#fff",
                    borderColor: "#F49040",
                  }}
                  _focus={{ outline: "none", boxShadow: "none" }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    handleSignup();
                    onClose();
                  }}
                  bg="#F49040"
                  color="white"
                  borderRadius="24px"
                  _hover={{
                    border: "1px solid #F49040",
                    color: "#F49040",
                    bg: "none",
                  }}
                  _focus={{ outline: "none", boxShadow: "none" }}
                >
                  Register
                </Button>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
