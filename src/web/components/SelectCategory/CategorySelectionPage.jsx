"use client";

import React from "react";
import FontProvider from "./FontProvider";
import CategorySelection from "./CategorySelection";
import { Box } from "@chakra-ui/react";
import BOX from "../../views/BOX";


/**
 * CategorySelectionPage is the main component that combines the font provider and category selection.
 * This is the primary exported component that should be used in the application.
 */
const CategorySelectionPage = () => {
  return (
    <BOX>
    <FontProvider>
      <Box
        // bg="transparent"
        // pt={{ base: 4, md: 8, lg: 10 }}       // Responsive top padding
        // px={{ base: 4, md: 8, lg: 16 }}       // Responsive horizontal padding
        // mt={{ base: 4, md: 6, lg: 8 }}        // Responsive margin top
        maxW={{ base: "75%", md: "85%" }}
        width="952px"
        // border={"1px solid #F49040"} // Border color   
        mx={"auto"} // Center the box
      >
        <CategorySelection />
      </Box>
    </FontProvider>

    </BOX>
  );
};

export default CategorySelectionPage;
