import { Commands } from "./enums.ts";

export const CACHE_DIR = "./.cache";
export const PERSIST_INTERVAL_TIME = 10000; // 10 secs

export const DISABLE_CMDS = new Set<Commands>([Commands.PING]);
