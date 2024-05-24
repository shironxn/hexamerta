import { QRScan } from "@/components/acara/qr-acara";

export default function Page() {
  return (
    <div>
      <article className="prose">
        <h1>Scan Here</h1>
      </article>
      <QRScan />
    </div>
  );
}
