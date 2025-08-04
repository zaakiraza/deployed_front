import React, { useEffect } from 'react';
import DashboardTitle from './DashboardTitle';
import DashboardSubjectDetails from './DashboardSubjectDetails';
import BOX from '../../views/BOX';

function UserCourseDetails({setIsSidebarOpen}) {
  useEffect(()=>{
      setIsSidebarOpen(false)
  },[])
  return (
    <BOX>
    <DashboardTitle/>
    <DashboardSubjectDetails/>
    </BOX>
  )
}

export default UserCourseDetails