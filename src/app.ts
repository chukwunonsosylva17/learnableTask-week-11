import express, { Application, Request, Response, NextFunction} from "express";
import cors from "cors";
import hemelt from "helmet"
import dotenv from "dotenv";
import noteRouter from "./routes/noteRoutes";
import {errorHandler} from "./middleware/errorMiddleware";
import { NotFoundError } from "./utils/errorClasses";


dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(hemelt());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/notes", noteRouter);


app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`Cannot find ${req.originalUrl} on this server`));
  });

app.use(errorHandler as (err: Error, req: Request, res: Response, next: NextFunction) => void);

export default app;