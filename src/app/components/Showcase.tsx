import database from "../db/database";
import Posts from "./Posts";

export default async function Showcase() {
  const data = database.bySequence(0, 3);

  return (
    <div className="relative z-10 h-max w-screen bg-gradient-to-b from-slate-100 to-transparent py-20">
      <div className="custom-shape-divider-top-1693307712">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-8 pt-8 md:px-40">
        <h1 className="text-3xl font-semibold sm:text-5xl">From the blog</h1>
        <p className="text-lg font-light sm:text-xl">From the blog</p>
        <Posts data={data} />
      </div>
    </div>
  );
}
