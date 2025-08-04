import React from "react";
import { Navigate } from "react-router-dom";
import { useEnrollmentContext } from "./context/WebEnrollmentContext";

// ProtectedRoute component
const PrivateRoute = ({ element }) => {
  const storedToken = localStorage.getItem("userToken"); // Or use your context/user data here

  const { studentEnrollmentData } = useEnrollmentContext();

  console.log("PrivateRoute: studentEnrollmentData from private route", studentEnrollmentData);

  const hasEnrollment =
    studentEnrollmentData &&
    typeof studentEnrollmentData === "object" &&
    Object.keys(studentEnrollmentData).length > 0;
  // If the user is not logged in (no token), redirect to login
  if (storedToken && !hasEnrollment) {
    return <Navigate to="/categoryselectionpage" />;
  } else if (storedToken && hasEnrollment) {
    return <Navigate to="/dashboard" />;
  }
  

  // If logged in, render the requested element
  return element;
};
 
export default PrivateRoute;
