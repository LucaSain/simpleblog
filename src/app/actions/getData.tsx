"use server";
import database from "../db/database";

export const getPosts = (
  category: number,
  title: string,
  index: number,
  limit: number,
) => {
  let posts;
  if (category) {
    posts = database.byCategory(category, posts);
  }
  if (title) posts = database.byTitle(title, posts);

  const startIndex = index ? index * limit : 0;
  const endIndex = index * limit + limit;
  return database.bySequence(startIndex, endIndex, posts);
};

export const getCategories = () => {
  return database.categories;
};
