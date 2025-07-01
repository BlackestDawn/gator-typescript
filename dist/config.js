import os from 'os';
import path from 'path';
import fs from 'fs';
// const dbURL = "";
const configFileName = ".gatorconfig.json";
export function setUser(user) {
    const config = readConfig();
    config.currentUserName = user;
    writeConfig(config);
}
export function readConfig() {
    const configFilePath = getConfigFilePath();
    const fileData = fs.readFileSync(configFilePath, { encoding: "utf-8" });
    const rawConfig = JSON.parse(fileData);
    return validateConfig(rawConfig);
}
function getConfigFilePath() {
    return path.join(os.homedir(), configFileName);
}
function writeConfig(cfg) {
    const configFilePath = getConfigFilePath();
    const fileData = JSON.stringify(cfg);
    fs.writeFileSync(configFilePath, fileData, { encoding: "utf-8" });
}
function validateConfig(rawConfig) {
    console.log("Got config:");
    console.log(rawConfig);
    const config = rawConfig;
    console.log("Validated config:");
    console.log(config);
    return config;
}
