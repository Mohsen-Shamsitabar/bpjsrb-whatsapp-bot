const getPhoneNumberFromId = (senderId: string) =>
  senderId.replace("@c.us", "").replace("@g.us", "");

export default getPhoneNumberFromId;
