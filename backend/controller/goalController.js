const asyncHandler = require('express-async-handler')
const Goal =require('../model/goalModel')
// @desc Get goals
//@route Get /api/goals
//@acess Private
const getGoals = asyncHandler( async(req,res)=>{
const goals = await Goal.find()
res.status(200).json(goals)
})
// @desc Set goals
//@route Set /api/goals
//@acess Private
const updateGoals = asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal) })
// @desc Get goals
//@route Get /api/goals
//@acess Private
const putGoals = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:`update goal ${req.params.id}`
      }) })
// @desc Get goals
//@route Get /api/goals
//@acess Private
const deleteGoals = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:`delete goal ${req.params.id}`
    }) })

module.exports= {
    getGoals,updateGoals,putGoals,deleteGoals
}