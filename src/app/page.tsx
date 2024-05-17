import { ButtonAcara } from "@/components/home/button-acara";
import Image from "next/image";

export default function Home() {
  return (
    <div className="hero">
      <div className="hero-content gap-20 flex-col lg:flex-row-reverse">
        <Image src={"/home.png"} width={300} height={300} alt=""></Image>
        <div>
          <article className="prose">
            <h1>
              Selamat
              <br />
              datang di
              <br />
              Hexamerta
            </h1>
          </article>
          <div className="flex gap-4 justify-center mt-4">
            <ButtonAcara />
          </div>
        </div>
      </div>
    </div>
  );
}
