import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: Object.values(GatewayIntentBits)
});

client.once("ready", () => {
  console.log(`${client.user?.tag} is online!`);
});

client.login(process.env.TOKEN);
