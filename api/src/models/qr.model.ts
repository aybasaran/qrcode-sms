import { prop, modelOptions, Severity } from "@typegoose/typegoose";

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: { collection: "qr", timestamps: true },
})
export class Qr {
  @prop({ required: true, unique: true })
  public related_phone_number: string;
}
