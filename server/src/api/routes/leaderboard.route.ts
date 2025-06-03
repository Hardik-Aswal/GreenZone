import express from "express"
import { getLeaderBoardDeatils } from "../controllers/leaderboar.controller";

const router = express.Router();

router.route("/leaderBoardDetails").get(getLeaderBoardDeatils)

export default router