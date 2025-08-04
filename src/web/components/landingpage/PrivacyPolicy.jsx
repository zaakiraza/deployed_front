import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShieldAlt } from "react-icons/fa";  // Import the

const PrivacyPolicy = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState("");

  const fetchPrivacyPolicy = async () => {
    const response = await axios.get(
      "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api/pages/privacy-policy"
    );
    setPrivacyPolicy(response.data.data.content);
  };

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} 
    style={{margin:"auto", width: "100vw", maxWidth:" 92%"}}
    />
  );
};

export default PrivacyPolicy;
