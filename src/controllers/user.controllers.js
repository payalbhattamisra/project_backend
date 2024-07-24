import {asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async (req,res)=>{
    // res.status(200).json({
    //    message:"ok"
    // })

    //algorithm
    //get user details from frontend
    //validation--not empty
    //check if user already exist--username,email
    //check for images,check for avatars
    //upload them to cloudinary,avatar is present or not check
    //create user object --create entry in db
    //remove password & refresh token field from response bcz mongo db directly show everythinkg to user
    //check for user creation successfuly done or not
    //return res

    const {fullname,email,username,password}=req.body
    console.log("email ",email);
    // if(fullname===""){
    //     throw new ApiError(400,"full name is required")
    // }
    if ( 
        [fullname,email,username,password].some((field)=>
        field?.trim()==="")
    ) {
        throw new ApiError(400,"full name is required")
    }
    const existedUser=User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"user with email or user already exist")
    }
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(404,"avatar file is required");
    }
    //await use wait upto send in cloudinary then next step do
    const avatar=await uploadOnCloudinary(avatarLocalPath);
    const coverImage=await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){
        throw new ApiError(404,"avatar file is required");
    }
    //avatar we already checked valid or not & in res only u send url,but we don't check coverImage so give ternary operator
    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    //check user present or not then remove password & refresh token by using select method where -ve password like wrritten
    const createdUser=await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200 ,createdUser,"user registered successfuly")
    )
})
export {registerUser}