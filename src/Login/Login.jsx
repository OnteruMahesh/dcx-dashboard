import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/home');
    }
  })

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:8080/user/login',{email,password})
    .then(result => {
      localStorage.setItem('token',result.data.token);
      localStorage.setItem('userid',result.data.user.id);
      navigate("/home");
    })
    .catch((e)=>{
      console.log(e.message);
    })
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs lg='4' className='border-bottom rounded shadow-lg p-3'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e) =>{setEmail(e.target.value)}}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' onChange={(e) =>{setPassword(e.target.value)}}/>
            </Form.Group>
            <div className="text-center">
              <Button className='btn btn-primary' type="submit">
                Submit
              </Button>
              <p className='mt-2'>Don't have an account? <Link to="/">Register here</Link></p>
            </div>
          </Form>
        </Col>
      </Row>
      
    </Container>
    
  )
}
