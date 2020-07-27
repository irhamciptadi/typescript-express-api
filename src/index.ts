import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { config as dotenv } from "dotenv";

// Routers
import AuthRoutes from "./routers/AuthRoutes";
import UsersRoutes from "./routers/UsersRoutes";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("this route ts")
        });
        
        this.app.use("/api/v1/users", UsersRoutes);
        this.app.use("/api/v1/auth", AuthRoutes)
    }
}

const port: number = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log(`Apps running in: ${process.env.DB_HOST}:${port}`);
});