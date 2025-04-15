import { nanoid } from "nanoid";
import type WAWebJS from "whatsapp-web.js";
import { Commands, UserPositions } from "../../enums.ts";
import { registeredUsers } from "../../storage-manager/index.ts";
import checkList from "../../storage-manager/storages/checked-list.ts";
import { type CheckInfo, type User } from "../../types.ts";
import coloredText from "../../utilities/colored-text.ts";
import getPhoneNumberFromId from "../../utilities/get-phonenumber-from-id.ts";
import { isCmdDisabled, isPositionValid } from "../../utilities/index.ts";
import { CMD_CHAR, CMD_DELIMITER } from "../config.ts";

const handleMessages = async (message: WAWebJS.Message) => {
  const { body } = message;

  console.log(coloredText(body, "magenta"));

  if (body.startsWith(CMD_CHAR)) {
    const strippedCmd = body.slice(1);
    const args = strippedCmd.split(CMD_DELIMITER);

    const command = args.shift()?.toLowerCase() as Commands;

    const isCommandDisabled = isCmdDisabled(command);

    if (isCommandDisabled) {
      await message.reply("This command is currently disabled!");

      return;
    }

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

        if (!isPositionValid(loweredPosition)) {
          await message.reply(
            `Position is invalid!\n\nValid positions:${allAvailablePosition}`
          );

          break;
        }

        // 989934411603@c.us
        const senderId = message.from;
        const phoneNumber = getPhoneNumberFromId(senderId);
        const user =
          registeredUsers.get<User | undefined>(phoneNumber) ?? false;

        const newUser: User = {
          name: username,
          phoneNumber,
          position: loweredPosition
        };

        registeredUsers.set(phoneNumber, newUser);

        const userInfo = `Phone number: ${phoneNumber}\nUsername: ${username}\nPosition: ${loweredPosition}`;

        if (user) {
          await message.reply(
            `Number already exists, your information got updated!\n\n${userInfo}`
          );
        } else {
          await message.reply(`Successfully registered!\n\n${userInfo}`);
        }

        break;
      }

      case Commands.CHECK: {
        const senderId = message.from;
        const phoneNumber = getPhoneNumberFromId(senderId);
        const user =
          registeredUsers.get<User | undefined>(phoneNumber) ?? false;

        if (!user) {
          await message.reply(
            `Phone number doesnt exist!\n\nPlease register using "${CMD_CHAR}${Commands.REGISTER}".`
          );

          break;
        }

        const time = new Date(Date.now()).toLocaleTimeString();
        const date = new Date(Date.now()).toLocaleDateString();
        const id = nanoid();

        const checkInfo: CheckInfo = { ...user, date, time };

        checkList.set(id, checkInfo);

        await message.reply(
          `Successfully checked!\n\nTime: ${time}\nDate: ${date}\n\n---------------\nID: ${id}`
        );

        break;
      }

      case Commands.USERS: {
        const allRegisteredUsersRecord: Record<string, User> =
          registeredUsers.all();

        let allRegisteredUsers = "";

        Object.entries(allRegisteredUsersRecord).forEach(([_, user], idx) => {
          allRegisteredUsers += `${idx + 1}- ${user.name}, ${user.position}, ${user.phoneNumber}`;
        });

        await message.reply(
          "List of all registered users:\n\n" + `${allRegisteredUsers}`
        );

        break;
      }

      default: {
        await message.reply(
          `Unrecognized command. Try "${CMD_CHAR}${Commands.HELP}".`
        );

        break;
      }
    }
  } else {
    await message.reply(`Try "${CMD_CHAR}${Commands.HELP}".`);
  }
};

export default handleMessages;
