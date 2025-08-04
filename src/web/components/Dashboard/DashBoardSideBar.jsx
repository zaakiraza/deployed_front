import {
  Flex,
  Box,
  IconButton,
  Text,
  Divider,
  Spacer,
  useBreakpointValue,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import {
  FiHome,
  FiBookOpen,
  FiFolder,
  FiBell,
  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { useWebUserContext } from "../../context/WebUserContext";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarItem = ({ icon, text, isActive = false, onClick, hoverStyles }) => (
  <Flex
    align="center"
    py={3}
    px={6}
    mx={3}
    mb={2}
    borderRadius="32px"
    role="group"
    cursor="pointer"
    _hover={{
      bg: "#CED4D350",
      ...hoverStyles,
    }}
    bg={isActive ? "#CED4D350" : "#CED4D310"}
    color={isActive ? "#F49040" : "#A2ABAA"}
    onClick={onClick}
  >
    {icon}
    <Text
      fontSize="md"
      ml={3}
      fontWeight={isActive ? "600" : "500"}
      color={isActive ? "#0D0D0D" : "#A2ABAA"}
    >
      {text}
    </Text>
  </Flex>
);

const DashboardSidebar = ({ isOpen }) => {
  const showMobileItems = useBreakpointValue({ base: true, md: false });
  const { setLoginUserInfo, setUserLoginToken } = useWebUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef();

  // Determine active route based on current path
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const handleLogOut = () => {
    // Clear React state
    setLoginUserInfo(null);
    setUserLoginToken(null);

    // Remove all relevant items from localStorage
    localStorage.removeItem("categoryId");
    localStorage.removeItem("chapterId");
    localStorage.removeItem("dashboardchapter");
    localStorage.removeItem("studentEnrollmentData");
    localStorage.removeItem("subjectId");
    localStorage.removeItem("subcategoryId");
    localStorage.removeItem("userId");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <>
      <Box
        h="95vh"
        position="fixed"
        left={0}
        w={isOpen ? "250px" : "0"}
        overflowX="hidden"
        transition="all 0.3s ease-out"
        boxShadow="lg"
        bg="white"
        zIndex="overlay"
      >
        <Flex direction="column" h="full" py={isOpen ? 6 : 0}>
          {/* Main Menu Items */}
          <Box>
            <SidebarItem
              icon={<FiHome size={20} />}
              text="Dashboard"
              isActive={isActive('/dashboard') && !isActive('/dashboard/change-course') && !isActive('/dashboard/subject-selection')}
              onClick={() => navigate('/dashboard')}
            />
            <SidebarItem
              icon={<FiBookOpen size={20} />}
              text="Change Courses"
              isActive={isActive('/dashboard/change-course')}
              onClick={() => navigate('/dashboard/change-course')}
            />
            <SidebarItem
              icon={<FiFolder size={20} />}
              text="Resources"
              isActive={isActive('/dashboard/subject-selection')}
              onClick={() => navigate('/dashboard/subject-selection')}
            />

            {/* Extra items for mobile only */}
            {showMobileItems && (
              <>
                <SidebarItem
                  icon={<FiBell size={20} />}
                  text="Notifications"
                  onClick={() => navigate('/dashboard/notifications')}
                />
                <SidebarItem
                  icon={<BiUserCircle size={24} />}
                  text="Profile"
                  isActive={isActive('/dashboard/profile')}
                  onClick={() => navigate('/dashboard/profile')}
                />
              </>
            )}
          </Box>

          <Spacer />

          {/* Logout Section */}
          <Box mb={4}>
            <Divider mb={4} />
            <SidebarItem
              icon={<FiLogOut size={20} />}
              text="Logout"
              onClick={onAlertOpen}
              hoverStyles={{ color: "red.600", bg: "red.50" }}
            />
          </Box>
        </Flex>
      </Box>

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius="xl">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to log out? You'll need to sign in again to access your account.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onAlertClose}
                borderRadius="full"
                variant="outline"
                _hover={{ bg: "gray.100" }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleLogOut();
                  onAlertClose();
                }}
                ml={3}
                borderRadius="full"
              >
                Log Out
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DashboardSidebar;