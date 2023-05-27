import { Router } from "express";
import {
  createQrController,
  sendMessageController,
  getQrController,
} from "../controllers/qr.controller";

const router = Router();

router.post("/", createQrController);
router.post("/sendmessage", sendMessageController);
router.get("/:id", getQrController);

export default router;
