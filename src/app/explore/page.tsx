"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Category } from "../types";
import Load from "../components/Load";
import { getCategories } from "../actions/getData";

export default function Explore() {
  const [categories, setCategories] = useState<Category[] | undefined>();

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await getCategories());
    };
    fetchCategories();
  }, []);

  const [title, setTitle] = useState<string>("");

  const searchParams = useSearchParams();
  const [category, setCategory] = useState<number | undefined>(
    parseInt(searchParams.get("category") + ""),
  );

  return (
    <div className="min-h-screen w-screen">
      <div className="flex h-64 flex-col items-center justify-center gap-8 p-2">
        <h1 className="inline-block text-center text-4xl font-semibold sm:text-5xl">
          Explore some simple posts
        </h1>
        <div className="max-w-screen flex flex-row flex-wrap gap-1 sm:gap-3">
          {categories?.map((cat: Category) => (
            <div
              key={cat.id}
              onClick={() =>
                setCategory((currCategory) =>
                  currCategory === cat.id ? undefined : cat.id,
                )
              }
              className={`cursor-pointer select-none rounded-xl border-2 border-slate-400 p-1 sm:text-lg  ${
                category === cat.id ? "bg-slate-400 text-white" : ""
              }`}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex h-max min-h-screen w-full flex-col items-center bg-gradient-to-b from-slate-100 to-transparent py-8 pt-10">
        <div className="custom-shape-divider-top-1693313443">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="pt-2">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type here to search"
            className="rounded-t-md border-b-2 border-slate-400 bg-slate-100 p-2 text-lg outline-none"
          />
        </div>
        <div className="w-[80%]">
          <Load category={category} title={title} />
        </div>
      </div>
    </div>
  );
}
