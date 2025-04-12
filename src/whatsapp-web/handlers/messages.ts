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
        await message.reply(
          `Available commands:\n"${CMD_CHAR}${Commands.PING}"\n"${CMD_CHAR}${Commands.REGISTER}".`
        );

        break;
      }

      case Commands.PING: {
        await message.reply("pong");

        break;
      }

      case Commands.REGISTER: {
        if (args.length !== 2) {
          await message.reply(
            `Invalid arguments.\n-_-_-_-_-_-_-\nSyntax:\n${CMD_CHAR}${Commands.REGISTER} <username> <position>\n\nExample input:\n${CMD_CHAR}${Commands.REGISTER} MohsenShamsitabr hamyar.`
          );

          break;
        }

        const [username, position] = args as [string, string];
        const loweredPosition = position.toLowerCase();

        const isPositionValid = checkPositionValidity(loweredPosition);

        if (!isPositionValid) {
          await message.reply(
            `Position is invalid!\n\nValid positions:\n1-${UserPositions.ASSISTANT}\n2-${UserPositions.COLLABORATOR}\n3-${UserPositions.COMPANION}\n\nYour input was ${position}`
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

        if (phoneExists) {
          await message.reply(
            `Phonenumber already exists, your information got updated!\n\nPhoneNumber: ${phoneNumber}\nUsername: ${username}\nPosition: ${loweredPosition}`
          );
        } else {
          await message.reply(
            `Successfully registered!\n\nPhoneNumber: ${phoneNumber}\nUsername: ${username}\nPosition: ${loweredPosition}`
          );
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
