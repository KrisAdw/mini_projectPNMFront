import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShowQuiz, ShowUsers, Sidebar } from "../../components";

const index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  return (
    <>
      <Sidebar />
      <ShowQuiz />      
    </>
  );
};

export default index;
