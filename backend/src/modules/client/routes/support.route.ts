import  { Router } from "express";
import {createSupport, getSupport} from "../controllers/support.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();


router.use(authMiddleware)
router.post("/", createSupport);
router.get("/", getSupport);


export default router;