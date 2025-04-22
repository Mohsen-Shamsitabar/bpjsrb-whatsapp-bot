import { createFromFile, FlatCacheEvents } from "flat-cache";
import { CACHE_DIR, PERSIST_INTERVAL_TIME } from "../../constants.ts";
import { CacheIds } from "../../enums.ts";
import {
  addValuesToSheet,
  SheetNames,
  SheetRanges
} from "../../google-sheets/index.ts";
import type { CheckInfo } from "../../types.ts";
import { parseCheckinfo } from "../../utilities/index.ts";

const checkList = createFromFile(`${CACHE_DIR}/${CacheIds.CHECK_LIST}`, {
  cacheId: CacheIds.CHECK_LIST,
  persistInterval: PERSIST_INTERVAL_TIME
});

const saveToSheets = async () => {
  const records = checkList.all();

  const data = Object.values<CheckInfo>(records);
  const parsedData = data.map(info => parseCheckinfo(info));

  await addValuesToSheet({
    method: "update",
    sheetName: SheetNames.ATTENDANCE,
    sheetRange: SheetRanges.ATTENDANCE,
    values: parsedData
  });
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
checkList.on(FlatCacheEvents.SAVE, saveToSheets);

export default checkList;
