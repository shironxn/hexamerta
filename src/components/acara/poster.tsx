"use client";

import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

export const PosterCarousel = ({ url }: { url: string[] }) => {
  return (
    <Carousel
      loop={true}
      autoplay={true}
      className="md:rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      // Add any other necessary props here, for example:
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      placeholder="Carousel Placeholder"
    >
      {url.map((item, i) => (
        <Image
          width={500}
          height={500}
          key={i}
          src={item}
          alt={`image ${i}`}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
};
