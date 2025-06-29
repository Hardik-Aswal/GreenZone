import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import {Request, Response} from "express";
import { success } from "./utils/response"; 



const PORT = process.env.PORT || 4000;



app.get("/", (req: Request, res: Response) => {
    const response = success("Welcome to the Server", 200);
    res.status(response.status).json(response);
}
);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})