import { google } from "googleapis";
import { coloredText } from "../../utilities/index.ts";
import { AUTH, SPREADSHEETID } from "../constants.ts";
import type { ReadValuesProps } from "../types.ts";

const readFromSheet = async (props: ReadValuesProps) => {
  const { sheetName, sheetRange } = props;

  const sheets = google.sheets({ version: "v4", auth: AUTH });

  // "Attendance!A2:E"
  const range = `${sheetName}!${sheetRange}`;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEETID,
    range
  });

  const rows = res.data.values;

  if (!rows || rows.length === 0) {
    console.error(coloredText("No data found.", "red"));
    return;
  }

  rows.forEach(row => {
    console.log(row);
  });
};

export default readFromSheet;
