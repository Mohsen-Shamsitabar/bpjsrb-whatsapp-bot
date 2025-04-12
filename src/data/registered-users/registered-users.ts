import JsonStorage from "../json-storage.ts";

const registeredUsers = new JsonStorage({
  filePath: "./registered-users.json",
  prettyPrint: true
});

export default registeredUsers;
