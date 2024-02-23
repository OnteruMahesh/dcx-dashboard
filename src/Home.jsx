import React, { useEffect, useState } from 'react'
import Container from "react-bootstrap/esm/Container";
import SideBar from "./SideBar/SideBar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CategoriesTable from "./CategoriesTable/CategoriesTable";
import PagesComponent from "./PagesComponent/PagesComponent";
import Dashboard from "./Dashboard/Dashboard";
import NavBar from "./NavBar/Navbar";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Users from './Users/Users';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';
import './Home.css'
import axios from 'axios';
import MyProfile from './MyProfile/MyProfile';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchResult from './Dashboard/SearchResult';

export default function Home() {
  const navigate = useNavigate();
  const [toastVisible, setShowToast] = useState(false);
  const [categories,setCategories] = useState([]);
  const [pages,setPages] = useState([]);
  const [users,setUsers] = useState([]);
  const [toastComp,setToastComp] = useState('');
  const [action,setAction] = useState('');
  const [searchData,setSearchData] = useState([]);

  const showToast = (comp,action)=>{
    setToastComp(comp);
    if(action == 'del'){
      setAction('deleted')
    }else if(action == 'add'){
      setAction('added')
    }else {
      setAction('modified')
    }
    setShowToast(true)
  }

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate("/");
    }
  },[])

  useEffect(() => {
    axios
      .get("http://localhost:8080/user",{headers:{
        'x-auth-token':localStorage.getItem('token')
      }})
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
    .get("http://localhost:8080/page",{headers:{
      'x-auth-token':localStorage.getItem('token')
    }})
    .then((response) => {
      setPages(response.data.pageData);
    })
    .catch((error) => {
      console.error(error);
    });

    axios
    .get("http://localhost:8080/category",{headers:{
      'x-auth-token':localStorage.getItem('token')
    }})
    .then((response) => {
      setCategories(response.data.categoryData);
    })
    .catch((error) => {
      console.error(error);
    });

  }, [toastVisible]);

  return (
    <>
      <NavBar setSearchData={setSearchData}></NavBar>
      <Container className='mt-5'>
      <Row>
          <Col sm={4}>
            <SideBar />
            <ToastContainer position='bottom-end' className='m-3'> 
              <Toast onClose={() => setShowToast(false)} show={toastVisible} delay={3000} autohide>
                <Toast.Header className={(action === 'deleted' ? 'bg-danger' : 'bg-success') +' bg-gradient- '}>  
                  <InfoOutlinedIcon/><strong className="me-auto text-light ms-1">{toastComp}</strong>
                </Toast.Header>
                <Toast.Body>{toastComp} {action} successfully!!</Toast.Body>
              </Toast>
            </ToastContainer>
          </Col>
          <Col sm={8}>
              <Routes>
                  <Route path="/" element={<Dashboard categories={categories} pages={pages} users={users}/>}/>
                  <Route path="category" element={<CategoriesTable rows={categories} showToast={showToast}/>} />
                  <Route path="pages" element={<PagesComponent rows={pages} showToast={showToast}/>} />
                  <Route path="users" element={<Users rows={users} showToast={showToast}/>} />
                  <Route path='profile' element={<MyProfile showToast={showToast}/>}/>
                  <Route path='search' element={<SearchResult data={searchData} />}/>
              </Routes>
          </Col>
      </Row>
      </Container>
    </>
  )
}
