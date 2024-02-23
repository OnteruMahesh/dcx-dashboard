import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

export default function MyProfile(props) {
    const [userName,setUserName] = useState('');
    const [userEmail,setUserEmail] = useState('');
    useEffect(()=>{
        axios.get('http://localhost:8080/user/current/'+localStorage.getItem('userid'),{headers:{
            'x-auth-token':localStorage.getItem('token')
          }})
        .then(response => {
            setUserName(response.data.user.fullname);
            setUserEmail(response.data.user.email);
        })
    },[])

    const clickHandler = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/user/update/'+localStorage.getItem('userid'),{fullname:userName,email:userEmail},{headers:{
            'x-auth-token':localStorage.getItem('token')
          }})
        .then(res=>{
            props.showToast('User',"edit");
        })
        .catch((error)=>{
            console.log(error)
        })
    }
  return (
    <div>
        <h1 className='display-6'>My Details</h1>
        <hr />
        <Form>
            <Form.Group className='mt-3'>
                <Form.Label>User Name</Form.Label>
                <Form.Control value={userName} type='text' onChange={(e)=> setUserName(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3'>
                <Form.Label>User Email</Form.Label>
                <Form.Control value={userEmail} type='email' onChange={(e)=> setUserEmail(e.target.value)}/>
            </Form.Group>
            <div className="text-center mt-3">
              <button type="button" className="btn btn-primary" onClick={clickHandler}>Save</button>
            </div>
        </Form>
    </div>
  )
}
