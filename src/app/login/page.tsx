import { LoginForm } from "@/components/auth/login-form";

export default function Page() {
  return (
    <div className="hero min-h-screen px-2">
      <div className="w-full md:w-1/2">
        <div className="shrink-0 text-center w-full">
          <h1 className="text-5xl font-bold">Login</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
