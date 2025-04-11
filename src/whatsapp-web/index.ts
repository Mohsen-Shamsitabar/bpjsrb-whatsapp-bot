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
      // is saves the auth status with name `clientId`.
      clientId: "CLIENT_1"
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
