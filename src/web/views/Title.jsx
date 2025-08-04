import React from 'react';
import { Box, Image, Heading, Text, HStack } from '@chakra-ui/react';
import logo from "../../assets/LogoDark.svg";

function Title() {
  return (
      <Box  alignItems = "center" mb={0} mt={0}>
        <Image src={logo} alt="OTS logo" boxSize= {{ base: "176px" ,md: "238px"}} />
      </Box>
  );
}

export default Title;
