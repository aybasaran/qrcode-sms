import Button from "../components/Button";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import api from "../assets/utils/api.util";

const SendMessagePage = () => {
  const navigate = useNavigate();

  const sendMessageMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/qr/sendmessage", data);
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

    console.log(data);
    // sendMessageMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={submitHandler} className="max-w-sm">
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
        <div>
          <label htmlFor="name">Your Name (*)</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div>
          <label htmlFor="phone">Your Phone Number</label>
          <input type="number" name="number" id="number" />
        </div>
        <div>
          <label htmlFor="message">Your Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <Button label="SEND" isLoading={sendMessageMutation.isLoading} />
      </form>
    </div>
  );
};

export default SendMessagePage;
