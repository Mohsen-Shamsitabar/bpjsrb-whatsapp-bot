import checkList from "./storages/checked-list.ts";
import { registeredUsers } from "./storages/index.ts";

const initiateStorages = () => {
  registeredUsers.save();
  registeredUsers.startAutoPersist();

  checkList.save();
  checkList.startAutoPersist();
};

export default initiateStorages;
