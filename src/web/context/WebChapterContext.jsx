
import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';
import { sub } from 'framer-motion/client';
// import { useToast } from '@chakra-ui/react';

const ChapterContext = createContext(null);

export function ChapterProvider({ children }) {
     const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allChapters, setAllChapters] = useState([]);
    const [filteredChapters, setFilteredChapters] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalChapters, setTotalChapters] = useState(0);
  // const toast = useToast();
  
  const BASE_URL = "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api"

    // get all chapters with pagination
    const getAllChapters = async (subjectId, page = 1, limit = 10) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/chapters?subjectId=${subjectId}&page=${page}&limit=${limit}`
            );
            if (response.status !== 200) {
                throw new Error('Failed to fetch chapters');
            }
            setAllChapters(response.data.data.chapters);
            // console.log(allChapters);
           setTotalChapters(response.data.data.pagination?.totalChapters || 0);
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

    const subjectId = localStorage.getItem('subjectId');
  const id = subjectId

  useEffect(() => {
        setLoading(true);
        getAllChapters(id, page, limit)
            .then(() => setLoading(false))
            .catch(err => {
                setError(err.message || "Something went wrong");
                setLoading(false);
            });
    }, [subjectId, page, limit]);



   const fetchChapterCount = async (subjectId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/chapters?subjectId=${subjectId}&page=1&limit=1`
        );
        if (response.status !== 200) {
            throw new Error('Failed to fetch chapters');
        }
        // Use totalChapters from pagination
        return response.data.data.pagination?.totalChapters || 0;
    } catch (error) {
        return 0;
    }
};





  

   const contextValue = useMemo(() => ({
        allChapters,
        setAllChapters,
        loading,
        setLoading,
        fetchChapterCount,
        setError,
        error,
        getAllChapters,
        filteredChapters,
        setFilteredChapters,
        page,
        setPage,
        limit,
        setLimit,
        totalChapters,
    }), [loading, error, getAllChapters, allChapters, filteredChapters, page, limit, totalChapters]);

  return (
    <ChapterContext.Provider value={contextValue}>
      {children}
    </ChapterContext.Provider>
  );
}

export function useChapterContext() {
  const context = useContext(ChapterContext);
  if (!context) {
    throw new Error('useChapterContext must be used within a ChapterProvider');
  }
  return context;
}