import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed z-50 flex w-screen items-center bg-slate-200 bg-opacity-80 p-4 shadow-xl backdrop-blur-xl sm:h-16">
      <Link href="/" className="btn text-3xl">
        Simple blog
      </Link>
      <div className="flex-grow"></div>
      <Link className="btn text-2xl" href="/explore">
        Explore
      </Link>
    </div>
  );
}
