//using promise
const asyncHandler=(requestHandler)=>{
  return (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
  }
}
 

export {asyncHandler}
//const asyncHandler=()=>{}
//const asyncHandler=(func)=>()=>{}
//const asyncHandler=(func)=>async ()=>{}

//wrapper fun use every time,next use as middleware
// const asyncHandler=(fn)=>async (req,res,next)=>{
//     try{
//       await fn(req,res,next)
//       //fn call
//     }
//     catch(error){
//       res.status(err.code || 500 ).json({
//         success:false,
//         message:err.message
//       })
//     }
// }