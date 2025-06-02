import cors from 'cors';
import express, {Express} from 'express';


const app: Express = express();

app.use(cors({
    origin : "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


export default app;