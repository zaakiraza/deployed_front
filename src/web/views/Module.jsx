import React from "react";
import { Text, Box, Flex, VStack, useBreakpointValue } from "@chakra-ui/react";
import tooltip from "../../assets/tooltip-icon.svg";
import dot from "../../assets/dot.svg";
import Line from "../../assets/Line.svg";
import Line2 from "../../assets/Lineo.svg";
import tick from "../../assets/tick.svg";
import SampleSVG from "../components/sample/SampleSVG";
import { useNavigate } from "react-router-dom";

function Module({ courseModules = [], courseDetails, background }) {
  const Navigate = useNavigate();

  if (!Array.isArray(courseModules)) {
    return <Text color="red">Error: courseModules must be an array.</Text>;
  }

  // Color logic based on background
  const isWhiteBg = background === "white";
  const mainTextColor = isWhiteBg ? "#1F6A75" : "white";
  const secondaryTextColor = isWhiteBg ? "#A2ABAA" : "white";
  const cardBg = isWhiteBg
    ? "#FFFFFF"
    : "linear-gradient(-90deg, #FFFFFF35 0.35%, #FFFFFF10 100%)";
  const borderCol = isWhiteBg ? "#1F6A75" : "#ffffff50";

  return (
    <>
      {courseModules.map((course) => (
        <VStack
          key={course.id}
          maxWidth="952px"
          width="95%"
          background={cardBg}
          border="1px solid"
          borderColor={borderCol}
          sx={{
            boxShadow: "2xl",
            backdropFilter: "blur(24px)",
          }}
          borderRadius="24px"
          padding={{ base: "20px", sm: "30px", md: "40px" }}
          boxSizing="border-box"
        >
          <Box maxWidth="952px" width="95%">
            <Flex flexDirection="row" alignItems="center">
              <Box width="100%">
                <Flex
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="start"
                    gap={{ base: "14px", sm: "28px", md: "36px" }}
                  >
                    <Box
                      width={{ base: "12%", md: "16%", lg: "22%" }}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <SampleSVG
                        percentage={course.percentage}
                        isWhiteBg={isWhiteBg}
                      />{" "}
                    </Box>

                    <Text
                      color={mainTextColor}
                      fontWeight="400"
                      width="100%"
                      fontSize={{
                        base: "14px",
                        sm: "16px",
                        md: "20px",
                        lg: "24px",
                      }}
                      fontFamily="Poppins"
                      textAlign="left"
                    >
                      {course.moudleNumber} - {course.duration}
                    </Text>
                  </Flex>

                  <Box width={{ base: "12%", sm: "6%", md: "5%", lg: "5%" }}>
                    <img
                      src={tooltip}
                      alt="Image of tooltip"
                      width="100%"
                      style={{
                        filter: isWhiteBg
                          ? "brightness(0) saturate(100%) invert(80%) sepia(7%) saturate(434%) hue-rotate(82deg) brightness(92%) contrast(88%)"
                          : "none",
                      }}
                    />
                  </Box>
                </Flex>

                <Flex flexDirection="column">
                  {course.task.map((task, index) => (
                    <Box key={index}>
                      <Flex
                        flexDirection="row"
                        alignItems="start"
                        justifyContent="start"
                        gap={{ base: "14px", sm: "28px", md: "36px" }}
                      >
                        {/* Dot and Line container */}
                        <Box
                          width={{ base: "12%", sm: "11.5%", md: "14.5%" }}
                          height="auto"
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          gap="12px"
                          justifyContent="center"
                          marginTop="12px"
                        >
                          {task.iscomplete ? (
                            <Box
                              width={{ base: "8px", md: "10px", lg: "12px" }}
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                            >
                              <img
                                src={tick}
                                alt="tick"
                                style={{
                                  display: "block",
                                  margin: "0 auto",
                                  filter: isWhiteBg
                                    ? "brightness(0) saturate(100%) invert(63%) sepia(79%) saturate(1116%) hue-rotate(346deg) brightness(101%) contrast(101%)"
                                    : "none",
                                }}
                              />
                            </Box>
                          ) : (
                            <Box
                              width={{ base: "6px", md: "8px", lg: "10px" }}
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                            >
                              <img
                                src={dot}
                                alt="dot"
                                style={{
                                  display: "block",
                                  margin: "0 auto",
                                  filter: isWhiteBg
                                    ? "brightness(0) saturate(100%) invert(80%) sepia(7%) saturate(434%) hue-rotate(82deg) brightness(92%) contrast(88%)"
                                    : "none",
                                }}
                              />
                            </Box>
                          )}
                          {/* Show line only if it's not the last task */}
                          {task.iscomplete
                            ? course.task.length !== index + 1 && (
                                <Box
                                  width={{
                                    base: "2px",
                                    md: "3px",
                                    lg: "4px",
                                  }}
                                  display="flex"
                                  flexDirection="column"
                                  alignItems="center"
                                >
                                  <img
                                    src={Line2}
                                    alt="line"
                                    style={{
                                      display: "block",
                                      margin: "0 auto",
                                      filter: isWhiteBg
                                        ? "brightness(0) saturate(100%) invert(63%) sepia(79%) saturate(1116%) hue-rotate(346deg) brightness(101%) contrast(101%)"
                                        : "none",
                                    }}
                                    height="20px"
                                  />
                                </Box>
                              )
                            : course.task.length !== index + 1 && (
                                <Box
                                  width={{
                                    base: "2px",
                                    md: "3px",
                                    lg: "4px",
                                  }}
                                  display="flex"
                                  flexDirection="column"
                                  alignItems="center"
                                >
                                  <img
                                    src={Line}
                                    alt="line"
                                    style={{
                                      display: "block",
                                      margin: "0 auto",
                                      filter: isWhiteBg
                                        ? "brightness(0) saturate(100%) invert(80%) sepia(7%) saturate(434%) hue-rotate(82deg) brightness(92%) contrast(88%)"
                                        : "none",
                                    }}
                                    height="20px"
                                  />
                                </Box>
                              )}
                        </Box>
                        {/* Task Content */}
                        <Box width="100%">
                          <Text
                            color={mainTextColor}
                            fontWeight="400"
                            fontSize={{
                              base: "14px",
                              md: "18px",
                              lg: "24px",
                            }}
                            fontFamily="Poppins"
                            textAlign="left"
                            style={{
                              cursor: courseDetails.isEnroled
                                ? "pointer"
                                : "default",
                            }}
                            onClick={
                              courseDetails.isEnroled
                                ? () => {
                                    Navigate("/notes");
                                  }
                                : null
                            }
                          >
                            {task.title}
                          </Text>

                          <Text
                            color={secondaryTextColor}
                            fontWeight="200"
                            fontSize={{
                              base: "12px",
                              md: "14px",
                              lg: "16px",
                            }}
                            fontFamily="Poppins"
                            textAlign="left"
                          >
                            {courseDetails.exerciseType}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              </Box>
            </Flex>
          </Box>
        </VStack>
      ))}
    </>
  );
}

export default Module;
