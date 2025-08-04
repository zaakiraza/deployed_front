import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
// import { useToast } from '@chakra-ui/react';

const EnrollmentContext = createContext(null);

export function EnrollmentProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();
  const BASE_URL =
    "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api";
  //get all enrollments

  const studentEnrollments = async ({
    studentId,
    userToken,
    subcategoryId,
  }) => {
    const status = "active";
    try {
      const response = await axios.post(
        `${BASE_URL}/enrollments`,
        { studentId, subcategoryId, status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // console.log(response);

     await  getEnrollmentsByStudentId(studentId, userToken);

      if (response.status === 409) {
        // If the response is a 409 Conflict, it means the student is already enrolled
        // console.log("Conflict: Student is already enrolled in this class");
        return { success: false, message: "Student is already in this class." };
      }

      if (response.status === 200) {
        // If the response is a 200, enrollment was successful
        // console.log("Enrollment successful:", response);
        return { success: true, data: response.data }; // Return the success status and any relevant data
      }

      if (response.status === 201) {
        // If the response is a 201 Created, it means a new enrollment was created
        // console.log("New enrollment created:", response);
        return { success: true, data: response.data };
      }

      // If the status is something other than 200 or 409, handle it
      console.error("Unexpected response status:", response.status);
      return { success: false, message: "Unexpected error occurred." };
    } catch (error) {
      console.error("Error enrolling in subject:", error);
      alert("Failed to enroll in the subject. Please try again later.");
      return { success: false, message: error.message };
    }
  };

  // const [studentEnrollmentData, setStudentEnrollmentData] = useState([]);
  const localEnrollments = localStorage.getItem("studentEnrollmentData");
  const [studentEnrollmentData, setStudentEnrollmentData] = useState(
    localEnrollments ? JSON.parse(localEnrollments) : []
  );

  const getEnrollmentsByStudentId = async (id, userToken) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/enrollments/student/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // console.log("API Response:", response);

      if (response.data.status === false) {
        return response.data; // Return API error response
      }

      // console.log("API Response:", response.data);
      localStorage.setItem(
        "studentEnrollmentData",
        JSON.stringify(response.data.data.enrollments)
      );
      setStudentEnrollmentData(response.data.data.enrollments);

      return { enrollments: response.data.data.enrollments, status: true }; // Return the fresh data from response
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      toast({
        title: "Alert",
        description: "You are not enrolled in any subject!!! get enrolled.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setStudentEnrollmentData([]); // Clear enrollments on error
      return { status: false };
    }
  };

  const studentId = localStorage.getItem("userId");
  const storedToken = localStorage.getItem("userToken");
  // useEffect(() => {
  //   console.log("Fetching enrollments for student ID:", storedToken, studentId);
  //   if (storedToken && studentId) {
  //     // Assuming you have these values
  //     getEnrollmentsByStudentId(studentId, storedToken);
  //   }

    // console.log("whats the fuck", studentEnrollmentData)
  // }, [storedToken, studentId]); // Add proper dependencies

  const contextValue = useMemo(
    () => ({
      studentEnrollments,
      getEnrollmentsByStudentId,
      studentEnrollmentData,
      loading,
      setLoading,
      setError,
      error,
    }),
    [
      loading,
      error,
      studentEnrollments,
      getEnrollmentsByStudentId,
      studentEnrollmentData,
    ]
  );

  return (
    <EnrollmentContext.Provider value={contextValue}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollmentContext() {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error(
      "useEnrollmentContext must be used within an EnrollmentProvider"
    );
  }
  return context;
}
