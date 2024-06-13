"use client";

export const GetTime = ({ time }: { time: string }) => {
  return new Date(time).toLocaleTimeString("id", {
    hour: "numeric",
    minute: "numeric",
  });
};
