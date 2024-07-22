import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";

const router=Router()

router.route("/register").post(registerUser)
//post,get,put,patch,delete,head,options (HTTP methods)(hyper text transfer protocal)
//router.route("/login").post(login)
export default router