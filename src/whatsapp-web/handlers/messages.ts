import type WAWebJS from "whatsapp-web.js";
import type { Command } from "../../types.ts";
import { CMD_CHAR, CMD_DELIMITER } from "../config.ts";

const handleMessages = async (message: WAWebJS.Message) => {
  const { body } = message;

  console.log(body);

  if (body.startsWith(CMD_CHAR)) {
    const strippedCmd = body.slice(1);
    const [command, args] = strippedCmd.split(CMD_DELIMITER) as [
      Command,
      unknown
    ];

    switch (command) {
      case "help": {
        await message.reply(`
          Available commands:\n
          "/ping"\n
          "/login".`);

        break;
      }

      case "ping": {
        await message.reply("pong");

        break;
      }

      case "login": {
        // 989934411603@c.us
        const senderId = message.from;

        const phoneNumber = senderId.replace("@c.us", "").replace("@g.us", "");

        break;
      }

      default: {
        await message.reply(`Unrecognized command. Try "${CMD_CHAR}help".`);

        break;
      }
    }
  }
};

export default handleMessages;
