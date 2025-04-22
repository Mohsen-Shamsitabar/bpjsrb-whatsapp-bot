import { CACHE_DIR } from "../constants.ts";
import { CacheIds } from "../enums.ts";
import { checkList, registeredUsers } from "./storages/index.ts";

const initiateStorages = () => {
  registeredUsers.loadFile(`${CACHE_DIR}/${CacheIds.REGISTERED_USERS}`);
  registeredUsers.startAutoPersist();

  checkList.loadFile(`${CACHE_DIR}/${CacheIds.CHECK_LIST}`);
  checkList.startAutoPersist();
};

export default initiateStorages;
