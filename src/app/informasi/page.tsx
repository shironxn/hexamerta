import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center items-center flex min-h-screen flex-col justify-center prose px-4">
      <p>
        Untuk informasi lebih lanjut silahkan kunjungi IG{" "}
        <span>
          <Link
            href={"https://www.instagram.com/hexamerta.jpg/"}
            target="_blank"
          >
            @hexamerta.jpg
          </Link>
        </span>
      </p>
      <p>Agus laper buk</p>
      <Link
        href={"https://saweria.co/shironxn"}
        target="_blank"
        className="btn btn-primary"
      >
        Click Me
      </Link>
    </div>
  );
}
