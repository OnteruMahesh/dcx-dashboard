import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';


export default function Register() {
  const [fullname,setFullname] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/home');
    }
  })


  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:8080/user/register',{fullname,email,password})
    .then(()=>{
      navigate('/login')
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs lg='4' className='border-bottom rounded shadow-lg p-3'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId="formBasicName">
              <Form.Label>Fullname</Form.Label>
              <Form.Control required type='text' placeholder='Enter your name' name='fullname' onChange={(e) => {setFullname(e.target.value)}} />
            </Form.Group>
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
            <p className='mt-2'>Already have an account? <Link to="/login">login here</Link></p>
            </div>
          </Form>
        </Col>
      </Row>
      
    </Container>
    
  )
}
