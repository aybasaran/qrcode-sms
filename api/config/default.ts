import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/qrcode-sms",
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};
