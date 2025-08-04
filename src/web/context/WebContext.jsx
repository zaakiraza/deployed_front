import React, { createContext, useContext, useState } from "react";
import { WebUserProvider } from "../context/WebUserContext";
import { WeekendCoursesProvider } from "../context/WeekendCoursesContext";
import { FCategoryProvider } from "./CategoryContext";
import { DashboardProvider } from "./DashboardContext";
import {SubjectProvider} from "./WebSubjectContext";
import { ChapterProvider } from "./WebChapterContext";
import { LessonProvider } from "./WebLessonContext";
import { EnrollmentProvider } from "./WebEnrollmentContext";

// Create the context
const WebContext = createContext();

// Context Provider component
export const WebProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Value to be passed to context consumers
    const value = { token, setToken };

    return (
        <WebContext.Provider value={value}>
                                        <EnrollmentProvider>
            <WebUserProvider>
                <WeekendCoursesProvider>
                    <FCategoryProvider>
                        <DashboardProvider>
                            <SubjectProvider>
                                <ChapterProvider>
                                    <LessonProvider>
                                            {children}
                                    </LessonProvider>
                                </ChapterProvider>
                            </SubjectProvider>
                        </DashboardProvider>
                    </FCategoryProvider>
                </WeekendCoursesProvider>
            </WebUserProvider>
                                        </EnrollmentProvider>
        </WebContext.Provider>
    );
};

// Custom hook to use web context
export const useWebContext = () => useContext(WebContext);
