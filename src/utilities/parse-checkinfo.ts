import type { CheckInfo } from "../types";

const parseCheckinfo = (checkinfo: CheckInfo) => [
  checkinfo.phoneNumber,
  checkinfo.name,
  checkinfo.position,
  checkinfo.date,
  checkinfo.time
];

export default parseCheckinfo;
