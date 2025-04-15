import { initiateStorages } from "./storage-manager/index.ts";
import initWhatsapp from "./whatsapp-web/index.ts";

initiateStorages();

await initWhatsapp();
