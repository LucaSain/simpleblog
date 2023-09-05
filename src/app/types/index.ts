

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Post<T> = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: Array<T | undefined>;
};


export type PostsData<T> = {
  posts?: Array<Post<T>>;
  categories?: Array<Category>;
};
