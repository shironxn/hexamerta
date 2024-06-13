"use client";

import { useQRCode } from "next-qrcode";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import { setStatusTiket } from "@/actions/acara";
import { Tiket } from "@/lib/types";
import html2canvas from "html2canvas-pro";

export const DownloadTiket = ({ nama }: { nama: string }) => {
  const downloadHandler = () => {
    html2canvas(document.body, {
      allowTaint: true,
      useCORS: true,
      logging: true,
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/jpg");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `Tiket - ${nama}.jpg`;

      link.click();
    });
  };

  return (
    <button className="btn btn-primary" onClick={downloadHandler}>
      Download Tiket
    </button>
  );
};

export const QRCode = ({ text, width }: { text: string; width: number }) => {
  const { Canvas } = useQRCode();

  return (
    <div className="scale-50">
      <Canvas
        text={text}
        options={{
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 4,
          width: width,
        }}
      />
    </div>
  );
};

export const QRScan = () => {
  const [scanData, setScanData] = useState("");
  const [scanResult, setScanResult] = useState<Tiket | Error | null>(null);

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
    qrCodeScanner.render(async (result) => {
      setScanData(result);
    }, errorHandler);
  }, []);

  useEffect(() => {
    scanData &&
      setStatusTiket(scanData, "digunakan")
        .then(setScanResult)
        .catch(setScanResult);
  }, [scanData]);

  return (
    <div className="flex flex-col items-center mt-8">
      <div id="reader" className="mb-4"></div>
      {scanResult && (
        <dialog id="my_modal_5" className="modal modal-open">
          <div className="modal-box">
            <div>
              {scanResult instanceof Error ? (
                <div>
                  <h3 className="font-bold text-lg">Tiket Tidak Valid</h3>
                  <p className="py-4">{scanResult.message}</p>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  <h3 className="font-bold text-lg">Tiket Valid</h3>
                  <div className="flex items-center">
                    <p className="w-20 font-bold">Nama:</p>
                    <p>{scanResult.nama_lengkap}</p>
                  </div>

                  <div className="flex items-center">
                    <p className="w-20 font-bold">Kelas:</p>
                    <p>{scanResult.kelas}</p>
                  </div>

                  <div className="flex items-center">
                    <p className="w-20 font-bold">Telepon:</p>
                    <p>{scanResult.nomor_telepon}</p>
                  </div>

                  <div className="flex items-center">
                    <p className="w-20 font-bold">Email:</p>
                    <p>{scanResult.email}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => document.location.reload()}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};
