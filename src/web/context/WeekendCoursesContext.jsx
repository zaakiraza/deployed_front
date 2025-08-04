import React, { createContext, useContext, useEffect, useState } from "react";


// Create User Context
const WeekendCoursesContext = createContext();

// User Provider Component
export const WeekendCoursesProvider = ({ children }) => {
  
        const [weekendCoursesRoute, setWeekendCoursesRoute] = useState("");


       

 

 



  return (
    <WeekendCoursesContext.Provider
      value={{
        weekendCoursesRoute,
        setWeekendCoursesRoute,
      }}
    >
      {children}
    </WeekendCoursesContext.Provider>
  );
};

// Custom Hook to Use User Context
export const useWeekendCoursesContext = () => useContext(WeekendCoursesContext);