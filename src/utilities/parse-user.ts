import type { User } from "../types";

const parseUser = (user: User) => [user.phoneNumber, user.name, user.position];

export default parseUser;
