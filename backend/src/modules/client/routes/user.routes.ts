import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  uploadUserProfileImage,
} from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { upload } from "../../../middlewares/multer.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/", getUserProfile);
router.post("/avatar", upload.single("avatar"), uploadUserProfileImage);
router.patch("/",  updateUserProfile);

export default router;
