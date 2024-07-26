//check user exist or not ,if accessToken & refreshToken is correct then inside of access.body ,access.use add

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"
 
export const verifyJWT=asyncHandler(async(req, _, next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        //Authorization Bearer <Token> .Bearer space replace empty string
        if(!token) {
            throw new ApiError(401,"Unauthorized request")
        }
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(401,"Invalid access Token")
        }
        //if user exist the req inside middleware add
        req.user=user;
        next()
        //next() use here bcz middleware work finish after that normal next function call start
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid access token")
        
    }
})