import { Routes, Route } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import DashboardNavbar from "./DashBoardNavBar";
import DashBoardSideBar from "./DashboardSidebar";
import LessonDetails from "../All-Courses-Or-Chapters/LessonDetails";
import UserCourseDetails from "./UserCourseDetails";
import { useDashboardContext } from '../../context/DashboardContext';
import CourseDetials from "../All-Courses-Or-Chapters/CourseDetails";
// import ProfilePage from "../ProfilePage/ProfilePageRedesign";
import LessonPage from "../All-Courses-Or-Chapters/LessonPage";
import ChangeCourse from "./ChangeCourse";
import DashboardSubjectSelection from "./DashboardSubjectSelection";
import { useState } from "react";
import ProfilePageRedesign from "../ProfilePage/ProfilePageRedesign";
import CategorySelectionPage from "../SelectCategory/CategorySelectionPage";
import SelectClasses from "../SelectClasses/selectclasses";
import SubjectSelectionPage from "../AcademicSubjectSelection/SubjectSelectionPage";
import SubjectDetailsPage from "../SubjectDetailsPage/subjectDetails";


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setSelectedView } = useDashboardContext();

  return (
    <Flex direction="column" width="100vw" overflow="hidden">
      {/* Navbar */}
      <Box flexShrink={0} position={"fixed"} width={"100vw"} zIndex={1000}>
        <DashboardNavbar setSelection={setSelectedView} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </Box>

      {/* Main content area: sidebar + content */}
      <Flex flex="1" overflow="hidden" marginTop={"72px"}>
        {/* Sidebar */}
        <DashBoardSideBar
          isOpen={isSidebarOpen}
          setSelection={setSelectedView}
        />

        {/* Content Area */}
        <Box flex="1" width={"99vw"} bg="transparent" overflowY="auto" height="100%">
          <Routes>
            <Route path="change-course" element={
              <ChangeCourse setSelectedView={setSelectedView} setIsSidebarOpen={setIsSidebarOpen} />
            } />
            <Route path="subject-selection" element={
              <DashboardSubjectSelection setSelectedView={setSelectedView} setIsSidebarOpen={setIsSidebarOpen} />
            } />
            <Route path="course-details" element={
              <CourseDetials setSelectedView={setSelectedView} />
            } />
            <Route path="lesson-page" element={
              <LessonPage setSelectedView={setSelectedView} />
            } />
            <Route path="profile" element={
              <ProfilePageRedesign />
            } />
            <Route path="*" element={
              <UserCourseDetails setIsSidebarOpen={setIsSidebarOpen} />
            } />
            <Route path="category" element={<CategorySelectionPage  />} />
            <Route path="/category/digitalschool-classes" element={<SelectClasses />}/>
            <Route path="/category/digitalschool-classes/subjects/:className" element={<SubjectSelectionPage />}/>
            <Route path="/category/digitalschool-classes/subjects/:className/subject-details" element={<SubjectDetailsPage />} />
          </Routes>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;