import { FC, useState } from "react";
import Button from "../components/Button";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import { useMutation } from "@tanstack/react-query";
import api from "../assets/utils/api.util";

const RegisterPhonePage: FC = () => {
  const [value, setValue] = useState<E164Number>();

  const generateQrCodeMutation = useMutation({
    mutationFn: async () => {
      const res = api.post("/qr", { phone: value });
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-8">
      <h1 className="text-2xl">Welcome!</h1>
      <p className="text-lg">
        if someone scan your QR code, they will be able to send you a message,
        without knowing your phone number
      </p>
      <div>
        <PhoneInput
          placeholder="+1 (702) 123-4567"
          onChange={setValue}
          value={value}
        />
      </div>
      <Button
        onClick={() => generateQrCodeMutation.mutate()}
        label="generate"
        className="bg-green-400 hover:bg-green-500 text-black uppercase"
        isLoading={generateQrCodeMutation.isLoading}
      />
    </div>
  );
};

export default RegisterPhonePage;
