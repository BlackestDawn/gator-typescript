import { registerCommand, CommandsRegistry, runCommand } from "./commands/base";
import { handlerLogin, handlerRegister, handlerReset, handlerListUsers } from "./commands/users";


async function main() {
  if (process.argv.length < 3) {
    process.exit(1);
  }

  const cmdName = process.argv[2];
  const args = process.argv.slice(3);
  const registry: CommandsRegistry = {};

  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerListUsers);

  try {
    await runCommand(registry, cmdName, ...args);
    process.exit(0);
  } catch (err) {
    console.log(`Error running command ${cmdName}: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }
}

main();
