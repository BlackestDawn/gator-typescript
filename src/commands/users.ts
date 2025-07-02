import { User } from "src/lib/db/schema";
import { setUser } from "../config";
import { getUserByName, createUser, getAllUsers } from "../lib/db/queries/users";


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

export async function handlerListUsers(cmdName: string, user: User, ...args: string[]): Promise<void> {
  const users = await getAllUsers();
  console.log("Users:");
  for (const u of users) {
    console.log(` * ${u.name}${u.name === user.name ? " (current)" : ""}`);
  }
}