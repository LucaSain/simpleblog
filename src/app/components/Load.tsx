import { useEffect, useRef, useState } from "react";
import { Category, Post } from "../types";
import Posts from "./Posts";
import Spinner from "./Spinner";
import useInView from "../lib/useInView";
import { getPosts } from "../actions/getData";
type Props = {
  category: number | undefined;
  title: string;
};

export default function Load({ category, title }: Props) {
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [data, setData] = useState<Post<Category>[]>();
  const [index, setIndex] = useState<number>(0);
  const ref = useRef(null);
  const isVisible = useInView(ref);

  const loadMore = async () => {
    const newData = await getPosts(parseInt(category + ""), title, index, 9);

    if (!newData?.length) {
      setShowSpinner(false);
      return [];
    }

    setIndex((prevIndex) => prevIndex + 1);
    return newData;
  };

  useEffect(() => {
    if (isVisible && index !== 0) {
      loadMore().then((newData) => {
        setData((prevData) => [...(prevData || []), ...newData]);
      });
    }
  }, [isVisible]);

  useEffect(() => {
    setIndex(0);
    setData([]);
    setShowSpinner(true);
  }, [category, title]);

  useEffect(() => {
    if (index === 0)
      loadMore().then((newData) => {
        setData(newData);
      });
  }, [showSpinner, index]);

  return (
    <>
      <Posts data={data} />
      <div className="flex w-full justify-center pt-20">
        {showSpinner ? (
          <div ref={ref}>
            <Spinner />
          </div>
        ) : (
          <p className="text-slate-600 ">Fetched {data?.length} posts</p>
        )}
      </div>
    </>
  );
}
