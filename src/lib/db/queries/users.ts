import { eq } from "drizzle-orm";

import { db } from "..";
import { users } from "../schema";


export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}

export async function resetUsers() {
  return await db.delete(users).returning();
}

export async function getAllUsers() {
  return await db.select().from(users);
}

export async function getUserById(id: string) {
  const [result] = await db.select().from(users).where(eq(users.id, id));
  return result;
}
