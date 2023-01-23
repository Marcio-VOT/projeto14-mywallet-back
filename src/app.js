import express, { json } from "express";
import cors from "cors";
import logonRouter from "./routers/logonRouter.js";
import dataInfoRouter from "./routers/dataInfoRouter.js";
const app = express();
app.use(json());
app.use(cors());

app.use([logonRouter, dataInfoRouter]);

app.listen(5000, () => console.log(`Server running in port: ${5000}`));
