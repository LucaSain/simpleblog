import { Category, Post } from "../types";
import Card from "./Card";

type Props = {
  data: Array<Post<Category>> | undefined;
};

export default function Posts({ data }: Props) {
  return (
    <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((post) => {
        return <Card key={post.id} postdata={post} />;
      })}
    </div>
  );
}
