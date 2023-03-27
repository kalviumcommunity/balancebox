const express = require("express");
const router = express.Router();

const {Food,Blog} = require("../model/foodSchema");

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

module.exports = router;