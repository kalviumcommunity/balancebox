const express = require("express");
const router = express.Router();

const {Food,Blog, User} = require("../model/Schema");

router.get("/", (req, res) => {
  res.send("Home");
});

router.get("/get-food",async (req, res) => {
  try {
    const data = await Food.find();
    // console.log(data)
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post("/add-food", async (req, res) => {
    const { name, image, protien, fat, carbs,quantity } = req.body;
    try {
      const data = new Food({ name, image, protien, fat,carbs,quantity });
      await data.save();
      res.status(201).json({
        message:"Food data saved"
      });
    } catch (err) {
      res.status(500).json({
        error: "An error occured, please try again later. \n Error:",
        err,
      });
    }
  });


  // blog router 

router.get('/get-blog',async (req,res)=>{
  try{
    const data = await Blog.find();
    res.json(data)
  }
  catch(err){
    res.status(500).json({message:err.message})
  }
})

router.post('/add-blog',async(req,res)=>{
  const {blogTitle,blog,image} = req.body;
  try{
    const data = new Blog({blogTitle,blog,image});
    await data.save();
    res.status(201).json({message:'blog data saved'});
  }catch(err){
    res.status(500).json({
      error: "An error occured, please try again later. \n Error:",
      err,
    });
  }
})


// user-details
router.post('/user-details', async (req, res) => {
  console.log(req.body)
  const { sub, name, email } = req.body;
  const data=await User.findOne({sub:sub});
  if (!data) {
    const loginTime = new Date(); 
    const newUser = new User({
      auth0Id: sub,
      name,
      email,
      lastLogin: loginTime, 
    });
    newUser.save();
    res.status(201).json({message:'User data saved'});
  }
});

router.put('/put-user-details', async (req, res) => {
  console.log(req.body)
  const { sub, List} = req.body;
  const data=await User.findOne({sub:sub});
  if (!data) {
    const arr = data.foodList;
    arr.push(List)
    data.foodList=arr
    console.log(data)
    data.save();
    res.status(201).json({message:'User data saved'});
  }
});


module.exports = router;