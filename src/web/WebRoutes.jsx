// src/web/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./views/Login";
import PersonalInfo from "./views/Personal_info";
import SignUp from "./components/SignUp/SignUp";
import Home from "./views/Home";
import WebLayout from "./WebLayout";
import ForgotPasswordEmail from "./components/ForgotPassword/ForgotPasswordEmail";
import ForgotPasswordOTP from "./components/ForgotPassword/ForgotPasswordOTP";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
// import ProfilePage from "./components/ProfilePage/ProfilePage";
import SignUpOtp from "./components/SignUp/SignUpOtp";
import Congratulations from "./views/Congratulations";
import Navbar from "./components/Navbar/Navbar";
import { Flex } from "@chakra-ui/react";
import SelectCourses from "./components/Select Courses Weekend/SelectCourses";
import CorsesModule from "./components/Select Courses Weekend/CorsesModule";
import { useWeekendCoursesContext } from "./context/WeekendCoursesContext";
import styles from "./WebRoutes.module.css";

import SampleSVG from "./components/sample/SampleSVG";
import CategorySelectionPage from "./components/SelectCategory/CategorySelectionPage";
import SelectClasses from "./components/SelectClasses/SelectClasses";
import ContactUs from "./components/ContactUs/ContactUs";
import AboutUs from "./components/AboutUS/AboutUs";

import SubjectSelectionPage from "./components/AcademicSubjectSelection/SubjectSelectionPage";
import SubjectDetailsPage from "./components/SubjectDetailsPage/subjectDetails";
import { useWebUserContext } from "./context/WebUserContext";
import Dashboard from "./components/Dashboard/Dashboard";
import CourseList from "./components/All-Courses-Or-Chapters/CourseList";
import CourseGrid from "./components/All-Courses-Or-Chapters/CourseGrid";
import CourseDetials from "./components/All-Courses-Or-Chapters/CourseDetails";
import LessonDetials from "./components/All-Courses-Or-Chapters/LessonDetails";
import UserCourseDetails from "./components/Dashboard/UserCourseDetails";
import Footer from "./components/landingpage/Footer";
// import UpdateProfile from "./components/ProfilePage/ProfilePage";
import ProfilePageRedesign from "./components/ProfilePage/ProfilePageRedesign";
import ProtectedRoute from "./ProtectedRoute";
import { useEnrollmentContext } from "./context/WebEnrollmentContext";
import LessonPage from "./components/All-Courses-Or-Chapters/LessonPage";
import PrivacyPolicy from "./components/landingpage/PrivacyPolicy";
import TermsOfUse from "./components/landingpage/TermsOfUse_new";
import FAQ from "./components/landingpage/FAQ's";
import PrivateRoute from "./PrivateRoutes";
import ScrollToTop from "./components/ScrollToTop";

// import ProtectedRoute from "../shared/ProtectedRoute";

function WebRoutes() {
  const { weekendCoursesRoute } = useWeekendCoursesContext();
  const { loginUserInfo, setLoginUserInfo } = useWebUserContext();
  const { studentEnrollmentData } = useEnrollmentContext();

  // console.log("WebRoutes: studentEnrollmentData from WebRoutes", studentEnrollmentData);

  const location = useLocation();
  const Navigate = useNavigate();

  const storedUser = localStorage.getItem("userInfo");
  const storedToken = localStorage.getItem("userToken");

  const hasEnrollment =
    studentEnrollmentData &&
    typeof studentEnrollmentData === "object" &&
    Object.keys(studentEnrollmentData).length > 0;

  // Define protected route paths (where navbar should NOT show)
  const protectedPaths = [
    "/dashboard",

    "/courselist",
    "/coursegrid",
    "/coursedetails",
    "/lessondetails",
    "/lessonpage",
    "/user-course-details",
    // "/personalinfo",
    "/profilepage",
    // "/updateprofile",
  ];

  const showNavbar =
    (!storedToken || !hasEnrollment) &&
    !protectedPaths.includes(location.pathname);

  const userloggedIn = false; // storedUser && storedToken ? true : false;
  return (
    <>
      {/* if token is avalable then redirect to dashboard private */}
      {showNavbar && <Navbar />}
      <ScrollToTop /> {/* Add ScrollToTop component here */}
      <Flex className={styles.content}>
        <Routes>
          <Route path="/" element={<WebLayout />}>
            <Route index element={<PrivateRoute element={<Home />} />} />
            <Route
              path="/login"
              element={<PrivateRoute element={<Login />} />}
            />
            <Route
              path="/signup"
              element={<PrivateRoute element={<SignUp />} />}
            />
            <Route
              path="/signupotp"
              element={<PrivateRoute element={<SignUpOtp />} />}
            />
            <Route
              path="/forgotpassword"
              // element={<PrivateRoute element={<ForgotPassword />} />}
              element={<ForgotPassword />}
            />
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route
              path="/aboutus"
              element={<PrivateRoute element={<AboutUs />} />}
            />
            <Route
              path="/contactus"
              element={<PrivateRoute element={<ContactUs />} />}
            />

            <Route
              path="/forgotpasswordemail"
              element={<ForgotPasswordEmail />}
            />
            <Route path="/forgotpasswordotp" element={<ForgotPasswordOTP />} />
            <Route path="/resetpassword" element={<ResetPassword />} />

            {/* <Route path="/congratulations" element={<Congratulations />} /> */}
            <Route
              path="/congratulations"
              element={<ProtectedRoute element={<Congratulations />} />}
            />

            <Route
              path="/profilepage"
              element={<ProtectedRoute element={<ProfilePageRedesign />} />}
            />
            {/* <Route
              path="/profilepage"
              element={<ProtectedRoute element={<ProfilePage />} />}
            /> */}
            {/* <Route path="/personalinfo" element={<PersonalInfo />} /> */}
            {/* <Route
              path="/updateprofile"
              element={<ProtectedRoute element={<UpdateProfile />} />}
            /> */}
            {/* <Route path="/updateprofile" element={<UpdateProfile />} /> */}

            <Route
              path="/categoryselectionpage"
              element={<CategorySelectionPage />}
            />

            <Route path="/academic" element={<SelectClasses />} />
            <Route path="/skillbased" element={<SelectCourses />} />
            <Route
              path={`/path/${weekendCoursesRoute}`}
              element={<CorsesModule />}
            />

            <Route path="/samplesvg" element={<SampleSVG />} />
            <Route
              path="/SubjectSelection"
              element={<SubjectSelectionPage />}
            />
            <Route
              path="/subjects/:className"
              element={<SubjectSelectionPage />}
            />
            <Route path="/subject-details" element={<SubjectDetailsPage />} />
            <Route path="/home" element={<Home />} />

            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute
                  loginUserInfo={loginUserInfo}
                  hasEnrollment={studentEnrollmentData}
                  element={<Dashboard />}
                />
              }
            />
            <Route
              path="/courselist"
              element={<ProtectedRoute element={<CourseList />} />}
            />
            <Route
              path="/coursegrid"
              element={<ProtectedRoute element={<CourseGrid />} />}
            />
            <Route
              path="/coursedetails"
              element={<ProtectedRoute element={<CourseDetials />} />}
            />
            <Route
              path="/lessondetails"
              element={<ProtectedRoute element={<LessonDetials />} />}
            />
            <Route
              path="/lessonpage"
              element={<ProtectedRoute element={<LessonPage />} />}
            />
            <Route
              path="/user-course-details"
              element={
                <ProtectedRoute
                  hasEnrollment={hasEnrollment}
                  element={<UserCourseDetails />}
                />
              }
            />
          </Route>

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
        </Routes>
      </Flex>
    </>
  );
}

export default WebRoutes;
