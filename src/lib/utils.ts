import { User, Feed } from "./db/schema";
import { CommandHandler } from "src/commands/base";
import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";


export async function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}

export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

export type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
  return async function (cmdName: string, ...args: string[]): Promise<void> {
    const config = readConfig();
    if (!config.currentUserName) {
      throw new Error("No current user set");
    }
    const user = await getUserByName(config.currentUserName) as User;
    const result = await handler(cmdName, user, ...args);

    return result;
  };
}
