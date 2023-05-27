import { Request, Response } from "express";
import { createQr, sendMessage } from "../services/qr.service";

export const createQrController = async (req: Request, res: Response) => {
  try {
    const { number } = req.body;

    const qr = await createQr(number);

    return res.status(201).json({ qr });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const sendMessageController = async (req: Request, res: Response) => {
  try {
    const { number } = req.body;

    const msgResponse = await sendMessage();

    return res.status(200).json({ msgResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
