import { getAcara } from "@/actions/acara";
import { CardAcara } from "@/components/acara/card-acara";

export default async function Home() {
  const acara = await getAcara();

  return (
    <div className="min-h-screen items-center flex py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {acara && acara.map((item, i) => <CardAcara acara={item} key={i} />)}
      </div>
    </div>
  );
}
