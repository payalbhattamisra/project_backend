import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js";
const router=Router()

//middleware use
router.route("/register").post(
    upload.fields([
        {
          name:"avatar",
          maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)
//post,get,put,patch,delete,head,options (HTTP methods)(hyper text transfer protocal)
//router.route("/login").post(login)
export default router