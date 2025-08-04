import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create User Context
const WebUserContext = createContext();

// User Provider Component
export const WebUserProvider = ({ children }) => {
  // Register user + OTP verification
  const [newUser, setNewUser] = useState(null); // Initialize newUser state
  const [registeredUserEmail, setRegisteredUserEmail] = useState(null);
  const BASE_URL =
    "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api/users";
  const REGISTER_URL = `${BASE_URL}/register`;
  const VERIFY_OTP_URL = `${BASE_URL}/verify-otp`;
  const RESEND_OTP_URL = `${BASE_URL}/resend-otp`;
  const LOGIN_URL = `${BASE_URL}/login`;
  const FORGET_PASSWORD_EMAIL = `${BASE_URL}/forget-password`;
  const RESET_PASSWORD = `${BASE_URL}/reset-password`;

  const registerUser = async (registerNewUser) => {
    try {
      const res = await axios.post(`${REGISTER_URL}`, registerNewUser);
      // console.log("Registration response:", res.data);
      const { user } = res.data.data;
      setNewUser(user); // Set the new user state
      setRegisteredUserEmail(user.email);
      return {
        success: true,
        message: "Successfully registered",
        user: user,
      };
    } catch (err) {
      // console.log("Error in Register user", err);
      return { success: false, message: err.response.data.message };
    }
  };

  // Log newUser and registeredUserEmail when they change
  useEffect(() => {
    if (newUser) {
      // console.log(newUser); Log newUser when it changes
    }
  }, [newUser]); // Runs when newUser changes

  useEffect(() => {
    if (registeredUserEmail) {
      // console.log(registeredUserEmail); 
      // Log registeredUserEmail when it changes
    }
  }, [registeredUserEmail]); // Runs when registeredUserEmail changes

  // Sign up OTP
  const signUpOtp = async (otp) => {
    const email = localStorage.getItem("registeredUserEmail");
    try {
      const res = await axios.post(`${VERIFY_OTP_URL}`, {
        otp: otp,
        email: email,
      });
      localStorage.removeItem("registeredUserEmail");
      setRegisteredUserEmail(null);
      setNewUser(null);
      return {
        success: true,
        message: "Email verification successful",
      };
    } catch (err) {
      let errorMessage = "An error occurred during OTP verification.";
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = err.response.message || "Unauthorized access.";
        } else if (err.response.status === 404) {
          errorMessage = err.response.message || "User not found.";
        } else if (err.response.status === 400) {
          errorMessage = err.response.message || "Invalid or expired OTP.";
        }
      }
      return { success: false, message: errorMessage };
    }
  };

  //*************Resend Signup Otp****************

  const resendOtp = async (email) => {
    try {
      const res = await axios.post(`${RESEND_OTP_URL}`, { email });

      return {
        success: true,
        message: "OTP has been sent to your email.",
      };
    } catch (err) {
      let errorMessage = "An error occurred during OTP regeneration.";

      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = err.response.data?.message || "Unauthorized access.";
        } else if (err.response.status === 404) {
          errorMessage = err.response.data?.message || "User not found.";
        } else {
          errorMessage = err.response.data?.message || errorMessage;
        }
      }

      return { success: false, message: errorMessage };
    }
  };

  //*****************/ Login User*******************
  const [userLoginToken, setUserLoginToken] = useState(null);
  const [loginUserInfo, setLoginUserInfo] = useState(null);

  const loginUser = async (userCredentials) => {
    try {
      const res = await axios.post(`${LOGIN_URL}`, userCredentials);
      setUserLoginToken(res.data.data.token);
      setLoginUserInfo(res.data.data.user);
      localStorage.setItem("userToken", res.data.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.data.user));
      
      

      return { success: true, user: res.data.data.user, token: res.data.data.token  }; // Indicate success
    } catch (err) {
      // console.log(err);
      return {
        success: false,
        message: err.response.data.message || "Login failed",
      }; // Return structured error
    }
  };

  // Log userLoginToken and loginUserInfo when they change
  useEffect(() => {
    if (userLoginToken) {
      // console.log(userLoginToken); // Log userLoginToken when it changes
    }
  }, [userLoginToken]);

  useEffect(() => {
    if (loginUserInfo) {
      // console.log(loginUserInfo); // Log loginUserInfo when it changes
    }
  }, [loginUserInfo]);

  // *************Reset password****************
  const [userEmail, setUserEmail] = useState("");
  const [resetotp, setResetotp] = useState("");

  //problem is here
  const resetPasswordEmail = async (email) => {
    try {
      const res = await axios.post(`${FORGET_PASSWORD_EMAIL}`, { email }); // Send as an object
      setUserEmail(email);
      // console.log(res);
    } catch (error) {
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {}, [userEmail]);

  const verifyOtp = async (enteredOtp, userEmail) => {
    // console.log("Entered OTP:", enteredOtp);
    // console.log("User  Email:", userEmail);

    try {
      const res = await axios.post(`${VERIFY_OTP_URL}`, {
        otp: enteredOtp,
        email: userEmail,
      }); // Ensure the structure is { otp: enteredOtp }
      // console.log("Response:", res);
      setResetotp(enteredOtp);
      return {
        success: true,
        message: "Email verification successful",
      };
    } catch (err) {
      console.error("Error during OTP verification:", err); // Log the entire error
      let errorMessage = "An error occurred during OTP verification.";
      if (err.response) {
        console.error("Response data:", err.response.data); // Log response data for debugging
        if (err.response.status === 400) {
          errorMessage = err.response.data.message || "Invalid request.";
        } else {
          errorMessage = err.response.data.message || "An error occurred.";
        }
      }
      return { success: false, message: errorMessage };
    }
  };

  const resetPassword = async (updatedPassword, userEmail) => {
    try {
      // console.log(userEmail, updatedPassword);
      const res = await axios.post(`${RESET_PASSWORD}?email=${userEmail}`, {
        newPassword: updatedPassword,
      });

      // console.log("Password reset response:", res.data);

      // Clear fields after successful reset
      setUserEmail("");
      setResetotp("");

      return {
        success: true,
        message: "Password reset successfully.",
      };
    } catch (error) {
      let errorMessage = "An error occurred during password reset.";

      if (error.response) {
        console.error("Error response data:", error.response.data);
        errorMessage = error.response.data.message || "An error occurred.";
      } else {
        console.error("Error:", error.message);
      }

      return { success: false, message: errorMessage };
    }
  };

  return (
    <WebUserContext.Provider
      value={{
        newUser,
        userEmail,
        resetotp,
        registerUser,
        signUpOtp,
        loginUser,
        userLoginToken,
        loginUserInfo,
        setLoginUserInfo,
        setUserLoginToken,
        resetPasswordEmail,
        setUserEmail,
        setResetotp,
        verifyOtp,
        resetPassword,
        resendOtp,
        registeredUserEmail,
      }}
    >
      {children}
    </WebUserContext.Provider>
  );
};

// Custom Hook to Use User Context
export const useWebUserContext = () => useContext(WebUserContext);
