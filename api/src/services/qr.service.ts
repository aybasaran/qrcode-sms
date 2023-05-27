import { QrModel } from "../models";

import sendSMS from "../utils/sendSMS.util";

export const createQr = async (number: string) => {
  const qr = await QrModel.create({ related_phone_number: number });
  return qr;
};

export const sendMessage = async (data) => {
  console.log(data);
};
