import express from "express"
import { createUser, loginUser } from "../controllers/user.controller";
import { handleError } from "../../utils/response";

const router = express.Router();

router.route("/createUser").post(
    handleError(createUser)
)

router.route("/login").post(
    handleError(loginUser)
)

export default router