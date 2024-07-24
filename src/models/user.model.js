import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken'
//jwt --.beared token(if token u get then u acces the data)
import bcrypt from 'bcrypt'
const userSchema=new Schema(
 {
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
  },
  fullname:{
    type:String,
    required:true,
    trim:true,
    index:true
  },
  avatar:{
    type:String,//cloudinary url
    required:true
  },
  coverImage:{
    type:String,
  },
  watchHistory:{
   type:Schema.Types.ObjectId,
   ref:"Video"
  },
  password:{
    type:String,//encrypted
    required:[true,'password is required']
  },
  refreshToken:{
    type:String
  }
 },{timestamps:true}
)

//middleware use pre
//here before save the password check if ismodify function use to modify or not then or update then a new password happen
userSchema.pre("save",async function (next){
  if(!this.isModified("password"))return next();

  this.password=await bcrypt.hash(this.password,10)//10--salt
  next()
})

//methods use
//hash bcrypt.compare the password is correct or not and send true or false
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare (password,this.password)
}
userSchema.methods.generateAccessToken=function (){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        //payload,accesstoken,accestokenexpiry(under expiresIn property)
        process.env.ACCESS_TOKEN_SECRET,{
          expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function (){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        //payload,accesstoken,accestokenexpiry(under expiresIn property)
        process.env.REFRESH_TOKEN_SECRET,{
          expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User=mongoose.model("User",userSchema)