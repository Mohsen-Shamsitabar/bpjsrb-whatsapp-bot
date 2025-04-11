import qrcTerminal from "qrcode-terminal";

const handleQr = (qr: string) => {
  console.warn("QR_CODE generated!", qr);

  qrcTerminal.generate(qr, { small: true });
};

export default handleQr;
