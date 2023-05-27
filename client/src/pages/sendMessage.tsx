import Button from "../components/Button";
import { E164Number } from "libphonenumber-js/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import api from "../assets/utils/api.util";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input/input";

const SendMessagePage = () => {
  const [value, setValue] = useState<E164Number>();

  const navigate = useNavigate();
  const { id } = useParams();

  const { error } = useQuery({
    queryKey: ["qr", id],
    queryFn: async () => {
      const res = await api.get(`/qr/${id}`);
      return res.data;
    },
    retry: false,
  });

  useEffect(() => {
    if (error) {
      navigate("/404");
    }
  }, [error, navigate]);

  const sendMessageMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/qr/sendmessage", { ...data, qrId: id });
      return res;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    sendMessageMutation.mutate({ ...data, qrId: id });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={submitHandler} className="max-w-sm flex flex-col gap-3">
        <div className="inputGroup">
          <label htmlFor="message">Message (*)</label>
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={10}
            placeholder="Type your message here... "
            required
          ></textarea>
        </div>
        <div className="inputGroup">
          <label htmlFor="name">Your Name (*)</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div className="inputGroup">
          <label htmlFor="phone">Your Phone Number</label>
          <div>
            <PhoneInput
              placeholder="+1 (702) 123-4567"
              onChange={setValue}
              value={value}
            />
          </div>
        </div>
        <div className="inputGroup">
          <label htmlFor="message">Your Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <Button
          label="SEND"
          isLoading={sendMessageMutation.isLoading}
          className="bg-blue-400 hover:bg-blue-500"
        />
      </form>
    </div>
  );
};

export default SendMessagePage;
