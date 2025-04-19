import { CACHE_DIR } from "../constants.ts";
import { CacheIds } from "../enums.ts";
import checkList from "./storages/checked-list.ts";
import { registeredUsers } from "./storages/index.ts";

const initiateStorages = () => {
  registeredUsers.loadFile(`${CACHE_DIR}/${CacheIds.REGISTERED_USERS}`);
  registeredUsers.startAutoPersist();
  registeredUsers.save();

  checkList.loadFile(`${CACHE_DIR}/${CacheIds.CHECK_LIST}`);
  checkList.startAutoPersist();
  checkList.save();
};

export default initiateStorages;
