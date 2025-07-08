const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { upload } = require('./Multer'); 
const path = require('path');
const  {uploadOnCloudinary,deleteOnCloudinary}  = require ('./Cloudniary');
const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;


/**
 * 
 * Check Login
*/
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token from cookie:", token); 

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log("Decoded token:", decoded); 
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Token verification failed:", error.message); 
    res.status(401).json({ message: 'Unauthorized' });
  }
};





/**
 * POST /
 * Admin - Check Login
*/
router.post('/admin', async (req, res) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).send('Invalid credentials');
  console.log(user)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ userId: user._id }, jwtSecret);

    
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax'
    });

    res.json({id:user._id})
    console.log(user)
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});




/**
 * GET /
 * Admin Dashboard
*/
router.get('/dashboard',authMiddleware, async (req, res) => {
 // console.log("dashboard",req.params.id);
  try {
    const posts = await Post.find({userid:req.userId});
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
});









/**
 * GET /
 * Admin - Create New Post
*/
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
  try {

    const locals = {
      title: "Edit Post",
      description: "Free NodeJs User Management System",
    };

    const data = await Post.findOne({ _id: req.params.id });

    res.json(data)

  } catch (error) {
    console.log(error);
  }

});


/**
 * PUT /pdf
 * Admin - Create New Post
*/
router.put('/edit-post/:id', upload.single('pdf'), async (req, res) => {
  console.log("file:",req.file,"body",req.body);
  try {
     const deltepdfdata = await Post.findById(req.params.id);
     console.log("deltepdf",deltepdfdata)
     if(req.file){
     
       const resload = await uploadOnCloudinary(path.resolve(req.file?.path));
       console.log("resload",resload);
       if(!resload){
        console.log("there is no post on cloudinary");
       }
       else{
        console.log("yes cloudnary upload",resload);
       }
           const deltepdf = await deleteOnCloudinary(deltepdfdata.publid_id);
           if(!deltepdf){
            res.json("not deelted");
            console.log("not deleted",deltepdf);
           }
          
        deltepdfdata.publid_id=resload.public_id;
         deltepdfdata.pdfurl=resload.url;
         deltepdfdata.pdfname=resload.original_filename;
      }
      deltepdfdata.title=req.body.title;
      deltepdfdata.body =req.body.body;
         const saveedit = await deltepdfdata.save(); 
         console.log(saveedit);
         if(saveedit){
          console.log("yes save",saveedit);
          res.json(saveedit)
         } 
         else{
          console.log("can save",saveedit);
         }
    }

    catch (error) {
    console.log(error);
  }

});




/**
 * POST /
 * Admin - Register
*/
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password:hashedPassword });
      console.log(user);
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '7d' });

    
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, 
      sameSite: 'Lax'
    });
      res.json(res.status(201).json({
  message: "User registered successfully"
}));
    } catch (error) {
      if(error.code === 11000) {
        res.status(409).json({ message: 'User already in use'});
      }
      res.status(500).json({ message: 'Internal server error'})
      console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
});


router.post('/add-post',authMiddleware,upload.single('pdf'),async(req,res)=>{
//  console.log(req.file);
 var resload ;
if(req.file){

    try{
       const localpath = path.resolve(req.file?.path);
       console.log("filepath is",localpath);
       if(!localpath){
        console.log("there is no path of file");
       }
        resload = await uploadOnCloudinary(localpath);
       console.log("resload",resload);
       if(!resload){
        console.log("there is no post on cloudinary");
       }
     }
     catch(error){
      console.log("pdf upload error",error);
     }
    }
  try{
     const postData = {
  userid: req.userId,
  title: req.body.title,
  body: req.body.body,
};
console.log("Uploading to MongoDB:", {
  userid: req.userId,
  title:req.body.title,
  body:req.body.body})


if (resload && resload.url) {
  postData.pdfurl = resload.url;
  postData.pdfname = resload.original_filename;
  postData.publid_id = resload.public_id;
}


       if(!postData){
        console.log("there i prblm in mongo upload",postData)
       }
       else{
        console.log("nprvlm in mongoupload",postData)
       }
       const succupload = await Post.create(postData); 
       res.json( succupload );
  
}catch(error){
    res.json(error);
}
})




//delete pdf 
router.delete('/delete/:id',async (req,res)=>{
       try{
           const deltepdfdata = await Post.findById(req.params.id);
           console.log("deltepdf",deltepdfdata)
           if(deltepdfdata.publid_id){
           const deltepdf = await deleteOnCloudinary(deltepdfdata.publid_id);
           if(!deltepdf){
            res.json("not deelted");
           }
          }
           const onmongodeelte = await Post.deleteOne({ _id: req.params.id });
           if(!onmongodeelte){
            console.log("no mongodele");
            res.json("no deletion")
           }
           else{
            res.json("succefful")
           }
       }
       catch(error){
        console.log("deelte error",error);
        res.json(error);
       }
})

/**
 * GET /
 * Admin Logout
*/
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  //res.json({ message: 'Logout successful.'});
  res.json("succcess");
});


module.exports = router;