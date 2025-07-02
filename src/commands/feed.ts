import { fetchFeed } from "src/lib/feed";
import { createFeed, getFeedByName, getAllFeeds } from "src/lib/db/queries/feed";
import { readConfig } from "src/config";
import { getUserByName, getUserById } from "src/lib/db/queries/users";
import { printFeed } from "src/lib/utils";


export async function handlerAggregation(cmdName: string, ...args: string[]): Promise<void> {
  /* if (args.length === 0) {
    throw new Error("Usage: aggregation <url>");
  } */
  // const feedURL = args[0];
  const feedURL = "https://www.wagslane.dev/index.xml";
  const feed = await fetchFeed(feedURL);
  console.log(JSON.stringify(feed));
}

export async function handlerCreateFeed(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length < 2) {
    throw new Error("Usage: create-feed <name> <url>");
  }
  const name = args[0];
  const url = args[1];
  const existingFeed = await getFeedByName(name);
  if (existingFeed) {
    throw new Error(`Feed ${name} already exists`);
  }

  const config = readConfig();
  if (!config.currentUserName) {
    throw new Error("No current user set");
  }
  const user = await getUserByName(config.currentUserName);

  const newFeed = await createFeed(name, url, user.id);
  console.log(`Feed ${newFeed.name} created.`);
  // printFeed(newFeed, user);
}

export async function handlerListFeeds(cmdName: string, ...args: string[]): Promise<void> {
  const feeds = await getAllFeeds();
  console.log("Feeds:");
  for (const feed of feeds) {
    const user = await getUserById(feed.user_id);
    console.log(` * ${feed.name} (${feed.url}) by ${user.name}`);
  }
}
