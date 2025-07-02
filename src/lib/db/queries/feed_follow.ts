import { eq, and } from "drizzle-orm";

import { db } from "..";
import { feeds, feed_follows, users } from "../schema";


export async function createFeedFollow(userId: string, feedId: string) {
  const [newFeedFollow] = await db
    .insert(feed_follows)
    .values({
      user_id: userId,
      feed_id: feedId,
    })
    .returning();

  const [result] = await db
    .select({
      id: feed_follows.id,
      createdAt: feed_follows.createdAt,
      updatedAT: feed_follows.updatedAt,
      user_id: feed_follows.user_id,
      feed_id: feed_follows.feed_id,
      feedName: feeds.name,
      userName: users.name,
    })
    .from(feed_follows)
    .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
    .innerJoin(users, eq(feed_follows.user_id, users.id))
    .where(
      and(
        eq(feed_follows.id, newFeedFollow.id),
        eq(users.id, newFeedFollow.user_id),
      ),
    );

  return result;
}

export async function getfeedFollowsForUser(userId: string) {
  return await db.select({
    feed_id: feed_follows.feed_id,
    name: feeds.name,
    url: feeds.url,
    user_name: users.name,
    feed_name: feeds.name
  }).from(feed_follows)
    .where(eq(feed_follows.user_id, userId))
    .innerJoin(feeds, eq(feeds.id, feed_follows.feed_id))
    .innerJoin(users, eq(users.id, feed_follows.user_id));
}

export async function deleteFeedFollow(userId: string, feedId: string) {
  const [result] = await db
    .delete(feed_follows)
    .where(and(eq(feed_follows.user_id, userId), eq(feed_follows.feed_id, feedId)))
    .returning();

  return result;
}
