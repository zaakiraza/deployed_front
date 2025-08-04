import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const FCategoryContext = createContext(null);

export function FCategoryProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const toast = useToast();
  const BASE_URL =
    "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api";

  //get all categories

  const getCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch categories");
      }
      setCategories(response.data.data.categories);
      const categoryId = response.data.data.categories.find(
        (category) => category.name === "Academic"
      )?.id;
      localStorage.setItem("categoryId", categoryId);
      // console.log(localStorage.getItem('categoryId'));

      return response;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "No additional error information"
          }`
        );
      } else if (error.request) {
        throw new Error("Network error: No response received from server");
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  };

  //get all sub-categories AKA Classes or week-endcourses
  const [subCategories, setSubCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
  });

  const getSubCategories = useCallback(
    async (page = 1, limit = 10, categoryId) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BASE_URL}/subcategories`, {
          params: { page, limit, categoryId },
        });
        if (response.status !== 200) {
          throw new Error("Failed to fetch subcategories");
        }
        const data = response.data.data; // adjust if your API structure is different
        // console.log(data);
        // Replace or append depending on page
        if (page === 1) {
          setSubCategories(response.data.data.subCategories);
          // console.log("Subcategories fetched:", response.data.data.subCategories);
        } else {
          setSubCategories((prev) => [
            ...prev,
            ...response.data.data.subCategories,
          ]);
        }

        setPagination(response.data.data.pagination);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Load next page helper
  const loadNextPage = () => {
    if (pagination.hasNextPage) {
      getSubCategories(pagination.currentPage + 1, pagination.limit);
    }
  };

  const contextValue = useMemo(
    () => ({
      getCategories,
      categories,
      subCategories,
      pagination,
      loading,
      error,
      getSubCategories,
      loadNextPage,
    }),
    [loading, error, getCategories]
  );

  return (
    <FCategoryContext.Provider value={contextValue}>
      {children}
    </FCategoryContext.Provider>
  );
}

export function useFCategoryContext() {
  const context = useContext(FCategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
}
