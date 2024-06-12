import Link from "next/link";
import Marquee from "react-fast-marquee";

const welcomeList: string[] = [
  "selamat datang", // Indonesia, Malaysia
  "welcome", // English
  "bienvenue", // French
  "willkommen", // German
  "bienvenido", // Spanish
  "benvenuto", // Italian
  "欢迎", // Chinese (Simplified)
  "ようこそ", // Japanese
  "환영합니다", // Korean
  "добро пожаловать", // Russian
  "ahlan wa sahlan", // Arabic
  "स्वागत है", // Hindi
  "bem-vindo", // Portuguese
  "καλωσόρισμα", // Greek
  "добре дошли", // Bulgarian
  "tikai", // Swahili
];

export default function Home() {
  return (
    <div className="lg:max-w-lg text-center prose min-h-screen justify-center flex flex-col">
      <div className="w-screen lg:w-full" data-aos="fade-down">
        <Marquee>
          {welcomeList.map((item, i) => (
            <div className="px-2" key={i}>
              <p>{item}</p>
            </div>
          ))}
        </Marquee>
      </div>
      <div data-aos="zoom-out">
        <h1 className="traecking-widest font-bold lg:text-6xl">HEXAMERTA</h1>
        <p className="mx-2">
          Welcome to HEXAMERTA, where the spirit of learning is eternal. Join us
          as we explore the endless possibilities of knowledge and growth,
          united as one enduring class.
        </p>
      </div>
      <div
        className="flex flex-col lg:flex-row gap-2 justify-center items-center"
        data-aos="fade-up"
      >
        <Link href={"/acara"} className="btn btn-primary btn-wide">
          Acara
        </Link>
        <Link href={"/informasi"} className="btn btn-outline btn-wide">
          Informasi
        </Link>
      </div>
    </div>
  );
}
