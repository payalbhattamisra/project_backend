import express from 'express'

import cookieParser from 'cookie-parser'
import cors from "cors"
const app=express()
//use method use for middleware
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
//3 express configurations
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//img,favicon all store in public so static configuration use
app.use(express.static("public"))
app.use(cookieParser())


//import routes
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users",userRouter)
//http://localhost:8000/api/v1/users/register
export {app}