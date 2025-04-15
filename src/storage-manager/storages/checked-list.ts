import { createFromFile } from "flat-cache";
import { CACHE_DIR, PERSIST_INTERVAL_TIME } from "../../constants.ts";
import { CacheIds } from "../../enums.ts";

const checkList = createFromFile(`${CACHE_DIR}/${CacheIds.CHECK_LIST}`, {
  cacheId: CacheIds.CHECK_LIST,
  persistInterval: PERSIST_INTERVAL_TIME
});

export default checkList;
