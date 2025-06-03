import cors from 'cors';
import express, {Express} from 'express';
import leaderBoardRouter from "./api/routes/leaderboard.route"

const app: Express = express();

app.use(cors({
    origin : "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", leaderBoardRouter)

export default app;