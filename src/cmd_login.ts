import { setUser } from "./config";


export function handlerLogin(cmdName: string, ...args: string[]): void {
  if (args.length === 0) {
    throw new Error("Usage: login <username>");
  }
  const username = args[0];
  setUser(username);
}
