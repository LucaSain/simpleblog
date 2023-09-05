import { NextResponse, NextRequest } from "next/server";
import database from "../db/database";

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug");

    if (slug) {
      return NextResponse.json(database.bySlug(slug));
    }

    const category = parseInt(
      request.nextUrl.searchParams.get("category") + "",
    );
    const title = request.nextUrl.searchParams.get("title");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "1");
    const index = parseInt(request.nextUrl.searchParams.get("index") + "");
    let posts;
    if (category) {
      if (category === -1) return NextResponse.json(database.categories);
      posts = database.byCategory(category, posts);
    }
    if (title) {
      posts = database.byTitle(title, posts);
    }

    const startIndex = index ? index * limit : 0;
    const endIndex = index * limit + limit;

    return NextResponse.json(database.bySequence(startIndex, endIndex, posts));
  } catch (error) {
    return NextResponse.error;
  }
}
