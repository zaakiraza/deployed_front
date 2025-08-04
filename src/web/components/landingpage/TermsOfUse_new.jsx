import React, { useEffect, useState } from "react";
import axios from "axios";
// import { FaGavel } from "react-icons/fa"; // Import the icon

const TermsOfUse = () => {
  const [terms, setTerms] = useState("");

  const termAndUse = async () => {
    const response = await axios.get(
      "http://ost-backend-env.eba-rqknckev.ap-south-1.elasticbeanstalk.com/api/pages/terms-and-condition"
    );
    setTerms(response.data.data.content);
  };

  useEffect(() => {
    termAndUse();
  }, []);

  return (
    
    <div  style={{margin:"auto", width: "100vw", maxWidth:" 92%"}}>
      <div dangerouslySetInnerHTML={{ __html: terms }} />
    </div>
  );
};

export default TermsOfUse;
