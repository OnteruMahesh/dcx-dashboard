import * as React from 'react';
import {DataGrid}from "@mui/x-data-grid";
import { useState } from 'react';
import AddData from '../AddData';
import { Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { useEffect } from 'react';
import axios from 'axios';

const columns = [
  {field:'_id',headerName:"ID",width:200},
  { field: 'fullname', headerName: 'Full Name',width:200},
  {field:'email',headerName:"Email ID",width:200},
  {field:'role',headerName:"Role",width:200}
];

export default function Users({showToast,rows}) {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [role,setRole] = useState('Regular');
  useEffect(()=>{
    axios.get("http://localhost:8080/user/current/"+localStorage.getItem('userid'),{headers:{
      'x-auth-token':localStorage.getItem('token')
    }})
    .then(res=>{
      setRole(res.data.user.role);
    })
    .catch(err=>console.log(err))
  },[])

  return (
    <Box  sx={{ height:350, width: '100%' }}>
      <div className="alert" role="alert">
        <PeopleIcon color='primary' className='svg_icon'/><b className='ms-4 display-6 text-primary'>Users</b>
      </div>
      <hr />
      {(role == 'Admin') ? 
      <AddData data={rowSelectionModel} showToast={showToast} comp="User"/>:<></>
      }
      <DataGrid
        className="table table-striped"
        rows={rows}
        getRowId={(row) => row._id}
        columns={columns}
        columnVisibilityModel={{
            _id: false,
          }}
        initialState={{
          pagination: {
            paginationModel: {  pageSize: 4 },
          },
        }}
        pageSizeOptions={[4,8]}
        checkboxSelection
        onRowSelectionModelChange={ (newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
        }}
      />
    </Box>
  );
}