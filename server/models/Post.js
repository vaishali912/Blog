const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    pdfname:{
        type:String,
        
    },
    pdfurl:{
        type:String,
        
    },
    publid_id:{
        type:String,
        
    },
    createdAt:{
       type:Date,
       default:Date.now
    },
    updatedAt:{
       type:Date,
       default:Date.now
    }
})
module.exports=mongoose.model('Post',PostSchema);