import { createFeedFollow, getfeedFollowsForUser, deleteFeedFollow } from "src/lib/db/queries/feed_follow";
import { getFeedByUrl } from "src/lib/db/queries/feed";
import { User } from "src/lib/db/schema";


export async function handlerFollowFeed(cmdName: string, user: User, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    throw new Error("Usage: follow <feed_url>");
  }
  const feedUrl = args[0];
  const feed = await getFeedByUrl(feedUrl);
  if (!feed) {
    throw new Error(`Feed ${feedUrl} does not exist`);
  }
  const newFeedFollow = await createFeedFollow(user.id, feed.id);
  console.log(`Feed ${newFeedFollow.feedName} followed.`);
}

export async function handlerListFeedFollows(cmdName: string, user: User, ...args: string[]): Promise<void> {
  const feedFollows = await getfeedFollowsForUser(user.id);
  if (feedFollows) {
    console.log("Feed Follows:");
    for (const feedFollow of feedFollows) {
      console.log(` * ${feedFollow.feed_name}`);
    }
  } else {
    console.log("No feed follows found.");
  }
}

export async function handlerUnfollowFeed(cmdName: string, user: User, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    throw new Error("Usage: follow <feed_url>");
  }
  const feedUrl = args[0];
  const feed = await getFeedByUrl(feedUrl);
  if (!feed) {
    throw new Error(`Feed ${feedUrl} does not exist`);
  }
  const newFeedFollow = await deleteFeedFollow(user.id, feed.id);
  // console.log(`Feed ${newFeedFollow.feedName} unfollowed.`);
}
