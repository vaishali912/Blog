import React, { useEffect, useState } from 'react'
import style from './style.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

export default function Dashboard() {
  const location =useLocation();
  const {id} = useParams();
  const [data,setdata] = useState([]);
  const navigate=useNavigate();
  const fetchdata=  async()=>{
      try{
       const res = await fetch(`http://localhost:5000/dashboard`,{
        method: 'GET',
        credentials: 'include',
       });
       const datjson = await res.json();
       setdata(datjson);
      }
      catch(error){
      console.log(error); 
      }}
  useEffect(()=>{
  fetchdata();
},[]);

 const handledelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/delete/${id}?_method=DELETE`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const res = await response.json();
      console.log(res)
      if (response.ok) {
        alert("Post deleted");
        fetchdata();
      } else {
        console.error("Delete failed", res);
      }
    } catch (error) {
      console.log("delete error", error);
    }
  };
  const handlelogout = async () => {
    try {
      const response = await fetch(`http://localhost:5000/logout`,{
        method: 'GET',
        credentials: 'include',
      });

      const res = await response.json();
      console.log(res)
      if (response.ok) {
        navigate('/');
      } else {
        console.error("Delete failed", res);
      }
    } catch (error) {
      console.log("delete error", error);
    }
  };
  
  return (
    <>
    <button onClick={handlelogout}> Logout</button>
    <div className="admin-title">
  <h2>Posts</h2>
  <Link to={`/addpost/${id}`} className="button">+ Add New</Link>
</div>

<ul className="admin-posts">

  {data.map((post) => (
     <li>
      <Link to={`/Showpost/${post._id}`}>
        { post.title} 
      </Link>
      <div className="admin-post-controls">
        <Link to={`/edit-post/${post._id}`} className="btn">Edit</Link>
        
          <button  onSubmit={()=>(handledelete(post._id))} type="submit" value="Delete" className="btn-delete btn">DELETE</button>
        

      </div>

    </li>
   ))}
</ul>
    </>
  )
}
