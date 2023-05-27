import { getModelForClass } from "@typegoose/typegoose";
import { Qr } from "./qr.model";

export const QrModel = getModelForClass(Qr);
