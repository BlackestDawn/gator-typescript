import { setUser, readConfig } from "../config";
import { resetUsers } from "../lib/db/queries/users";


export async function handlerReset(cmdName: string, ...args: string[]): Promise<void> {
  const result = await resetUsers();
  if (result) {
    console.log("Users table reset.");
  } else {
    throw new Error("Failed to reset users table.");
  }
}
