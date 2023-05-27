import { Request, Response } from "express";
import { createQr, sendMessage, getQr } from "../services/qr.service";

import { omit, isEmpty } from "lodash";

export const createQrController = async (req: Request, res: Response) => {
  try {
    const { number } = req.body;

    const qr = await createQr(number);

    if (!qr) {
      return res.status(500).json({ error: "QR not created" });
    }

    const safeQr = omit(qr.toJSON(), [
      "updatedAt",
      "__v",
      "related_phone_number",
    ]);

    return res.status(201).json({ ...safeQr });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "QR already exists" });
    }

    return res.status(500).json({ error: error.message });
  }
};

export const sendMessageController = async (req: Request, res: Response) => {
  try {
    const msgResponse = await sendMessage(req.body);

    if (!msgResponse) {
      return res.status(500).json({ error: "Message not sent" });
    }

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getQrController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const qr = await getQr(id);

    if (isEmpty(qr)) {
      return res.status(404).json({ error: "QR not found" });
    }

    // omit the related_phone_number field
    const safeQr = omit(qr.toJSON(), [
      "related_phone_number",
      "updatedAt",
      "__v",
    ]);

    return res.status(200).json({ ...safeQr });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
