import React, { FC } from "react";

import { QRCodeSVG } from "qrcode.react";
import Button from "../components/Button";

const ShowQrPage: FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <QRCodeSVG value="https://www.google.com" size={200} />
        <Button
          label="Download QR Code"
          className="bg-purple-400 hover:bg-purple-500 text-black uppercase"
        />
      </div>
    </div>
  );
};

export default ShowQrPage;
