import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "./google.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

async function writeToSheet(values: unknown) {
  // 2025 - 02 - 5;
  const time = new Date(Date.now()).toLocaleTimeString();
  const date = new Date(Date.now()).toLocaleDateString();

  const data = {
    values: [
      ["Name"], // Each cell must be in its own array
      ["Age"],
      ["Location"]
    ]
  };

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1bIcB1_7l5ajl8aJ-blpFSTQqCxBh6dhvDn9dIIx2iCQ";
  const range = "Sheet1!A1";
  const valueInputOption = "USER_ENTERED";

  const resource = { values };

  try {
    // const response = await sheets.spreadsheets.values.update({
    //   spreadsheetId,
    //   range,
    //   valueInputOption,
    //   resource: data
    // });

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption
    });

    return response;
  } catch (error) {
    console.error("error:", error);
  }
}

// (async () => {
//   const writer = await writeToSheet(
//     ["Name", "Age", "Location"],
//     ["Amir", 24, "Gonbad"],
//     ["Pooya", 25, "Mashhad"]
//   );

//   // console.log(writer);
// })();

export { writeToSheet };
