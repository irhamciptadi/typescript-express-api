import BaseRoutes from "./BaseRoutes";
import { auth } from "../middlewares/AuthMiddleware";

// Controllers
import UsersController from "../controllers/UsersController";

class UserRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get("/data", auth, UsersController.index);
        this.router.post("/create", auth, UsersController.create);
        this.router.get("/databy", auth, UsersController.show);
        this.router.put("/update", auth, UsersController.update);
        this.router.delete("/delete", auth, UsersController.delete);
    }

}

export default new UserRoutes().router;