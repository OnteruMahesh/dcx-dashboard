import React from "react";
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from "./Home";
import CategoriesTable from "./CategoriesTable/CategoriesTable";
import PagesComponent from "./PagesComponent/PagesComponent";
import Users from "./Users/Users";
import MyProfile from "./MyProfile/MyProfile";


export default function MyApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="login" element={<Login/>}/>
        <Route path="home/*" element={<Home/>}>
          <Route path="category" element={<CategoriesTable />} />
          <Route path="pages" element={<PagesComponent />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<MyProfile/>}/>
        </Route>
      </Routes>
    </>
  );
}