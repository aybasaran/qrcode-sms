import { QrModel } from "../models";

import _ from "lodash";

import sendSMS from "../utils/sendSMS.util";

export const createQr = async (number: string) => {
  const qr = await QrModel.create({ related_phone_number: number });
  return qr;
};

export const sendMessage = async (data: any) => {
  const qr = await QrModel.findById(data.qrId);

  if (!qr) {
    throw new Error("QR not found");
  }

  return sendSMS(
    qr.related_phone_number,
    `You have a new message from ${data.name} (${data.email}): ${data.message}`
  );
};

export const getQr = async (id: string) => {
  const qr = await QrModel.findById(id);
  return qr;
};
