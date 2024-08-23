import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema({
  content: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    minlength: 6
  }],
  replies: [
    {
        user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        },
        content:{
            type:String,
            required:true
        },
        createdAt: {
            type: Date,
            default: Date.now
  },
  }
 ],
 createdAt: {
    type: Date,
    default: Date.now
  },
});

const post = mongoose.model('Post', PostSchema);

export default post;


