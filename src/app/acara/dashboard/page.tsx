import { getAcara } from "@/actions/acara";
import { TableTiket } from "@/components/dashboard/table-tiket";

export default async function Page() {
  const acara = await getAcara();

  return (
    <div className="mt-20 h-screen px-2 md:px-0 w-full items-center">
      {acara && <TableTiket acara_id={acara.id} />}
    </div>
  );
}
