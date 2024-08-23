import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profilepicture: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  following:[{ 
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],

  followers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  verified:{
    type:Boolean,
    default:false
  },
  verificationToken:String,

});

const user = mongoose.model('User', userSchema);

export default user;


