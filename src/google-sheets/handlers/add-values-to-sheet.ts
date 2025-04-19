import { google } from "googleapis";
import { coloredText } from "../../utilities/index.ts";
import { AUTH, SPREADSHEETID } from "../constants.ts";
import type { AddValuesProps } from "../types.ts";

const addValuesToSheet = async (props: AddValuesProps) => {
  const { method, sheetName, sheetRange, values } = props;

  const sheets = google.sheets({ version: "v4", auth: AUTH });

  // "Attendance!A2:E"
  const range = `${sheetName}!${sheetRange}`;

  const valueInputOption = "USER_ENTERED";

  const options = {
    spreadsheetId: SPREADSHEETID,
    range,
    valueInputOption,
    requestBody: {
      values
    }
  };

  if (method === "append") {
    await sheets.spreadsheets.values.append(options);
  } else {
    await sheets.spreadsheets.values.update(options);
  }

  console.log(coloredText(`Cells added successfully!`, "green"));
};

export default addValuesToSheet;
