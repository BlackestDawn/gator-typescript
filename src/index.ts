import { registerCommand, CommandsRegistry, runCommand } from "./commands";
import { handlerLogin } from "./cmd_login";


function main() {
  if (process.argv.length < 3) {
    process.exit(1);
  }

  const cmdName = process.argv[2];
  const args = process.argv.slice(3);
  const registry: CommandsRegistry = {};

  registerCommand(registry, "login", handlerLogin);

  try {
    runCommand(registry, cmdName, ...args);
  } catch (err) {
    console.log(`Error running command ${cmdName}: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }

}

main();
