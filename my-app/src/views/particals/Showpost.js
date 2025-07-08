import React, { useState } from 'react'
import { useEffect } from 'react';
 import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function Showpost(){
    const [data,setdata] =useState({title:'',body:''});
    const {id} =useParams();
    const navigate= useNavigate();
     useEffect(()=>{
          const handleedit = async () => {
      try {
        const fetchdata = await fetch(`http://localhost:5000/edit-post/${id}?_method=GET`, {
          method: 'GET',
          credentials: 'include',
        });
        const res = await fetchdata.json();
        setdata(res);
      } catch (error) {
        console.log("editerror", error);
      }
    };
    handleedit();
  }, []);
    
  return (
    <>
      <button onClick={() => navigate(`/dashboard/${id}`)}>&larr; Back</button>

      <div class="single-post">
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <p>{data.pdfname}</p>
      </div>
    </>
  )
}
