import { DISABLE_CMDS } from "../constants.ts";
import { type Commands } from "../enums.ts";

const isCmdDisabled = (command: Commands) => DISABLE_CMDS.has(command);

export default isCmdDisabled;
