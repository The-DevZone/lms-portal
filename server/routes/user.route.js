import express from "express";
// import { userController } from "../controllers/user.controller.js";
import { register} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(register);

export default router;
