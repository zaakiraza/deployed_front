import React from "react";
import style from "./SampleSVG.module.css";
import { Box } from "@chakra-ui/react";

const SampleSVG = ({ percentage, isWhiteBg }) => {
  // Dynamic colors
  const bgStroke = isWhiteBg ? "#1F6A7525" : "#FFFFFF25";
  const fgStroke = "#F49040";
  const textColor = isWhiteBg ? "#1F6A75" : "#FFFFFF";
  const markerBg = isWhiteBg ? "#1F6A7535" : "#FFFFFF35";

  return (
    <Box className={style.container} width={{ base: "150%", md: "100%", lg: "120%" }}>
      <svg className={style.svg} viewBox="0 0 36 36">
        <path
          className={style.bg}
          d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          stroke={bgStroke}
        />
        <path
          className={style.fg}
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          stroke={fgStroke}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          transform="rotate(90, 18, 18)"
          className={style.text}
          fill={textColor}
        >
          {percentage}%
        </text>
      </svg>
      <Box
        className={style.lineSvg}
        width={{ base: "2px", md: "3px", lg: "4px" }}
      >
        <Box
          className={style.marker}
          style={{ background: markerBg }}
        />
      </Box>
    </Box>
  );
};

export default SampleSVG;