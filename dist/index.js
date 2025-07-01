import { setUser, readConfig } from "./config.js";
function main() {
    console.log(readConfig());
    setUser("blacke");
    console.log(readConfig());
}
main();
