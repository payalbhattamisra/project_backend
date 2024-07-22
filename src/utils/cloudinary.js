import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
//fs -->file system inbuild present in nodejs helps to read ,write,async,await,file link,unlink(insert,delete)
  

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View Credentials' below to copy your API secret
    });
     
    const uploadOnCloudinary=async(localFilePath)=>{
        try{
          if (!localFilePath) return null
          //upload the file on cloudinary
          cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
          })
          //file has been uploaded successfully
          console.log("file is uploaded on cloudinary",response.url);
          return response;
        }
        catch(error){
          fs.unlinkSync(localFilePath)//remove the locally saves temporary file as the upload operation got failed
          return null;
        }
    }

    export {uploadOnCloudinary}
        // Upload an image
        //  const uploadResult = await cloudinary.uploader
        //    .upload(
        //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
        //            public_id: 'shoes',
        //        }
        //    )
        //    .catch((error) => {
        //        console.log(error);
        //    });
        
        // console.log(uploadResult);
        