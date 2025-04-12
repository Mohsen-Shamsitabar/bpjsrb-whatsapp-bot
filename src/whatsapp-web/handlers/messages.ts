import type WAWebJS from "whatsapp-web.js";
import { Commands } from "../../enums.ts";
import checkPositionValidity from "../../utilities/check-position-validity.ts";
import { CMD_CHAR, CMD_DELIMITER } from "../config.ts";

const handleMessages = async (message: WAWebJS.Message) => {
  const { body } = message;

  console.log(body);

  if (body.startsWith(CMD_CHAR)) {
    const strippedCmd = body.slice(1);
    const args = strippedCmd.split(CMD_DELIMITER);

    const command = args.shift() as Commands;

    switch (command) {
      case Commands.HELP: {
        await message.reply(`
          Available commands:\n
          "/${Commands.PING}"\n
          "/${Commands.REGISTER}".`);

        break;
      }

      case Commands.PING: {
        await message.reply("pong");

        break;
      }

      case Commands.REGISTER: {
        if (args.length !== 2) {
          await message.reply(`
            Invalid arguments.\n
            Example input: /${Commands.REGISTER} "MohsenShamsitabr" "hamyar".`);

          break;
        }

        const [username, position] = args as [string, string];
        const loweredPosition = position.toLowerCase();

        const isPositionValid = checkPositionValidity(loweredPosition);

        if (!isPositionValid) {
          await message.reply(`
            Position is invalid!\n
            You entered ${position}`);

          break;
        }

        // 989934411603@c.us
        const senderId = message.from;
        const phoneNumber = senderId.replace("@c.us", "").replace("@g.us", "");

        console.log({ phoneNumber, username, loweredPosition });

        break;
      }

      default: {
        await message.reply(
          `Unrecognized command. Try "${CMD_CHAR}${Commands.HELP}".`
        );

        break;
      }
    }
  }
};

export default handleMessages;
