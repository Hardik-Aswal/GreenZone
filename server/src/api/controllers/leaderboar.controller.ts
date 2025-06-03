import { Request, Response } from "express";
import { leaderBoardDetail } from "../services/leaderboard.service";
import { success } from "../../utils/response";


export async function getLeaderBoardDeatils(req: Request, res: Response){

    const {date} = req.query


    const output = leaderBoardDetail(date as string);

    success({
        message : output
    }, 200 )

    

}