//require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'

//import mongoose from 'mongoose'
//import {DB_NAME} from './constants'
import connectDB from './db/index.js'

dotenv.config({
    path:'./env'
})

connectDB()




/*
import express from "express"
const app=express()
//Immediately Invoked Async Function Expression (IIAFE);(async function)() & try catch use to connect database
;(async()=>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    //express
    app.on("error",(error)=>{
     console.error("ERR: ",error);
     throw error
    })
    
    app.listen(process.env.PORT,()=>{
      console.log(`app is listening on port ${process.env.PORT}`);
    })
  }
 catch(error){
   console.error("ERROR: ",error);
   throw err
 }
})()

*/