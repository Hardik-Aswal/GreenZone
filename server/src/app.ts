import cors from 'cors';
import express, {Express} from 'express';
import leaderBoardRouter from "./api/routes/leaderboard.route"
import userRouter from "./api/routes/user.route";
const app: Express = express();

app.use(cors({
    origin : "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", leaderBoardRouter)
app.use("/api/users", userRouter)
export default app;