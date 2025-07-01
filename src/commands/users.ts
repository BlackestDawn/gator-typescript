import { setUser, readConfig } from "../config";
import { getUserByName, createUser, resetUsers, getAllUsers } from "../lib/db/queries/users";


export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    throw new Error("Usage: login <username>");
  }
  const username = args[0];
  const existingUser = await getUserByName(username);
  if (!existingUser) {
    throw new Error(`User ${username} does not exist`);
  }
  setUser(username);
}

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    throw new Error("Usage: register <username>");
  }

  const username = args[0];
  const existingUser = await getUserByName(username);
  if (existingUser) {
    throw new Error(`User ${username} already exists`);
  }

  const newUser = await createUser(username);
  setUser(username);
  console.log(`User ${newUser.name} created.`);
  console.log(newUser);
}

export async function handlerReset(cmdName: string, ...args: string[]): Promise<void> {
  const result = await resetUsers();
  if (result) {
    console.log("Users table reset.");
  } else {
    throw new Error("Failed to reset users table.");
  }
}

export async function handlerListUsers(cmdName: string, ...args: string[]): Promise<void> {
  const users = await getAllUsers();
  const config = readConfig();
  console.log("Users:");
  for (const user of users) {
    console.log(` * ${user.name}${user.name === config.currentUserName ? " (current)" : ""}`);
  }
}