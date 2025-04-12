import type WAWebJS from "whatsapp-web.js";
import { registeredUsers } from "../../data/index.ts";
import { Commands, UserPositions } from "../../enums.ts";
import { type User } from "../../types.ts";
import checkPositionValidity from "../../utilities/check-position-validity.ts";
import coloredText from "../../utilities/colored-text.ts";
import { CMD_CHAR, CMD_DELIMITER } from "../config.ts";

const handleMessages = async (message: WAWebJS.Message) => {
  const { body } = message;

  console.log(coloredText(body, "magenta"));

  if (body.startsWith(CMD_CHAR)) {
    const strippedCmd = body.slice(1);
    const args = strippedCmd.split(CMD_DELIMITER);

    const command = args.shift()?.toLowerCase() as Commands;

    switch (command) {
      case Commands.HELP: {
        if (args.length > 0) {
          await message.reply(
            `"${CMD_CHAR}${Commands.HELP}" expects no arguments, just type "${CMD_CHAR}${Commands.HELP}"`
          );

          break;
        }

        let allAvailableCommands = "";

        Object.values(Commands).forEach(cmd => {
          if (cmd === Commands.HELP) return;

          allAvailableCommands += `\n"${CMD_CHAR}${cmd}"`;
        });

        await message.reply(`Available commands:${allAvailableCommands}`);

        break;
      }

      case Commands.PING: {
        await message.reply("pong");

        break;
      }

      case Commands.REGISTER: {
        let allAvailablePosition = "";

        Object.values(UserPositions).forEach((position, idx) => {
          allAvailablePosition += `\n${idx + 1}-${position}`;
        });

        if (args.length !== 2) {
          await message.reply(
            `Invalid arguments.\n---------------\nSyntax:\n${CMD_CHAR}${Commands.REGISTER} <username> <position>\n\nAvailable positions:${allAvailablePosition}\n---------------\nExample input:\n${CMD_CHAR}${Commands.REGISTER} MohsenShamsitabr ${UserPositions.COLLABORATOR}.`
          );

          break;
        }

        const [username, position] = args as [string, string];
        const loweredPosition = position.toLowerCase();

        const isPositionValid = checkPositionValidity(loweredPosition);

        if (!isPositionValid) {
          await message.reply(
            `Position is invalid!\n\nValid positions:${allAvailablePosition}`
          );

          break;
        }

        // 989934411603@c.us
        const senderId = message.from;
        const phoneNumber = senderId.replace("@c.us", "").replace("@g.us", "");
        const phoneExists = registeredUsers.users.has(phoneNumber);

        const newUser: User = {
          name: username,
          phoneNumber,
          position: loweredPosition
        };

        await registeredUsers.addUser(newUser);

        const userInfo = `PhoneNumber: ${phoneNumber}\nUsername: ${username}\nPosition: ${loweredPosition}`;

        if (phoneExists) {
          await message.reply(
            `Number already exists, your information got updated!\n\n${userInfo}`
          );
        } else {
          await message.reply(`Successfully registered!\n\n${userInfo}`);
        }

        break;
      }

      case Commands.TEST: {
        await message.reply("TESTING!");

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
