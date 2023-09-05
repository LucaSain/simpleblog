import path from "path";
import { promises as fs } from "fs";
import { Category, Post, PostsData } from "../types";

const jsonDirectory = path.join(process.cwd(), "src/app/posts/json/blog.json");

class db {
  categories?: Category[];
  posts?: Post<Category>[];
  jsonDirectory: string;

  constructor(jsonDirectory: string) {
    this.jsonDirectory = jsonDirectory;
    this.init();
  }

  async init() {
    [this.posts, this.categories] = await this.readJSON(this.jsonDirectory);
  }
  bySlug(slug: string) {
    return this.posts?.find((post) => {
      return post.slug === slug;
    });
  }
  byCategory(
    category: number,
    posts?: Post<Category>[],
  ): Post<Category>[] | undefined {
    posts = posts === undefined ? this.posts : posts;
    posts = posts?.filter((post) => {
      return post.categories
        .map((categ) => {
          return categ?.id === category;
        })
        .includes(true);
    });
    return posts;
  }
  byTitle(
    title: string,
    posts?: Post<Category>[],
  ): Post<Category>[] | undefined {
    posts = posts === undefined ? this.posts : posts;
    posts = posts?.filter((post) => {
      return post.title
        .toLocaleLowerCase()
        .includes(title.toLocaleLowerCase(), 0);
    });
    return posts;
  }
  bySequence(
    startIndex: number,
    endIndex: number,
    posts?: Post<Category>[],
  ): Post<Category>[] | undefined {
    posts = posts === undefined ? this.posts : posts;
    posts = posts?.slice(startIndex, endIndex);
    return posts;
  }

  private readJSON = async (
    jsonDirectory: string,
  ): Promise<[Post<Category>[] | undefined, Category[] | undefined]> => {
    try {
      const fileContents = await fs.readFile(path.join(jsonDirectory), "utf8");
      const data: PostsData<number> = JSON.parse(fileContents);

      let posts: Post<Category>[] | undefined;

      posts = data.posts?.map((post) => {
        let categories: Category[];

        categories = post.categories.map((postCategory) => {
          return data.categories?.find(
            (category) => category.id === postCategory,
          ) as Category;
        });

        return {
          imageUrl: post.imageUrl,
          title: post.title,
          slug: post.slug,
          categories: categories,
          id: post.id,
          excerpt: post.excerpt,
        } as Post<Category>;
      });

      return [posts, data.categories];
    } catch (error) {
      console.error(error);
      return [undefined, undefined];
    }
  };
}

const database = new db(jsonDirectory);
database.init();
export default database;
