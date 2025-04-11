// === === === WWEB === === === //

export type Command = "help" | "ping" | "login";

export type User = {
  // works like ID.
  phoneNumber: string;

  name: string;
  position: string;
};
