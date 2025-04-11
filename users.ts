import { type User } from "./types.ts";

const loggedUsers = new Map<User["phoneNumber"], User>();

export default loggedUsers;
