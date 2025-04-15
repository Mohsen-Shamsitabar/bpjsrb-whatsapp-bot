import { UserPositions } from "../enums.ts";

const isPositionValid = (position: string): position is UserPositions => {
  return (
    typeof position === "string" &&
    Object.values(UserPositions).includes(position as UserPositions)
  );
};

export default isPositionValid;
