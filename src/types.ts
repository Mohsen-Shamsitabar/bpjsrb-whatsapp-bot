import type { UserPositions } from "./enums.ts";

// === === === WWEB === === === //

export type User = {
  phoneNumber: string;

  name: string;
  position: UserPositions;
};

export type CheckInfo = User & {
  date: string;
  time: string;
};
