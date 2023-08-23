import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Pages/Signup";
import Login from "./components/Pages/Login";
import ProductPage from "./components/ProductPage/ProductPage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
// import GetImages from "./components/Post/GetImages";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productData" element={<ProductPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* <GetImages />     */}
    </div>
  );
}

export default App;
