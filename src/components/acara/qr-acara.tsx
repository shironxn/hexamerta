"use client";

import { useQRCode } from "next-qrcode";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import { mendataPeserta } from "@/actions/acara";

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
    <div className="items-center flex flex-col gap-3">
      <Canvas
        logo={{ src: "/thumbnail.jpg", options: { width: 40 } }}
        text={user_id ?? "kosong woy"}
        options={{
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 4,
          width: 320,
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
    </div>
  );
};

export const QRScan = () => {
  const [scanData, setScanData] = useState("");

  const errorHandler = (error: any) => {
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
      </div>
    );
  };

  useEffect(() => {
    const qrCodeScanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      false
    );
    qrCodeScanner.render((result) => setScanData(result), errorHandler);
  }, []);

  useEffect(() => {
    scanData && mendataPeserta(scanData).then((data) => console.log(data));
  }, [scanData]);

  return (
    <div>
      <div id="reader"></div>
    </div>
  );
};
