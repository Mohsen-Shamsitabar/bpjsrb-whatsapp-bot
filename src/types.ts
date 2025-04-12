import type { UserPositions } from "./enums.ts";

// === === === WWEB === === === //

export type User = {
  // works like ID.
  phoneNumber: string;

  name: string;
  position: UserPositions;
};
