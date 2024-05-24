import { getAcara, getAllPendaftaran, getPendaftaran } from "@/actions/acara";
import { SelectTable } from "@/components/dashboard/select_table";
import { TablePendaftaran } from "@/components/dashboard/table-pendaftaran";

export default async function Page({
  searchParams,
}: {
  searchParams?: { acara_id: string };
}) {
  const acara = await getAcara();

  let pendaftaran = [];
  try {
    pendaftaran = await getAllPendaftaran(searchParams?.acara_id ?? "");
  } catch (error) {}

  return (
    <div>
      <SelectTable acara={acara} />
      <TablePendaftaran pendaftaran={pendaftaran} />
    </div>
  );
}
