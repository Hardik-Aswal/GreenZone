import express from "express"
import { createUser, getUserProfile, loginUser } from "../controllers/user.controller";
import { handleError } from "../../utils/response";
import { authenticateUser } from "../../middlewares/auth.middleware";


const router = express.Router();

router.route("/createUser").post(
    handleError(createUser)
)

router.route("/login").post(
    handleError(loginUser)
)

router.route("/profile").get(
    handleError(getUserProfile)
)

export default router