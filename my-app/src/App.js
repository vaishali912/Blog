import logo from './logo.svg';
import './App.css';

import style from './views/admins/style.css';
import Header from './views/particals/Header';
import Index from './views/admins/Index';
import Index1 from './views/Index1';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './views/admins/Dashboard';
import Editpost from './views/admins/Editpost';
import Addpost from './views/admins/Add-post';
import Showpost from './views/particals/Showpost';

function App() {
  return (
  <> <Router>
 <Header></Header>

 <Routes>
  <Route path="/" element={<Index />} />
  <Route path = "/Register" element={<Index1></Index1>}></Route>
  <Route path="/dashboard" element={<Dashboard />}></Route>
  <Route path="/edit-post/:id" element={<Editpost ></Editpost>}></Route>
  <Route path ="/addpost/:id" element={<Addpost></Addpost>}></Route>
  <Route path="/Showpost/:id" element={<Showpost></Showpost>} ></Route>
 </Routes>
 </Router>
  </>
  );
}

export default App;
