import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import Post from './models/Post.js'
dotenv.config();

const port = process.env.PORT || 5000; 
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.urlencoded({ extended: false }));  // this is used to parse the form data
//beacuse form ka data json me nii aata h to usse json me convert karne ke liye ye line likhte h /

app.use(express.json());

const mongoURI = 'mongodb+srv://sagarrajyadav2002:threadapp@cluster0.7yqjxom.mongodb.net/thread?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error("Error connecting to database", err.message);
    });

    
    app.post('/signup',async (req,res)=>{
        const {name,email,password}=req.body;  //desctructuring name,email,password from body
    
        try{
             // Check if all fields are provided
            if(!name || !email || !password){
                return res.status(400).json({error:"All fields are required"});
            }
    
            // Validate email format
            if(!email.includes("@")){
                return res.status(400).json({error:"Invalid email"});
            }
    
            // Validate password length
            if(password.length<6){
                return res.status(400).json({error:"password length must me greater than 6"});
            }
            
             // Check if email already exists
            const finduser=await User.findOne({email});
    
            if(finduser){
                return res.status(400).json({error:"Email already exists"});
            }
    
            const salt=await bcrypt.genSalt(10);
            const hashedpassword=await bcrypt.hash(password,salt);
            const newuser=await User({name,email,password:hashedpassword});
            await newuser.save();
            console.log(newuser);
            res.status(201).json({success:"signup sccessfull"});
    
        }
        catch(error){
            console.log(error);
            res.status(500).json("Internal server Error");
        }
    
    
    })
    
    


    app.post("/login", async (req, res) => {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res.status(400).json({ error: "All fields are required" });
            }
    
            if (!email.includes("@")) {
                return res.status(400).json({ error: "Invalid email" });
            }
    
            const findUser = await User.findOne({ email });
    
            if (!findUser) {
                return res.status(400).json({ error: "Invalid email" });
            }
    
            const match = await bcrypt.compare(password, findUser.password);
            if (!match) {
                return res.status(400).json({ error: "Invalid password" });
            }
    
            const token = jwt.sign({ userId: findUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    
    app.get("/user/:userId", async (req, res) => {
        try {
            const loggedInUserId = req.params.userId;
    
            if (!loggedInUserId) {
                return res.status(400).json({ error: "User ID is required" });
            }
    
            const users = await User.find({ _id: { $ne: loggedInUserId } });
    
            if (!users.length) {
                return res.status(404).json({ error: "No users found" });
            }
    
            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    
//end point to follow a particular user 
// mere following me add hoga and jisko follow karega uske followers me add hoga
app.post('/follow',async(req,res)=>{
    const {currentUserId,selectedUserId}=req.body;
    try{
        await User.findByIdAndUpdate(selectedUserId,{
            $push:{followers:currentUserId}
        });
        res.status(200).json({ message: "User followed successfully" });
    }catch (error) {
        console.error({message:"Error follow a particular user:"});
        res.status(500).json({ error: "Internal server error" });
    }

});

//end point to unfollow a particular user
// mere following se remove hoga and uske followers se remove ho jayega
app.post('/unfollow',async(req,res)=>{
    const {currentUserId,selectedUserId}=req.body;
    try{
        await User.findByIdAndUpdate(selectedUserId,{
            $pull:{followers:currentUserId}
        });
        res.status(200).json({message:"Error unfollow a  user:"});
    }catch (error) {
        console.error("Error unfollow a particular user:", error);
        res.status(500).json({ error: "Internal server error" });
    }

});


//endpoint to create new post in the backend
app.post('/createpost',async(req,res)=>{
    const {content,userId}=req.body;
    try{

        const newPostData={
           user:userId 
        }

       if(content){
        newPostData.content=content;
       }

       const newpost=new Post(newPostData);
       await newpost.save();
       res.status(200).json({message:"post created sucessfully"});
    }catch (error) {
        console.error("Error createpost", error);
        res.status(500).json({ error: "Internal server error" });
    }

});

//endpoint for like a particular post
app.put('/post/:postId/:userId/like', async (req, res) => {
    try {
        const { postId, userId } = req.params;
        const post = await Post.findById(postId).populate("user", "name");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: userId } },
            { new: true }
        ).populate("user", "name"); // Ensure user information is included in the response

        res.status(200).json(updatedPost);

    } catch (error) {
        console.error("Error liking post", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




//endpoint for unlike a particular post
app.put('/post/:postId/:userId/unlike', async (req, res) => {
    try {
        const { postId, userId } = req.params;
        const post = await Post.findById(postId).populate("user", "name");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: userId } },
            { new: true }
        ).populate("user", "name"); // Ensure user information is included in the response

        res.status(200).json(updatedPost);

    } catch (error) {
        console.error("Error unliking post", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



//endpoint to get all the  post
app.get('/getpost',async(req,res)=>{
    try{
    const posts=await Post.find().populate("user","name").sort({createdAt:-1})

    res.status(200).json(posts);


    }catch (error) {
        console.error("Error geting post", error);
        res.status(500).json({ error: "Internal server error" });
    }

});


app.get("/getuser/:userId",async (req,res)=>{
    try{
      const  userId=req.params.userId;
      console.log("getuser",userId);

        const user=await User.findById(userId).select("-password");  //selecting all fields except password
       if(!user){
        res.status(404).json({message:" user not found"});
       }
        res.status(200).json(user);
    }
catch(error){
    console.log(error);
    res.status(500).send("Internal server error");
}

})

//delete post

app.delete("/post/:postId/:userId/delete",async(req,res)=>{
    try{
        let post=await Post.findById(req.params.postId);
        if(!post){
            return res.status(404).send("post not found");
        }

        if(post.user.toString()!==req.params.userId){
            return res.status(401).send("this user Not Allowed to delete this note");
        }

        post=await Post.findByIdAndDelete(req.params.postId);
        res.json({"success": "post has been deleted",post:post});
    }
    catch(error){
        console.log(error);
    res.status(500).send("Internal server error");
    }
})


//get all following of user
app.get('/user/:userId/following', async (req, res) => {
    const { userId } = req.params;
  
    const getFollowingUsers = async (userId) => {
        try {
          // Find the user by ID and populate the 'following' field
          const user = await User.findById(userId).populate('following', 'name email profilepicture');
          
          if (!user) {
            console.error('User not found');
            return null;
          }
      
          // Return the populated following users
          return user.following;
        } catch (error) {
          console.error('Error fetching following users:', error);
          return null;
        }
      };
      
    try {
      const followingUsers = await getFollowingUsers(userId);
  
      if (!followingUsers) {
        return res.status(404).json({ message: 'User not found or no following users' });
      }
  
      res.status(200).json(followingUsers);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

//server start
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on port ${port}`);
    });