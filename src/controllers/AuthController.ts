import { Request, Response } from "express";
import Authentication from "../utils/Authentication";
import { compare } from "bcrypt";
const db = require("../db/models");

class AuthController {

    register = async (req: Request, res: Response): Promise<Response> => {
        let { username, password } = req.body;

        const hashedPassword:string = await Authentication.PasswordHash(password);
        const data = {
            username: username,
            password: hashedPassword
        }
        const trx =  await db.users.create(data);
        return res.send(trx);
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        // find user
        let { username, password } = req.body;
        
        const user = await db.users.findOne({
            where: { username: username }
        });

        // check password
        let compare = await Authentication.PasswordCompare(password, user.password);

        // generate token
        if (compare) {
            let token = Authentication.generateToken(user.id, username, user.password);
            return res.status(200).send({
                status: true,
                code: 200,
                message: "auth success",
                data: {},
                token: token
            })
        }

        return res.status(422).send({
            status: false,
            code: 422,
            message: "auth failed"
        });
    }
    
    profile = (req: Request, res: Response): Response => {
        return res.status(200).send({
            status: false,
            code: 200,
            message: `this profile ${JSON.stringify(req.app.locals.credential)}`
        });
    }
}

export default new AuthController;