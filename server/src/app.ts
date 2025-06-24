import cors from "cors";
import express, { Express } from "express";
import leaderBoardRouter from "./api/routes/leaderboard.route";
import userRouter from "./api/routes/user.route";
import productRouter from "./api/routes/product.route";
import reviewRouter from "./api/routes/review.route";
import { requestLogger } from "./middlewares/requestLogger";
const app: Express = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger)

app.use("/api", leaderBoardRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
export default app;
