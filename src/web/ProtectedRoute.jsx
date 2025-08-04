import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";


// ProtectedRoute component
const ProtectedRoute = ({ element,hasEnrollment, loginUserInfo }) => {
   
    // const { loginUserInfo } = useWebUserContext();
    // const { studentEnrollmentData } = useEnrollmentContext();
  
   
    
  
    const storedUser = localStorage.getItem("userInfo");
    const storedToken = localStorage.getItem("userToken");
  
    // const hasEnrollment =
    //   studentEnrollmentData &&
    //   typeof studentEnrollmentData === "object" &&
    //   Object.keys(studentEnrollmentData).length > 0;

  
  // If the user is not logged in (no token), redirect to login
  if (!storedToken) {
    return <Navigate to="/login" />;
  }
  // if(storedToken && !hasEnrollment){
  //   return <Navigate to="/categoryselectionpage"/>
  // }



  // If logged in, render the requested element
  console.log("ProtectedRoute: User is logged in, rendering element", loginUserInfo);
  
  return element;
};

export default ProtectedRoute;
