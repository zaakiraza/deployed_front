// import React, { useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Cropper from "react-easy-crop";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
//   Slider,
//   SliderTrack,
//   SliderFilledTrack,
//   SliderThumb,
//   Box,
//   Button,
//   Text,
//   Flex,
//   Heading,
// } from "@chakra-ui/react";
// import { FiChevronLeft, FiUser, FiPlus, FiX, FiEdit2 } from "react-icons/fi";
// import { GoLock, GoQuestion, GoSignOut } from "react-icons/go";
// import BOX from "../../views/BOX";
// import ProfileCompletion from "./ProfileCompletion";
// import UpdateProfile from "./UpdateProfile";
// import CompletionProgress from "./CompletionProgress";
// import Help from "./Help";

// const ProfilePage = ({ userDetail }) => {
//   const navigate = useNavigate();
//   const [showProfileCompletion, setShowProfileCompletion] = useState(false);
//   const [showUpdateProfile, setShowUpdateProfile] = useState(false);
//   const [showHelp, setShowHelp] = useState(false);
//   const [avatar, setAvatar] = useState(null);
//   const [showEditMenu, setShowEditMenu] = useState(false);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const fileInputRef = useRef(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const handleToggleProfileCompletion = () =>
//     setShowProfileCompletion((v) => !v);
//   const handleToggleUpdateProfile = () => setShowUpdateProfile((v) => !v);
//   const handleToggleHelp = () => setShowHelp((v) => !v);

//   const getCroppedImg = async (imageSrc, cropPixels) => {
//     const image = new window.Image();
//     image.src = imageSrc;
//     await new Promise((resolve) => {
//       image.onload = resolve;
//     });
//     const canvas = document.createElement("canvas");
//     canvas.width = cropPixels.width;
//     canvas.height = cropPixels.height;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(
//       image,
//       cropPixels.x,
//       cropPixels.y,
//       cropPixels.width,
//       cropPixels.height,
//       0,
//       0,
//       cropPixels.width,
//       cropPixels.height
//     );
//     return canvas.toDataURL("image/jpeg");
//   };

//   const onCropComplete = (_, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   };

//   const handleCropSave = async () => {
//     if (avatar && croppedAreaPixels) {
//       const croppedImg = await getCroppedImg(avatar, croppedAreaPixels);
//       setAvatar(croppedImg);
//       onClose();
//     }
//   };

//   const handleAvatarClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = null;
//       fileInputRef.current.click();
//     }
//   };

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
//       const reader = new FileReader();
//       reader.onload = (ev) => setAvatar(ev.target.result);
//       reader.readAsDataURL(file);
//     } else {
//       alert("Please select a JPEG or PNG image.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("userToken");
//     localStorage.removeItem("userInfo");
//     navigate("/login");
//   };

//   return (
//     <BOX>
//       <Box style={{ width: "100vw", minHeight: "100vh" }}>
//         <Box
//           display={"flex"}
//           justifyContent={"center"}
//           alignItems={"center"}
//           padding={"50px 0"}
//           // maxW={{ base: "75%", md: "85%" }}
//           // width="952px"
//           // display={"flex"}
//           // flexDirection={"row"}
//           // alignItems={"center"}
//           // justifyContent={"center"}
//           // gap={{ base: "12px", sm: "16px", md: "18px" }}
//           // mx={"auto"}
//         >
//           <Box
//             bg={"#FFFFFF"}
//             width={"fit-content"}
//             borderRadius={"50%"}
//             color={"#1F6A75"}
//             cursor={"pointer"}
//             onClick={() => navigate(-1)}
//             padding={{ base: "8px", sm: "12px", md: "16px" }}
//             fontSize={{ base: "16", sm: "18px", md: "24px" }}
//             border={"none"}
//             _hover={{
//               transition: "color 0.3s ease",
//               border: "1px solid #F49040",
//               color: "#F49040",
//               dropShadow: "0px 4px 24px #F4904075",
//             }}
//           >
//             <FiChevronLeft />
//           </Box>
//           <Box
//             px={{ base: 4, md: 6 }}
//             // py={{ base: "64px", md: "86px" }}
//             textAlign="center"
//             color="white"
//           >
//             <Heading
//               fontSize={{ base: "32px", md: "42px" }}
//               fontFamily="Poppins"
//               fontWeight="600"
//             >
//               PROFILE
//             </Heading>
//             <Text
//               mt={{ base: "2px", md: "4px" }}
//               fontSize={{ base: "18px", md: "24px" }}
//               fontFamily="Poppins"
//               fontWeight="200"
//             >
//               {/* <Link to="/dashboard">Dashboard /</Link>
//               <Link to="/profilepage">Profile /</Link> */}
//             </Text>
//           </Box>
//         </Box>

//         <Box
//           paddingY={{ base: "36px", md: "64px", lg: "35px" }}
//           backgroundColor="white"
//           borderTopLeftRadius={{ base: "24px", md: "36px", lg: "64px" }}
//           borderTopRightRadius={{ base: "24px", md: "36px", lg: "64px" }}
//           width="100%"
//         >
//           <Box
//             maxW={{ base: "80%", sm: "90%", md: "100%" }}
//             width="500px"
//             mx={"auto"}
//             position="relative"
//           >
//             {/* Avatar Section */}
//             <Flex direction="column" alignItems="center" justifyContent={"center"}>
//               <Box
//                 position="relative"
//                 width={{ base: "112px", sm: "136px", md: "160px" }}
//                 height={{ base: "112px", sm: "136px", md: "160px" }}
//               >
//                 <Box
//                   width="80%"
//                   height="80%"
//                   borderRadius="full"
//                   overflow="hidden"
//                   bg="white"
//                   border="4px solid #A2ABAA"
//                   position="relative"
//                   fontSize={{ base: "54px", sm: "64px", md: "86px" }}
//                   display="flex"
//                   alignItems="center"
//                   justifyContent="center"
//                 >
//                   {avatar ? 
//                     <img
//                       src={avatar}
//                       alt="Avatar Preview"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   ) : (
//                     <FiUser color="#A2ABAA" />
//                   )}
//                   <input
//                     type="file"
//                     accept="image/jpeg, image/png"
//                     style={{ display: "none" }}
//                     ref={fileInputRef}
//                     onChange={handleAvatarChange}
//                   />
//                 </Box>
//                 <Box
//                   position="absolute"
//                   bottom="30px"
//                   right="16px"
//                   zIndex={2}
//                   display="flex"
//                   flexDirection="column"
//                   alignItems="flex-end"
//                 >
//                   <Button
//                     bg="white"
//                     border="1.5px solid #A2ABAA"
//                     borderRadius="full"
//                     p={{ base: "4px", sm: "6px", md: "8px" }}
//                     boxShadow="2xl"
//                     cursor="pointer"
//                     fontSize={{ base: "18px", sm: "22px", md: "26px" }}
//                     minW="auto"
//                     h="auto"
//                     onClick={() => setShowEditMenu((v) => !v)}
//                     _hover={{ bg: "#F5F5F5" }}
//                     aria-label="Edit avatar"
//                   >
//                     <FiEdit2 color="#A2ABAA" />
//                   </Button>
//                   {showEditMenu && (
//                     <Box
//                       mt={2}
//                       bg="white"
//                       borderRadius="lg"
//                       boxShadow="0 4px 24px #00000022"
//                       p={2}
//                       display="flex"
//                       flexDirection="column"
//                       alignItems="stretch"
//                       gap={1.5}
//                       minW="110px"
//                       position="relative"
//                     >
//                       <Box
//                         position="absolute"
//                         top="-10px"
//                         right="18px"
//                         width="0"
//                         height="0"
//                         borderLeft="8px solid transparent"
//                         borderRight="8px solid transparent"
//                         borderBottom="10px solid white"
//                         zIndex={1}
//                       />
//                       <Button
//                         size="sm"
//                         leftIcon={<FiPlus />}
//                         onClick={() => {
//                           setShowEditMenu(false);
//                           handleAvatarClick();
//                         }}
//                         colorScheme="teal"
//                         variant="ghost"
//                         justifyContent="flex-start"
//                         borderRadius="md"
//                         fontWeight="500"
//                         _hover={{ bg: "#F0F4F8" }}
//                       >
//                         Change
//                       </Button>
//                       {avatar && (
//                         <Button
//                           size="sm"
//                           leftIcon={<FiEdit2 />}
//                           onClick={() => {
//                             setShowEditMenu(false);
//                             onOpen();
//                           }}
//                           colorScheme="blue"
//                           variant="ghost"
//                           justifyContent="flex-start"
//                           borderRadius="md"
//                           fontWeight="500"
//                           _hover={{ bg: "#F0F4F8" }}
//                         >
//                           Edit Photo
//                         </Button>
//                       )}
//                       <Button
//                         size="sm"
//                         leftIcon={<FiX />}
//                         onClick={() => {
//                           setShowEditMenu(false);
//                           setAvatar(null);
//                         }}
//                         colorScheme="red"
//                         variant="ghost"
//                         justifyContent="flex-start"
//                         borderRadius="md"
//                         fontWeight="500"
//                         _hover={{ bg: "#F0F4F8" }}
//                       >
//                         Remove
//                       </Button>
//                     </Box>
//                   )}
//                 </Box>
//               </Box>
//             </Flex>

//             <CompletionProgress
//               showProfileCompletion={showProfileCompletion}
//               onToggleProfileCompletion={handleToggleProfileCompletion}
//             />
//             {showProfileCompletion && <ProfileCompletion />}

//             <Button
//               mb={{ base: "18px", md: "24px", lg: "36px" }}
//               fontWeight="medium"
//               bg="none"
//               width="100%"
//               borderRadius="full"
//               border="2px solid #1F6A75"
//               color="#1F6A75"
//               h={{ base: "52px", sm: "58px", md: "68px" }}
//               fontSize={{ base: "16px", sm: "18px", md: "20px" }}
//               _hover={{
//                 border: "none",
//                 color: "white",
//                 bg: "#1F6A75",
//               }}
//               onClick={handleToggleUpdateProfile}
//             >
//               Edit Profile
//             </Button>
//             {showUpdateProfile && <UpdateProfile userDetail={userDetail} />}

//             {/* Avatar Cropper Modal */}
//             <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
//               <ModalOverlay />
//               <ModalContent>
//                 <ModalHeader>Edit Photo</ModalHeader>
//                 <ModalBody>
//                   <Box
//                     position="relative"
//                     width="100%"
//                     height="300px"
//                     bg="#222"
//                     borderRadius="md"
//                     overflow="hidden"
//                   >
//                     {avatar && (
//                       <Cropper
//                         image={avatar}
//                         crop={crop}
//                         zoom={zoom}
//                         aspect={1}
//                         onCropChange={setCrop}
//                         onZoomChange={setZoom}
//                         onCropComplete={onCropComplete}
//                       />
//                     )}
//                   </Box>
//                   <Box mt={4}>
//                     <Text mb={2}>Zoom</Text>
//                     <Slider
//                       min={1}
//                       max={3}
//                       step={0.01}
//                       value={zoom}
//                       onChange={setZoom}
//                     >
//                       <SliderTrack>
//                         <SliderFilledTrack />
//                       </SliderTrack>
//                       <SliderThumb />
//                     </Slider>
//                   </Box>
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button colorScheme="teal" mr={3} onClick={handleCropSave}>
//                     Save
//                   </Button>
//                   <Button variant="ghost" onClick={onClose}>
//                     Cancel
//                   </Button>
//                 </ModalFooter>
//               </ModalContent>
//             </Modal>

//             <Button
//               color="#A2ABAA"
//               leftIcon={<GoQuestion />}
//               justifyContent="flex-start"
//               borderRadius="12px"
//               paddingLeft={{ base: "16px", sm: "18px", md: "24px" }}
//               mb={{ base: "18px", sm: "24px", md: "36px" }}
//               fontWeight="medium"
//               bg="white"
//               width="100%"
//               border={"2px solid #CED4D3"}
//               h={{ base: "52px", sm: "58px", md: "68px" }}
//               fontSize={{ base: "16px", sm: "18px", md: "20px" }}
//               _hover={{
//                 border: "none",
//                 color: "#0D0D0D",
//                 bg: "#CED4D3",
//               }}
//               onClick={handleToggleHelp}
//             >
//               Help
//             </Button>
//             {showHelp && <Help />}

//             <Button
//               color="#A2ABAA"
//               leftIcon={<GoLock />}
//               justifyContent="flex-start"
//               borderRadius="12px"
//               paddingLeft={{ base: "16px", sm: "18px", md: "24px" }}
//               mb={{ base: "18px", sm: "24px", md: "36px" }}
//               fontWeight="medium"
//               bg="white"
//               width="100%"
//               border={"2px solid #CED4D3"}
//               h={{ base: "52px", sm: "58px", md: "68px" }}
//               fontSize={{ base: "16px", sm: "18px", md: "20px" }}
//               _hover={{
//                 border: "none",
//                 color: "#0D0D0D",
//                 bg: "#CED4D3",
//               }}
//               onClick={() => navigate("/forgotpassword")}
//             >
//               Change Password
//             </Button>

//             <Button
//               color="#A2ABAA"
//               leftIcon={<GoSignOut />}
//               justifyContent="flex-start"
//               borderRadius="12px"
//               paddingLeft={{ base: "16px", sm: "18px", md: "24px" }}
//               mb={{ base: "18px", sm: "24px", md: "36px" }}
//               fontWeight="medium"
//               bg="white"
//               width="100%"
//               border={"2px solid #CED4D3"}
//               h={{ base: "52px", sm: "58px", md: "68px" }}
//               fontSize={{ base: "16px", sm: "18px", md: "20px" }}
//               _hover={{
//                 border: "none",
//                 color: "#0D0D0D",
//                 bg: "#CED4D3",
//               }}
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </BOX>
//   );
// };

// export default ProfilePage;

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Button,
  Text,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { FiChevronLeft, FiUser, FiPlus, FiX, FiEdit2 } from "react-icons/fi";
import { GoLock, GoQuestion, GoSignOut } from "react-icons/go";
import BOX from "../../views/BOX";
import ProfileCompletion from "./ProfileCompletion";
import UpdateProfile from "./UpdateProfile";
import CompletionProgress from "./CompletionProgress";
import Help from "./Help";

const ProfilePage = ({ userDetail }) => {
  const navigate = useNavigate();
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleToggleProfileCompletion = () =>
    setShowProfileCompletion((v) => !v);
  const handleToggleUpdateProfile = () => setShowUpdateProfile((v) => !v);
  const handleToggleHelp = () => setShowHelp((v) => !v);

  const getCroppedImg = async (imageSrc, cropPixels) => {
    const image = new window.Image();
    image.src = imageSrc;
    await new Promise((resolve) => {
      image.onload = resolve;
    });
    const canvas = document.createElement("canvas");
    canvas.width = cropPixels.width;
    canvas.height = cropPixels.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      cropPixels.x,
      cropPixels.y,
      cropPixels.width,
      cropPixels.height,
      0,
      0,
      cropPixels.width,
      cropPixels.height
    );
    return canvas.toDataURL("image/jpeg");
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (avatar && croppedAreaPixels) {
      const croppedImg = await getCroppedImg(avatar, croppedAreaPixels);
      setAvatar(croppedImg);
      onClose();
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please select a JPEG or PNG image.");
    }
  };

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

  return (
    <BOX>
      <Box w="100vw" minH="100vh" bg="gray.50">
        <Flex justify="center" align="center" py={10} backgroundColor={"#0f4446"}>
          <Box
            bg="white"
            borderRadius="full"
            color="#1F6A75"
            cursor="pointer"
            onClick={() => navigate(-1)}
            p={3}
            fontSize="2xl"
            _hover={{
              border: "1px solid #F49040",
              color: "#F49040",
              transform: "scale(1.05)",
              transition: "all 0.2s ease-in-out",
            }}
          >
            <FiChevronLeft />
          </Box>

          <Box px={6} textAlign="center" color="#1F6A75" >
            <Heading fontSize="3xl" fontWeight="600" color={"white"} fontFamily="Poppins">
              PROFILE
            </Heading>
          </Box>
        </Flex>

        <Box
          py={{ base: 10, md: 14 }}
          bg="white"
          borderTopRadius={{ base: "24px", md: "36px", lg: "64px" }}
          w="100%"
        >
          <Box maxW="500px" mx="auto" px={4}>
            <Flex direction="column" align="center">
              <Box position="relative" boxSize={{ base: "120px", md: "160px" }}>
                <Box
                  borderRadius="full"
                  overflow="hidden"
                  bg="white"
                  border="4px solid #A2ABAA"
                  w="full"
                  h="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="6xl"
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <FiUser color="#A2ABAA" />
                  )}
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    style={{ display: "none" }}
                  />
                </Box>

                <Box position="absolute" bottom={1} right={1}>
                  <Button
                    onClick={() => setShowEditMenu((v) => !v)}
                    borderRadius="full"
                    p={2}
                    bg="white"
                    border="1.5px solid #A2ABAA"
                    fontSize="lg"
                    _hover={{ bg: "#F5F5F5" }}
                  >
                    <FiEdit2 color="#A2ABAA" />
                  </Button>
                  {showEditMenu && (
                    <Box
                      mt={2}
                      bg="white"
                      borderRadius="md"
                      boxShadow="lg"
                      p={2}
                      minW="120px"
                      position="absolute"
                      right={0}
                      zIndex={10}
                    >
                      <Button
                        size="sm"
                        leftIcon={<FiPlus />}
                        variant="ghost"
                        justifyContent="flex-start"
                        onClick={() => {
                          setShowEditMenu(false);
                          handleAvatarClick();
                        }}
                      >
                        Change
                      </Button>
                      {avatar && (
                        <Button
                          size="sm"
                          leftIcon={<FiEdit2 />}
                          variant="ghost"
                          justifyContent="flex-start"
                          onClick={() => {
                            setShowEditMenu(false);
                            onOpen();
                          }}
                        >
                          Edit Photo
                        </Button>
                      )}
                      <Button
                        size="sm"
                        leftIcon={<FiX />}
                        variant="ghost"
                        justifyContent="flex-start"
                        onClick={() => {
                          setShowEditMenu(false);
                          setAvatar(null);
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Flex>

            <CompletionProgress
              showProfileCompletion={showProfileCompletion}
              onToggleProfileCompletion={handleToggleProfileCompletion}
            />
            {showProfileCompletion && <ProfileCompletion />}

            <Stack spacing={4} mt={6}>
              <Button
                onClick={handleToggleUpdateProfile}
                borderRadius="full"
                border="2px solid #1F6A75"
                color="#1F6A75"
                bg="white"
                fontWeight="medium"
                width="100%"
                mb={{ base: "18px", md: "24px", lg: "36px" }}
                h={{ base: "52px", sm: "58px", md: "68px" }}
                fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                _focus={{ outline: "none", boxShadow: "none" }}
                _hover={{
                  border: "none",
                  color: "white",
                  bg: "#1F6A75",
                }}
              >
                Edit Profile
              </Button>

              {showUpdateProfile && <UpdateProfile userDetail={userDetail} />}

              <Button
                leftIcon={<GoQuestion mr={{ base: "8px", sm: "12px", md: "16px" }} />}
                onClick={handleToggleHelp}
                borderRadius="md"
                color="#A2ABAA"
                bg="white"
                border="2px solid #CED4D3"
                justifyContent="flex-start"
                _hover={{ bg: "#CED4D3", color: "#0D0D0D" }}
                h="56px"
              >
                Help
              </Button>
              {showHelp && <Help />}

              <Button
                leftIcon={<GoLock />}
                onClick={() => navigate("/forgotpassword")}
                borderRadius="md"
                color="#A2ABAA"
                bg="white"
                border="2px solid #CED4D3"
                justifyContent="flex-start"
                _hover={{ bg: "#CED4D3", color: "#0D0D0D" }}
                h="56px"
              >
                Change Password
              </Button>

              <Button
                leftIcon={<GoSignOut />}
                onClick={handleLogout}
                borderRadius="md"
                color="#A2ABAA"
                bg="white"
                border="2px solid #CED4D3"
                justifyContent="flex-start"
                _hover={{ bg: "#CED4D3", color: "#0D0D0D" }}
                h="56px"
              >
                Logout
              </Button>
            </Stack>

            {/* Avatar Cropper Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Photo</ModalHeader>
                <ModalBody>
                  <Box
                    position="relative"
                    width="100%"
                    height="300px"
                    bg="#222"
                    borderRadius="md"
                    overflow="hidden"
                  >
                    {avatar && (
                      <Cropper
                        image={avatar}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    )}
                  </Box>
                  <Box mt={4}>
                    <Text mb={2}>Zoom</Text>
                    <Slider
                      min={1}
                      max={3}
                      step={0.01}
                      value={zoom}
                      onChange={setZoom}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="teal" mr={3} onClick={handleCropSave}>
                    Save
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Box>
    </BOX>
  );
};

export default ProfilePage; 
