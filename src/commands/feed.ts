import { fetchFeed } from "src/lib/feed";
import { createFeed, getFeedByName, getAllFeeds, getFeedByUrl } from "src/lib/db/queries/feed";
import { createFeedFollow } from "src/lib/db/queries/feed_follow";
import { getUserById } from "src/lib/db/queries/users";
import { printFeed } from "src/lib/utils";
import { User } from "src/lib/db/schema";


export async function handlerAggregation(cmdName: string, ...args: string[]): Promise<void> {
  /* if (args.length === 0) {
    throw new Error("Usage: aggregation <url>");
  } */
  // const feedURL = args[0];
  const feedURL = "https://www.wagslane.dev/index.xml";
  const feed = await fetchFeed(feedURL);
  console.log(JSON.stringify(feed));
}

export async function handlerCreateFeed(cmdName: string, user: User, ...args: string[]): Promise<void> {
  if (args.length < 2) {
    throw new Error("Usage: create-feed <name> <url>");
  }
  const name = args[0];
  const url = args[1];
  const existingFeed = await getFeedByName(name);
  if (existingFeed) {
    throw new Error(`Feed ${name} already exists`);
  }

  const newFeed = await createFeed(name, url, user.id);
  console.log(`Feed ${newFeed.name} created.`);
  // printFeed(newFeed, user);
  const newFeedFollow = await createFeedFollow(user.id, newFeed.id);
  console.log(`Feed ${newFeedFollow.feedName} followed.`);
}

export async function handlerListFeeds(cmdName: string, ...args: string[]): Promise<void> {
  const feeds = await getAllFeeds();
  console.log("Feeds:");
  for (const feed of feeds) {
    const user = await getUserById(feed.user_id);
    console.log(` * ${feed.name} (${feed.url}) by ${user.name}`);
  }
}
