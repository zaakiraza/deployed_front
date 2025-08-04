import React from 'react'
import { Box, Flex } from "@chakra-ui/react";
import styles from './BOX.module.css'; // Import the CSS module

function BOX({ children }) {
  return (
    <Box className={styles.container} >
          {/* <Flex className={styles.circle1} ></Flex>
          <Flex className={styles.circle2} ></Flex>  */}
          {children}
           </Box>
  )
}

export default BOX;