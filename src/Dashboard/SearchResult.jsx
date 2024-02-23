import React, { useEffect, useState } from 'react'

export default function SearchResult(props) {
    const [pages,setPages] = useState([]);
    const [users,setUsers] = useState([]);
    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        setPages(props.data.pages);
        setUsers(props.data.users);
        setCategories(props.data.categories);
    },[props])
  return (
    <div>
        <p className='display-6'>Search Results</p>
      <h6>Pages</h6>
      <table className='table table-striped'>
        <thead>
          <tr key='pages' className="table-dark">
            <td >Page Name</td>
            <td >Category Name</td>
            <td >Author</td>
          </tr>
        </thead>
        <tbody>
          {pages.map((page)=>(
            <tr key={page._id}>
              <td>{page.name}</td>
              <td>{page.CategoryId.name}</td>
              <td>{page.UserId.fullname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr/>

      <h6>Latest Categories</h6>
      <table className='table table-striped'>
        <thead>
          <tr key='categories' className="table-dark">
            <td>Category Name</td>
            <td>Author</td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category)=>(
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.authorId.fullname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr/>
      
      <h6>Users</h6>
      <table className='table table-striped'>
        <thead>
          <tr key='users' className="table-dark">
            <td>Fullname</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user)=>(
            <tr key={user._id}>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
