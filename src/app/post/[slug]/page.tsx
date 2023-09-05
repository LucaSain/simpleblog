import Image from "next/image";
import Link from "next/link";
import database from "@/app/db/database";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  await database.init();
  const post = database.bySlug(params.slug);
  return (
    <div className="flex min-h-screen justify-center">
      <div className="inline-block w-[90%] rounded-xl shadow-xl">
        <Image
          height={600}
          width={800}
          className="absolute z-0 h-64 w-[90%] rounded-t-xl object-cover "
          src={post?.imageUrl + ""}
          alt={post?.slug + ""}
        />
        <div className="relative z-10 flex h-full min-h-max flex-col rounded-xl">
          <div className="flex h-64 w-full flex-col items-center justify-center gap-4 rounded-t-xl backdrop-blur-sm backdrop-brightness-50">
            <h1 className="inline-block text-center text-xl font-semibold text-white sm:text-4xl md:text-5xl">
              {post?.title}
            </h1>
            <div className="flex flex-row gap-2">
              {post?.categories.map((category) => {
                return (
                  <Link
                    key={category?.id}
                    className="rounded-lg p-2 font-light text-slate-300 underline backdrop-blur-md backdrop-brightness-50 sm:text-lg"
                    href={"/explore?category=" + category?.id}
                  >
                    {category?.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <p className="min-h-max w-full flex-grow px-3 pt-10 text-lg">
            {post?.excerpt}
          </p>
          <div className="flex w-full flex-col items-center gap-2 pb-4">
            <Image
              height={600}
              width={800}
              className="h-20 w-20 rounded-full object-cover"
              src="https://picsum.photos/id/237/800/600"
              alt="Author"
            />
            <p className="text-2xl">Author Name</p>
          </div>
        </div>
      </div>
    </div>
  );
}
