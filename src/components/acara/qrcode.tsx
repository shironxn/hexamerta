"use client";

import { useQRCode } from "next-qrcode";

export const QRCode = ({ user_id }: { user_id?: string }) => {
  const { Canvas } = useQRCode();

  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qrcode.jpeg";
      link.click();
    }
  };

  return (
    <>
      <Canvas
        logo={{ src: "/thumbnail.jpg", options: { width: 40 } }}
        text={user_id ?? "kosong woy"}
        options={{
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            // dark: "#010599FF",
            // light: "#FFBF60FF",
          },
        }}
      />
      <button
        className="btn btn-outline w-full"
        onClick={() => downloadQRCode()}
      >
        Download
      </button>
    </>
  );
};
