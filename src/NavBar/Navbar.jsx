import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import './style.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function NavBar(props){
  const navigate = useNavigate();
  const [search,setSearch] = useState('');
  const handleLogout = (e)=>{
    localStorage.clear('token');
    localStorage.clear('userid');
    navigate('../login'); 
  }

  const handleSearch = (e)=>{
    e.preventDefault();
    axios.get("http://localhost:8080/user/search/"+search,{headers:{
      'x-auth-token':localStorage.getItem('token')
    }})
    .then(res=>{
      props.setSearchData(res.data);
      navigate('search')
    })
    .catch(err=>{
      console.log(err)
    })
  }
    return (
      <>
        <Navbar expand='lg' sticky='top' className="bg-primary bg-gradient" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">DCX CMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >
              <NavLink className='nav-link' to=''>Dashboard</NavLink>
              <NavLink className='nav-link' to='pages'>Pages</NavLink>
              <NavLink className="nav-link" to='category'>Categories</NavLink>
              <NavLink className="nav-link" to='users'>Users</NavLink>
              <Form className="d-flex ms-2">
                <Form.Control className='search-box' size="sm" variant='primary' type="text" onChange={(e)=>setSearch(e.target.value)} placeholder="Search..." />
                <Button className='ms-1' variant="light" onClick={handleSearch}>Search</Button>
              </Form> 
            </Nav>
            <Nav>
            <NavDropdown title="My Profile" id="basic-nav-dropdown">
                <Link className="nav-link" to='profile'>Users</Link>
            </NavDropdown>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
      );
}

export default NavBar;