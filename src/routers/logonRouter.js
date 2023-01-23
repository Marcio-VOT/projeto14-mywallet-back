import logIn from "../controllers/logonControllers/log-in.js";
import register from "../controllers/logonControllers/register.js";
import { Router } from "express";
import { registerValidation } from "../Middlewares/logonValidation.js";

const logonRouter = Router();

logonRouter.post("/log-in", logIn);
logonRouter.post("/register", registerValidation, register);

export default logonRouter;
