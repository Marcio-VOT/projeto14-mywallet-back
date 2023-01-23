import { Router } from "express";
import getData from "../controllers/dataInfoControllers/getData.js";
import postData from "../controllers/dataInfoControllers/postData.js";
import { dataPostValidation } from "../Middlewares/dataValidation.js";
const logonRouter = Router();

logonRouter.get("/move-data", getData);
logonRouter.post("/move-data", dataPostValidation, postData);

export default logonRouter;
