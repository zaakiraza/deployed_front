
import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';
// import { useToast } from '@chakra-ui/react';

const LessonContext = createContext(null);

export function LessonProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allLessons, setAllLessons] = useState([]);
    const [filteredLessons, setFilteredLessons] = useState([]);
  // const toast = useToast();
  
  const BASE_URL = "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api"
  //get all lessons

  

  const getAllLessons = async (id) => {
    try {
      localStorage.setItem('chapterId', id); // Log the chapter ID to check if it's correct
      const response = await axios.get(`${BASE_URL}/lessons?chapterId=${id}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch lessons');
      }
      // console.log("lessons:", response.data.data.lessons);
        setAllLessons(response.data.data.lessons);
    } catch (error) {
      if (error.response) {
        throw new Error(`Server error: ${error.response.status} - ${error.response.data.message || 'No additional error information'}`);
      } else if (error.request) {
        throw new Error('Network error: No response received from server');
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  };

    


  useEffect(() => {
    setLoading(true);
    const chapterId = localStorage.getItem("chapterId");
    const id = chapterId
    getAllLessons(id)
      .then(() => setLoading(false))
      .catch(err => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);





  

  const contextValue = useMemo(() => ({
    allLessons,
    setAllLessons,
    loading,
    setLoading,
    setError,
    error,
    getAllLessons,
    filteredLessons,
    setFilteredLessons,
  }), [loading,error,getAllLessons]);

  return (
    <LessonContext.Provider value={contextValue}>
      {children}
    </LessonContext.Provider>
  );
}

export function useLessonContext() {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLessonContext must be used within a LessonProvider');
  }
  return context;
}