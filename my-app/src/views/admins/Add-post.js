import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddPost() {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate=useNavigate();
   const [pdfFile, setPdfFile] = useState(null);;
      const handleFileChange = (e) => {
        const file = e.target.files[0];
       /* if (file.size > 5 * 1024 * 1024) {
    alert("File size exceeds 5MB. Please select a smaller file.");
    return;
  }*/
        if (file && file.type === "application/pdf") {
          setPdfFile(file);
        } else {
          alert("Please select a valid PDF file.");
        }
      }
  const handlecchng = async (e) =>{
    
    e.preventDefault();
    try {
      const formData = new FormData();
      if(pdfFile){
       formData.append("pdf", pdfFile); 
      }
       formData.append("title", title);
       formData.append("body", body);  
      const fetchdata = await fetch(`http://localhost:5000/add-post`,{
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const res = await fetchdata.json();
      if (fetchdata.ok) {
        alert("Post added");
        navigate(`/dashboard`);
      }
    } catch (error){
      console.log("error adding post", error);
    }
  };
 /*const handleupload = async(e)=>{
      e.preventDefault();
      console.log("calaling upload")
       
      try{
      const uploadpdf = await fetch(`http://localhost:5000/post/pdf/${id}`,{
          method:"POST",
          body:formData
          
      })
      if(uploadpdf.ok){
         console.log("uploaded");
      }
      else{
        console.log("no pdf uploaded");
      }
    }
    catch(error){
      console.log("postpdferror",error);
    }
  }*/
  return (
    <> <button onClick={() => navigate(`/dashboard/${id}`)}>&larr; Back</button>
    <form onSubmit={handlecchng}>
      <label htmlFor="title"><b>Title</b></label>
      <input
        type="text"
        placeholder="Post Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="body"><b>Content</b></label>
      <textarea
        name="body"
        placeholder="Post Content"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <h3>Select PDF:</h3>
    <form >
      <input type="file" accept=".pdf" onChange={(e)=>{handleFileChange(e)}} />
      {pdfFile && <p>Selected file: {pdfFile.name}</p>}
      </form>
      <input type="submit" value="Add Post" />
    </form>
    </>
  );
}
