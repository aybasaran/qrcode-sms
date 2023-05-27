import { FC } from "react";
import { QRCodeSVG } from "qrcode.react";
import Button from "../components/Button";
import { useParams } from "react-router-dom";

const ShowQrPage: FC = () => {
  const { id } = useParams();

  const dowloadQrCode = function () {
    const svg = document.querySelector("svg") as SVGElement;
    const serializer = new XMLSerializer();
    const svgSerialized = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = "data:image/svg+xml;base64," + btoa(svgSerialized);
    canvas.width = svg.clientWidth;
    canvas.height = svg.clientHeight;
    image.onload = function () {
      context?.drawImage(image, 0, 0);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "qr.png";
      a.click();
    };
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <QRCodeSVG value={`http://localhost:5173/${id}`} size={200} />
        <Button
          label="Download QR Code"
          className="bg-purple-400 hover:bg-purple-500 text-black uppercase"
          onClick={dowloadQrCode}
        />
      </div>
    </div>
  );
};

export default ShowQrPage;
