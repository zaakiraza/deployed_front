
import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';
// import { useToast } from '@chakra-ui/react';

const SubjectContext = createContext(null);

export function SubjectProvider({ children }) {
   const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allSubjects, setAllSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalSubjects, setTotalSubjects] = useState(0);
  // const toast = useToast();
  
  const BASE_URL = "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api"
  //get all subjects

    const getAllSubjects = async (id, page = 1, limit = 10) => {
        const subjectId = id;
        try {
            const response = await axios.get(
                `${BASE_URL}/subjects?subcategoryId=${subjectId}&page=${page}&limit=${limit}`
            );
            if (response.status !== 200) {
                throw new Error('Failed to fetch subjects');
            }
            setAllSubjects(response.data.data.subjects);
            setTotalSubjects(response.data.data.total || 0); // Adjust according to your API response
             const subcategoryId = response.data.data.subjects[0]?.subcategoryId; 
  localStorage.setItem("subcategoryId", subcategoryId);
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


 const subcategoryId = localStorage.getItem("subcategoryId");
    const id = subcategoryId;

    useEffect(() => {
        setLoading(true);
        getAllSubjects(id, page, limit)
            .then(() => setLoading(false))
            .catch(err => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    }, [id, page, limit]);





  

  const contextValue = useMemo(() => ({
        allSubjects,
        setAllSubjects,
        loading,
        setLoading,
        setError,
        error,
        getAllSubjects,
        filteredSubjects,
        setFilteredSubjects,
        page,
        setPage,
        limit,
        setLimit,
        totalSubjects,
    }), [loading, error, getAllSubjects, allSubjects, filteredSubjects, page, limit, totalSubjects]);

  return (
    <SubjectContext.Provider value={contextValue}>
      {children}
    </SubjectContext.Provider>
  );
}

export function useSubjectContext() {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error('useSubjectContext must be used within a SubjectProvider');
  }
  return context;
}