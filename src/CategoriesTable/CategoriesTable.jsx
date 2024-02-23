import * as React from 'react';
import {DataGrid}from "@mui/x-data-grid";
import { useState } from 'react';
import AddData from '../AddData';
import { Box } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

const columns = [
    {field:'_id',headerName:"ID",width:200},
    { field: 'name', headerName: 'Category name' ,width:200},
    { field: 'fullname', headerName: 'Author Name',width:200,
    valueGetter:(params)=>{return (params.row.authorId.fullname)}}
];

export default function CategoriesTable({showToast,rows}) {
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

  return (
    <Box  sx={{ height:350, width: '100%' }}>
      <div className="alert" role="alert">
        <FolderIcon color='primary' className='svg_icon'/><b className='ms-4 display-6 text-primary'>Categories</b>
      </div>
      <hr />
      <AddData data={rowSelectionModel} showToast={showToast} comp="Category"/>
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











// import Table from 'react-bootstrap/Table';
// import ButtonGroup from 'react-bootstrap/ButtonGroup'
// import Button from 'react-bootstrap/Button'
// import { MdEdit } from "react-icons/md";
// import { FaPlus } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import Pagination from 'react-bootstrap/Pagination';

// import React , { useState, useEffect } from 'react'

// import axios from 'axios';

// export default function CategoriesTable() {

//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         axios
//           .get("http://localhost:8080/category")
//           .then((response) => {
//             setCategories(response.data.categoryData);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//     }, []);



//     return (
//         <>
//             <ButtonGroup aria-label="Basic example" size='sm' className="justify-content-end">
//                 <Button variant="outline-secondary"><FaPlus />New</Button>
//                 <Button variant="outline-secondary"><MdEdit />Edit</Button>
//                 <Button variant="outline-secondary"><MdDelete />Delete</Button>
//             </ButtonGroup>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr key={""}>
//                         <th>Select</th>
//                         <th>Name</th>
//                         <th>Author</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {categories.map(category=>{
//                         return (
//                         <tr key={category._id}>
//                             <td>
//                                 <input type='checkbox' value={category._id} onClick={(e)=>{console.log(e.target.value)}}></input>
//                             </td>
//                             <td>{category.name}</td>
//                             <td>{category.authorId.fullname}</td>
//                         </tr>);
//                     })}
//                 </tbody>
//             </Table>
//             <Pagination>
//                 <Pagination.First />
//                 <Pagination.Prev />
//                 <Pagination.Item>{1}</Pagination.Item>
//                 <Pagination.Ellipsis />

//                 <Pagination.Item>{10}</Pagination.Item>
//                 <Pagination.Item>{11}</Pagination.Item>
//                 <Pagination.Item active>{12}</Pagination.Item>
//                 <Pagination.Item>{13}</Pagination.Item>
//                 <Pagination.Item disabled>{14}</Pagination.Item>

//                 <Pagination.Ellipsis />
//                 <Pagination.Item>{20}</Pagination.Item>
//                 <Pagination.Next />
//                 <Pagination.Last />
//             </Pagination>
//         </>
//     )
// }
