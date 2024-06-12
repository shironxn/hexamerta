import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center prose text-center w-full">
      <h1>404</h1>
      <p className="max-w-md">
        Don't worry, our team is already on it.Please try refreshing the page or
        come back later.
      </p>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}
