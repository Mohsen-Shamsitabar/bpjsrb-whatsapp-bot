import { type SheetNames } from "./enums.ts";

export type ReadValuesProps = {
  sheetName: SheetNames;
  sheetRange: string;
};

export type AddValuesProps = ReadValuesProps & {
  values: unknown[][];
  method: "update" | "append";
};
