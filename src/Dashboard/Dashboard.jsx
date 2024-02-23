import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../iconStyle.css'

export default function Dashboard({categories,pages,users}) {
  const navigate = useNavigate();

  return (
    <div>
        <p className='display-6'>DASHBOARD</p>
      <h6>Latest Pages</h6>
      <table className='table table-striped'>
        <thead>
          <tr key='pages' className="table-dark">
            <td >Page Name</td>
            <td >Category Name</td>
            <td >Author</td>
          </tr>
        </thead>
        <tbody>
          {pages.slice(0,5).map((page)=>(
            <tr key={page._id}>
              <td>{page.name}</td>
              <td>{page.CategoryId.name}</td>
              <td>{page.UserId.fullname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='btn btn-primary' onClick={()=>navigate('pages')}>All Pages</button>
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
          {categories.slice(0,5).map((category)=>(
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.authorId.fullname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='btn btn-primary' onClick={()=>navigate('category')}>All Categories</button>
      <hr/>
      
      <h6>Latest Users</h6>
      <table className='table table-striped'>
        <thead>
          <tr key='users' className="table-dark">
            <td>Fullname</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          {users.slice(0,5).map((user)=>(
            <tr key={user._id}>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='btn btn-primary mb-3' onClick={()=>navigate('users')}>All Users</button>
    </div>
  )
}
