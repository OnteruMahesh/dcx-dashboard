import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function AddButtonModal(props) {
  const [categories,setCategories] = useState([]);
  const [pageName, setPageName] = useState('');
  const [pageCat, setPageCat] = useState('');
  const [catName,setCatName] = useState('');
  const [fullname,setFullname] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [desc,setDesc] = useState('');

  useEffect(()=>{
    axios.get('http://localhost:8080/category',{headers:{
      'x-auth-token':localStorage.getItem('token')
    }})
    .then(response=>setCategories(response.data.categoryData))
    .catch(err => console.log(err))
  },[])

  const addHandler = (e)=>{
    e.preventDefault();
    if(props.comp == "Page"){
      axios.post('http://localhost:8080/page',{name:pageName,CategoryId:pageCat,UserId:localStorage.getItem('userid'),description:desc},{headers:{
        'x-auth-token':localStorage.getItem('token')
      }})
      .then(response=> {
        props.onHide();
        props.showToast(props.comp,"add");
      })
      .catch(err => {
        console.log(err)
      });
    } else if (props.comp == "Category") {
      axios.post('http://localhost:8080/category',{name:catName,authorId:localStorage.getItem('userid')},{headers:{
        'x-auth-token':localStorage.getItem('token')
      }})
      .then(response=>{
        props.onHide();
        props.showToast(props.comp,"add");
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      axios.post('http://localhost:8080/user/register',{fullname,email,password})
      .then(()=>{
        console.log("Registered");
        props.onHide();
        props.showToast('User','add');
      })
      .catch((e)=>{
        console.log(e);
      })
    }
    
  }
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add {props.comp}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.comp == "Page" ? <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Page Name</Form.Label>
              <Form.Control type="text" name='pname' placeholder="My demo page" onChange={(e)=> setPageName(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Category</Form.Label>
              <Form.Select defaultValue={'default'} onChange={(e)=>setPageCat(e.target.value)}>
                <option disabled value="default">Select a category</option>
                {categories.map(category =>(
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder='Enter description of page' onChange={(e)=>setDesc(e.target.value)} rows={3} />
            </Form.Group>
            <div className="text-center mt-3">
              <button type="button" className="btn btn-primary" onClick={addHandler}>Submit</button>
            </div>
          </Form> : props.comp == 'Category' ? <Form>
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" name='cname' placeholder="My demo category" onChange={(e)=> setCatName(e.target.value)}/>
              <div className="text-center mt-3">
                <button type="button" className="btn btn-primary" onClick={addHandler}>Submit</button>
              </div>
          </Form> : <Form>
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
              <div className="text-center mt-3">
                <button type="button" className="btn btn-primary" onClick={addHandler}>Submit</button>
              </div>
          </Form>}
        </Modal.Body>
      </Modal>
    );
  }

function DeleteButtonModal(props){
  let url = ""; 
  if(props.comp == "Category"){
    url = "http://localhost:8080/category/delete";
  }else if(props.comp == "Page"){
    url ="http://localhost:8080/page/delete"
  }else if(props.comp == 'User'){
    url = "http://localhost:8080/user/delete"
  }
  const delHandler = ()=>{
    axios.post(url,props.toDel,{headers:{
      'x-auth-token':localStorage.getItem('token')
    }})
    .then(() =>{
      props.onHide();
      props.showToast(props.comp,"del");
    })
    .catch(e =>{
      console.log(e)
    })
  }
  return (
  <>
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete {props.comp}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        {(props.comp == "Page") ? <>
        <Form.Label>Are you sure you want to delete the selected pages ? </Form.Label>
        <div className="text-center mt-3">
          <button type="button" className="btn btn-danger" onClick={delHandler}>Delete</button>
        </div>
        </>: (props.comp == "Category") ? <>
        <Form.Label>Are you sure you want to delete the selected categories ? </Form.Label><br/>
        <Form.Label>All related pages will be deleted</Form.Label>
        <div className="text-center mt-3">
          <button type="button" className="btn btn-danger" onClick={delHandler}>Delete</button>
        </div>
        </> : <>
        <Form.Label>Users cannot be deleted. </Form.Label>
        </>
        }
        
        <br />
        
      </Modal.Body>
    </Modal>
  </>
  )

}

function EditButtonModal(props) {
  const [categories,setCategories] = useState([]);
  const [pageName, setPageName] = useState('');
  const [pageCat, setPageCat] = useState('');
  const [canEdit,setCanEdit] = useState(true);
  const [catName,setCatName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [desc,setDesc] = useState('');

  useEffect(()=>{
    if(props.toEdit.length != 1){
      setCanEdit(false);
    }else{
      setCanEdit(true);
      if(props.comp == 'Page'){
        axios.get('http://localhost:8080/category',{headers:{
          'x-auth-token':localStorage.getItem('token')
        }})
        .then(response=>setCategories(response.data.categoryData))
        .catch(err => console.log(err))
  
        axios.get("http://localhost:8080/page/"+props.toEdit[0],{headers:{
          'x-auth-token':localStorage.getItem('token')
        }})
        .then(response => {
          setPageName(response.data.pageData.name);
          setPageCat(response.data.pageData.CategoryId);
          setDesc(response.data.pageData.description);
        })
      }else if(props.comp == 'Category'){
        axios.get('http://localhost:8080/category/'+props.toEdit[0],{headers:{
          'x-auth-token':localStorage.getItem('token')
        }})
        .then(response=>setCatName(response.data.data.name))
        .catch(err => console.log(err))
      }else {
        axios.get('http://localhost:8080/user/current/'+props.toEdit[0],{headers:{
            'x-auth-token':localStorage.getItem('token')
          }})
        .then(response => {
            setUserName(response.data.user.fullname);
            setUserEmail(response.data.user.email);
        })
      }
      
    }
    
  },[props.show])

  const editHandler = (e)=>{
    e.preventDefault();
    if(props.comp == 'Page'){
      axios.post("http://localhost:8080/page/update/"+props.toEdit[0],{name:pageName,CategoryId:pageCat,description:desc},{headers:{
        'x-auth-token':localStorage.getItem('token')
      }})
      .then(response=> {
        props.onHide();
        props.showToast(props.comp,"edit");
      })
      .catch(err => {
        console.log(err)
      });
    }else if(props.comp == 'Category'){
      axios.post("http://localhost:8080/category/update/"+props.toEdit[0],{name:catName},{headers:{
        'x-auth-token':localStorage.getItem('token')
      }})
      .then(res=>{
        props.onHide();
        props.showToast(props.comp,'edit');
      })
    } else {
      axios.post('http://localhost:8080/user/update/'+props.toEdit[0],{fullname:userName,email:userEmail},{headers:{
            'x-auth-token':localStorage.getItem('token')
          }})
        .then(res=>{
          props.onHide();
          props.showToast('User',"edit");
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit {props.comp}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {canEdit ? ((props.comp == 'Page') ?
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Page Name</Form.Label>
            <Form.Control type="text" name='pname' value={pageName} placeholder="My demo page" onChange={(e)=> setPageName(e.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Select Category</Form.Label>
            <Form.Select defaultValue={'default'} onChange={(e)=>setPageCat(e.target.value)}>
              <option disabled value="default">Select a category</option>
              {categories.map(category =>(
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder='Enter description of page' value={desc} onChange={(e)=>setDesc(e.target.value)} rows={3} />
          </Form.Group>
          <div className="text-center mt-3">
            <button type="button" className="btn btn-primary" onClick={editHandler}>Submit</button>
          </div>
        </Form>
        :((props.comp == 'Category') ? <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" name='cname' value={catName} placeholder="My demo page" onChange={(e)=> setCatName(e.target.value)}/>
          </Form.Group>
          <div className="text-center mt-3">
            <button type="button" className="btn btn-primary" onClick={editHandler}>Submit</button>
          </div>
        </Form>:
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
              <button type="button" className="btn btn-primary" onClick={editHandler}>Save</button>
            </div>
        </Form>)):
        <Form.Label>Select only one record at a time.</Form.Label>}
      </Modal.Body>
    </Modal>
  )
}

export default function AddData(props) {
    const [showForm, setShowForm] = useState(false);
    const [showEditForm,setShowEdit] = useState(false);
    const [showDelForm,setShowDelete] = useState(false);
    
  return (
    <div>
      <ButtonGroup aria-label="Basic example" className='mb-2'>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <AddIcon fontSize='small'/>Add</Button>
        <Button variant="primary" onClick={() => setShowEdit(true)}>
          <EditIcon fontSize='small'/>Edit
        </Button>
        <Button variant="primary" onClick={() => setShowDelete(true)}>
          <DeleteIcon fontSize='small'/> Delete
        </Button>
      </ButtonGroup>
      <AddButtonModal
        show={showForm}
        onHide={()=>setShowForm(false)}
        showToast={props.showToast}
        comp={props.comp}
      />
      <DeleteButtonModal
        show={showDelForm}
        onHide={()=>setShowDelete(false)}
        toDel={props.data}
        comp={props.comp}
        showToast={props.showToast}
      />
      
      <EditButtonModal 
        show={showEditForm}
        onHide = {()=> setShowEdit(false)}
        toEdit={props.data}
        comp={props.comp}
        showToast={props.showToast}
      />

    </div>
  )
}