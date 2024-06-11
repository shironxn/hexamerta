import { getAcara } from "@/actions/acara";
import { CardAcara } from "@/components/acara/card-acara";

export default async function Home() {
  const acara = await getAcara();

  return (
    <div className="min-h-screen pt-20 md:pt-5 mb-5 px-5 flex flex-col items-center justify-center max-w-lg gap-10 md:fixed">
      <div className="prose" data-aos="fade-down">
        <h2 className="text-center">HEXAMERTA EVENT IS PRESENT</h2>
        <p>Temukan berbagai macam acara menarik yang dapat anda ikuti.</p>
      </div>
      <div data-aos="fade-up">{acara && <CardAcara acara={acara} />}</div>
    </div>
  );
}
