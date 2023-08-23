import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import Feed from "../Feed/Feed";
import Rightbar from "../Rightbar/Rightbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="homeContainer">
      <Sidebar />
      <Feed />
      <Rightbar />
    </div>
  );
};

export default Dashboard;
