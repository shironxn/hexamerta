import { getAcara } from "@/actions/acara";
import { TableTiket } from "@/components/dashboard/table-tiket";

export default async function Page() {
  const { data, error } = await getAcara();
  if (error) throw new Error(error);

  return (
    <div className="mt-20 h-screen px-2 md:px-0 w-full">
      {data && <TableTiket acara_id={data.id} />}
    </div>
  );
}
