import React from "react";

/**
 * FontProvider component to load the Poppins font
 * This is separated to avoid duplicate font loading when multiple components use the same font
 */
const FontProvider = ({ children }) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
};

export default FontProvider;