"use client";

import { signIn } from "@/actions/auth";
import { Login, LoginSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ resolver: zodResolver(LoginSchema) });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: Login) => {
    try {
      await signIn(data);
      router.push("/acara/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          {...register("email")}
          type="email"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          {...register("password")}
          type="password"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control mt-4">
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </div>
      {error && (
        <div role="alert" className="alert alert-error mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </form>
  );
};
