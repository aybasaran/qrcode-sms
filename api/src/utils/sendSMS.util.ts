import client from "twilio";
import config from "config";

const sendSMS = async (to: string, body: string) => {
  const twilioClient = client(
    config.get("twilio.accountSid"),
    config.get("twilio.authToken")
  );

  const response = await twilioClient.messages.create({
    body,
    from: config.get("twilio.phoneNumber"),
    to,
  });

  return response;
};

export default sendSMS;
