import { promises as fs } from "fs";
import path from "path";
import type { User } from "../types.ts";

type StorageConfig = {
  filePath?: string;
  prettyPrint?: boolean;
};

class JsonStorage {
  private readonly filePath: string;
  private readonly prettyPrint: boolean;

  private isRestored: boolean;
  public users: Map<string, User>;

  constructor(config: StorageConfig = {}) {
    this.filePath = config.filePath || path.join(process.cwd(), "data.json");
    this.prettyPrint =
      config.prettyPrint !== undefined ? config.prettyPrint : true;
    this.users = new Map();
    this.isRestored = false;
  }

  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, "{}");
    }
  }

  private async restorePrevData() {
    await this.ensureFileExists();
    const data = await fs.readFile(this.filePath, "utf8");

    const prevUsers = new Map<string, User>(
      Object.entries(JSON.parse(data) as object)
    );

    this.users = prevUsers;
    this.isRestored = true;
  }

  public async addUser(user: User): Promise<void> {
    if (!this.isRestored) await this.restorePrevData();

    this.users.set(user.phoneNumber, user);

    // Convert Map to object before stringifying
    const dataToWrite = Object.fromEntries(this.users);
    const jsonString = this.prettyPrint
      ? JSON.stringify(dataToWrite, null, 2)
      : JSON.stringify(dataToWrite);

    await fs.writeFile(this.filePath, jsonString, "utf8");
  }
}

export default JsonStorage;
