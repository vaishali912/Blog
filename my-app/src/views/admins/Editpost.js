import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Editpost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setdata] = useState({});
  const [pdfFile, setPdfFile] = useState(null);
  useEffect(() => {
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
  }, [id]);
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
  const handlecchng = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pdf", pdfFile); 
       formData.append("title", data.title);
       formData.append("body", data.body);  
    try {
      const fetchdata = await fetch(`http://localhost:5000/edit-post/${id}?_method=PUT`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const res = await fetchdata.json();

      if (fetchdata.ok) {
        alert("updated");
        navigate(`/dashboard`);
      } else {
        console.error("Update failed", res);
      }
    } catch (error) {
      console.log("editerror", error);
    }
  };

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handledelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/delete-post/${id}?_method=DELETE`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const res = await response.json();
console.log(res);
      if (response.ok) {
        alert("Post deleted");
        navigate(`/dashboard/${id}`);
      } else {
        console.error("Delete failed", res);
      }
    } catch (error) {
      console.log("delete error", error);
    }
  };

  return (
    <>
      <button onClick={() => navigate(`/dashboard/${id}`)}>&larr; Back</button>

      <div className="admin-title">
        <h2>View / Edit Post</h2>
      </div>

      <button className="btn-delete btn" onClick={handledelete}>Delete</button>

      <form onSubmit={handlecchng}>
        <label htmlFor="title"><b>Title</b></label>
        <input
          type="text"
          placeholder="Post Title"
          name="title"
          value={data.title || ''}
          onChange={handleChange}
        />

        <label htmlFor="body"><b>Content</b></label>
        <textarea
          name="body"
          cols="50"
          rows="10"
          value={data.body || ''}
          onChange={handleChange}
        />
         <form >
      <input type="file" accept=".pdf" onChange={(e)=>{handleFileChange(e)}} />
      {<p>Selected file: {data.pdfname}</p>}
      </form>
        <input type="submit" value="Update" className="btn" />
      </form>
    </>
  );
}
