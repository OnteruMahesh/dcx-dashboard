import React from 'react'
import {DataGrid}from "@mui/x-data-grid";
import { useState } from 'react';
import AddData from '../AddData';
import DescriptionIcon from '@mui/icons-material/Description';
import '../iconStyle.css'
import { NavLink } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const columns = [
  {field:'_id',headerName:"ID",width:200},
  { field: 'name', headerName: 'Page name' ,width:200,
  renderCell:(params)=>{return <NavLink className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>{params.row.name}</NavLink>}},
  {field: 'categoryname', headerName:'Category' ,width:200,
  valueGetter:(params)=>{return (params.row.CategoryId.name)}},
  { field: 'fullname', headerName: 'Author Name',width:200,
  valueGetter:(params)=>{return (params.row.UserId.fullname)}},
];

function SinglePageModal(props){
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data ? props.data.name : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Category: {props.data ? props.data.CategoryId.name : 'No page loaded'}</h4>
        <hr />
        <p>
          <pre>{props.data.description}</pre>
          <br />
          <hr />
          <code>Author: {props.data.UserId.fullname}</code>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default function PagesComponent({showToast,rows}) {
  const [selectedPages, setRowSelectionModel] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [modalData,setModalData] = useState({name:'demo',CategoryId:{name:"demo category"},description:'demo',UserId:{fullname:"demo"}});
  const handleRowClick = (params)=>{
    setModalData(params.row);
    setShowModal(true);
  }

  return (
    <div  style={{ height:350,width: '100%' }}>
      <div className="alert" role="alert">
        <DescriptionIcon color='primary' className='svg_icon'/><b className='ms-4 display-6 text-primary'>Pages</b>
      </div>
      <hr />
      <AddData data={selectedPages} showToast={showToast} comp="Page"/>
      <DataGrid
        className="table table-striped"
        rows={rows}
        getRowId={(row) => row._id}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
        columns={columns}
        columnVisibilityModel={{
          _id: false,
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 4 },
          },
        }}
        pageSizeOptions={[4, 8]}
        checkboxSelection
        onRowSelectionModelChange={ (newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
      />

      <SinglePageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={modalData}
      />
    </div>
  )
}