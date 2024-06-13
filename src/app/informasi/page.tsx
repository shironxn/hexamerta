import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center items-center flex h-screen prose px-4">
      <p>
        untuk informasi lebih lanjut silahkan kunjungi IG{" "}
        <span>
          <Link
            href={"https://www.instagram.com/hexamerta.jpg/"}
            target="_blank"
          >
            @hexamerta.jpg
          </Link>
        </span>
      </p>
    </div>
  );
}
