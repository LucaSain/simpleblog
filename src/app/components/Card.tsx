"use client";

import { Category, Post } from "../types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  postdata: Post<Category>;
};

export default function Card({ postdata }: Props) {
  const [imageError, setImageError] = useState(false);
  const aliasLetter = postdata.title[0];
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link
      href={"/post/" + postdata.slug}
      className="flex h-[30rem] w-full flex-col rounded-xl bg-white shadow-xl transition-transform hover:translate-y-[-4px]"
    >
      <div className="h-2/5 w-full overflow-hidden rounded-t-xl">
        {!imageError ? (
          <Image
            alt={postdata.slug}
            height={600}
            width={800}
            className="h-full w-full object-cover"
            src={postdata.imageUrl}
            onError={handleImageError}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200 text-5xl text-slate-500">
            {aliasLetter}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex flex-row gap-2">
          {postdata.categories.map((category) => {
            return (
              <h3 key={category?.id} className="text-slate-500">
                {category?.name}
              </h3>
            );
          })}
        </div>

        <h2 className="pt-2 text-2xl font-semibold">{postdata.title}</h2>
        <p className="truncate pt-4 text-sm font-light">{postdata.excerpt}</p>
      </div>
      <div className="flex-grow"></div>
      <div className="flex flex-row items-center gap-2 p-4">
        <Image
          height={600}
          width={800}
          className="h-14 w-14 rounded-full object-cover"
          src="https://picsum.photos/id/237/800/600"
          alt="Author"
        />
        <div>
          <h2 className="font-bold">Author</h2>
          <h2 className="text-sm font-light">Time and read data</h2>
        </div>
      </div>
      <div></div>
    </Link>
  );
}
