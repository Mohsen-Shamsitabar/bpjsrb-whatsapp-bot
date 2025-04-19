import { createFromFile, FlatCacheEvents } from "flat-cache";
import { CACHE_DIR, PERSIST_INTERVAL_TIME } from "../../constants.ts";
import { CacheIds } from "../../enums.ts";
import {
  addValuesToSheet,
  SheetNames,
  SheetRanges
} from "../../google-sheets/index.ts";
import type { User } from "../../types.ts";
import { parseUser } from "../../utilities/index.ts";

// const registeredUsers = new FlatCache({
//   cacheId: CacheIds.REGISTERED_USERS,
//   // ttl: 60 * 60 * 1000, // 1 hour
//   // lruSize: 30, // 30 items
//   // expirationInterval: 5 * 1000 * 60, // 5 minutes
//   persistInterval: 2 * 1000 * 60 // 2 minutes
// });

const registeredUsers = createFromFile(
  `${CACHE_DIR}/${CacheIds.REGISTERED_USERS}`,
  {
    cacheId: CacheIds.REGISTERED_USERS,
    persistInterval: PERSIST_INTERVAL_TIME
  }
);

const saveToSheets = async () => {
  const records = registeredUsers.all();
  const data = Object.values<User>(records);

  const parsedData = data.map(user => parseUser(user));

  await addValuesToSheet({
    method: "update",
    sheetName: SheetNames.REGISTERED_USERS,
    sheetRange: SheetRanges.REGISTERED_USERS,
    values: parsedData
  });
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
registeredUsers.on(FlatCacheEvents.SAVE, saveToSheets);

export default registeredUsers;
