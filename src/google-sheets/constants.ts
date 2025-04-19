import { google } from "googleapis";

export const SPREADSHEETID = "1bIcB1_7l5ajl8aJ-blpFSTQqCxBh6dhvDn9dIIx2iCQ";

export const AUTH = new google.auth.GoogleAuth({
  // private file
  keyFile: "./google.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});
