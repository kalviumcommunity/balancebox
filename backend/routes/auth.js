const express = require("express");
const router = express.Router();

const Food = require("../model/foodSchema");

router.get("/", (req, res) => {
  res.send("Home");
});

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

module.exports = router;