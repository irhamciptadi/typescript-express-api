import BaseRoutes from "./BaseRoutes";

// Controllers
import AuthController from "../controllers/AuthController";

class AuthRoutes extends BaseRoutes {

    routes(): void {
        this.router.post("/register", AuthController.index);
        this.router.post("/auth", AuthController.index);
    }
    
}

export default new AuthRoutes().router;