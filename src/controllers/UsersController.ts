import { Request, Response } from "express";
import IController from "./ControllerInterface";

let data: any[] = [
    {
        id: 1,
        name: 'Aji'
    },
    {
        id: 2,
        name: 'Ayu'
    },
    {
        id: 3,
        name: 'Budi'
    },
    {
        id: 4,
        name: 'Boy'
    }
]

class UsersController implements IController {

    index(req: Request, res: Response): Response {
        return res.send(data);
    }
    
    create(req: Request, res: Response): Response {
        const { id, name } = req.body;

        data.push({
            id: id,
            name: name
        })

        return res.send("Data has been save!");
    }
    
    show(req: Request, res: Response): Response {
        const { id } = req.query;        
        let person = data.find(item => item.id == id);
        return res.send(person);
    }
    
    update(req: Request, res: Response): Response {
        const { id, name } = req.body;

        let person = data.find(item => item.id == id);
        person.name = name;

        return res.send("Data has been update!");
    }

    delete(req: Request, res: Response): Response {
        const { id } = req.body;
        
        let person = data.filter(item => item.id !== id);
        return res.send(person);
    }
   
}

export default new UsersController;