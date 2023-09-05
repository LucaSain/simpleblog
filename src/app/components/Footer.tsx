import Link from "next/link";
export default function Footer() {
  return (
    <footer className="z-10 flex flex-row items-center bg-white p-5 sm:p-10">
      <div className="flex flex-col">
        <Link
          href="/"
          className="cursor-pointer rounded-lg text-xl font-semibold sm:text-3xl"
        >
          Simple blog
        </Link>
        <a href="https://github.com/LucaSain" className="text-lg sm:text-xl">
          Made by Sainenco Luchian
        </a>
      </div>
      <div className="flex-grow"></div>
      <a
        href="https://github.com/LucaSain/simpleblog"
        className="text-lg sm:text-xl"
      >
        GitHub
      </a>
    </footer>
  );
}
