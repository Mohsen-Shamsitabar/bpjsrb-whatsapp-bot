import type { UserPositions } from "./enums.ts";

// === === === WWEB === === === //

export type User = {
  // works like ID.
  phoneNumber: string;

  name: string;
  position: UserPositions;
};

export type UsersMap = Map<string, User>;
export type UsersRecord = Record<string, User>;
