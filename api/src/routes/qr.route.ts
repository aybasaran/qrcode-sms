import { Router } from "express";
import {
  createQrController,
  sendMessageController,
} from "../controllers/qr.controller";

const router = Router();

router.post("/", createQrController);
router.post("/sendmessage", sendMessageController);

export default router;
