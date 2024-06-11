"use client";

import Countdown from "react-countdown";

export default function CountdownAcara({ date }: { date: string }) {
  return (
    <div className="flex gap-4 text-center text-sm">
      <div>
        <p className="font-bold">
          <Countdown date={date} renderer={(time) => time.days} />
        </p>
        <p>Hari</p>
      </div>
      <div>
        <p className="font-bold">
          <Countdown date={date} renderer={(time) => time.hours} />
        </p>
        <p>Jam</p>
      </div>
      <div>
        <p className="font-bold">
          <Countdown date={date} renderer={(time) => time.minutes} />
        </p>
        <p>Menit</p>
      </div>
      <div>
        <p className="font-bold">
          <Countdown date={date} renderer={(time) => time.seconds} />
        </p>
        <p>Detik</p>
      </div>
    </div>
  );
}
