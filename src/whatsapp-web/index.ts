/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-misused-promises */

import WAWeb from "whatsapp-web.js";
import {
  handleDisconnect,
  handleMessages,
  handleQr,
  handleReady
} from "./handlers/index.ts";

const { Client, LocalAuth } = WAWeb;

const initWhatsapp = async () => {
  const client = new Client({
    authStrategy: new LocalAuth({
      // Saves the auth status with name `clientId`.
      // MAIN_CLIENT phonenumber: 98937 303 6686
      // MAIN_CLIENT name: BPJSRB
      clientId: "MAIN_CLIENT"
    }),
    puppeteer: {
      executablePath: "/Applications/Chromium.app/Contents/MacOS/Chromium",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }
  });

  // === === === === //

  client.on("qr", handleQr);
  client.on("ready", handleReady);
  client.on("disconnected", handleDisconnect);
  client.on("message", handleMessages);

  // always init after events.
  await client.initialize();
};

export default initWhatsapp;
