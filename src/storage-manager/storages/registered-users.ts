import { createFromFile } from "flat-cache";
import { CACHE_DIR, PERSIST_INTERVAL_TIME } from "../../constants.ts";
import { CacheIds } from "../../enums.ts";

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

export default registeredUsers;
