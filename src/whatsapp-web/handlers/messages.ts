import type WAWebJS from "whatsapp-web.js";
import { CMD_CHAR } from "../config.ts";

const handleMessages = async (message: WAWebJS.Message) => {
  const { body } = message;

  console.log("Message Recieved:");
  console.log(body);

  if (body.startsWith(CMD_CHAR)) {
    const splitIdx = body.indexOf("@") < 0 ? undefined : body.indexOf("@");
    const command = body.slice(1, splitIdx);
    const args = body.slice(splitIdx + 1).split("@");

    console.log({ body, command, args, splitIdx });

    switch (command) {
      case "ping": {
        await message.reply("pong");

        break;
      }

      case "help": {
        await message.reply(`
        Available Commands:\n
        1: !ping.`);

        break;
      }

      case "login": {
        // 989934411603@c.us
        const senderId = message.from;

        const phoneNumber = senderId.replace("@c.us", "").replace("@g.us", "");

        await message.reply(`
        Enter your fullname\n
        example: MohsenShamsitabar`);

        break;
      }

      default: {
        await message.reply(
          "Unrecognized command. Try !ping, !hello, or !info."
        );

        break;
      }
    }
  }
};

export default handleMessages;
