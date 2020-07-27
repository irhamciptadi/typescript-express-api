import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    if (!req.headers.authorization) {
        return res.status(401).send({
            status: false,
            code: 401,
            message: "not authenticated"
        });
    }
    
    const secretkey: string = process.env.JWT_SECREAT_KEY || "ICIP1998";
    const token: string = req.headers.authorization.split(" ")[1];

    try {
        
        const credential:string | object = jwt.verify(token, secretkey);
        if (credential) {
            req.app.locals.credential = credential;
            next();
        }
        
        return res.status(401).send({
            success: false,
            code: 401,
            message: "auth invalid",
            data: {}
        });

    } catch (error) {
        return res.status(401).send(error);        
    }
}