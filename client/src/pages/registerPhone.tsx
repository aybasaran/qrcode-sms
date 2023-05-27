import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { E164Number } from "libphonenumber-js/core";
import { FC, useState } from "react";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import api from "../assets/utils/api.util";
import Button from "../components/Button";

import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

const RegisterPhonePage: FC = () => {
  const [value, setValue] = useState<E164Number>();
  const navigate = useNavigate();

  const generateQrCodeMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/qr", { number: value });
      return res.data;
    },
    onSuccess: (data: any) => {
      console.log(data);
      navigate(`/${data._id}/`);
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.error);
      }
    },
  });

  return (
    <>
      <Toaster />
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
    </>
  );
};

export default RegisterPhonePage;
