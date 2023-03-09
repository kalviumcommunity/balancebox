const express = require('express')
const router = express.Router()
const {getGoals,updateGoals,putGoals,deleteGoals} = require('../controller/goalController')


  router.get('/',getGoals)
  
  router.post('/',updateGoals) 
  
  router.put('/:id',putGoals)

  router.delete('/:id',deleteGoals)

module.exports=router