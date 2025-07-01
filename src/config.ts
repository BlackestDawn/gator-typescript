import os from 'os';
import path from 'path';
import fs from 'fs';


// const dbURL = "";
const configFileName = ".gatorconfig.json"

type Config = {
  dbUrl: string;
  currentUserName?: string;
}

export function setUser(user: string) {
  const config = readConfig();
  config.currentUserName = user;
  writeConfig(config);
}

export function readConfig(): Config {
  const configFilePath = getConfigFilePath();

  const fileData = fs.readFileSync(configFilePath, {encoding: "utf-8"})
  const rawConfig = JSON.parse(fileData);

  return validateConfig(rawConfig);
}

function getConfigFilePath(): string {
  return path.join(os.homedir(), configFileName);
}

function writeConfig(cfg: Config): void {
  const configFilePath = getConfigFilePath();

  const rawConfig = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName
  }

  const fileData = JSON.stringify(rawConfig);
  fs.writeFileSync(configFilePath, fileData, {encoding: "utf-8"});
}

function validateConfig(rawConfig: any): Config {
  if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
    throw new Error("db_url is required in config file");
  }
  if (!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string") {
    throw new Error("current_user is required in config file");
  }

  const config: Config = {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name
  }

  return config;
}
