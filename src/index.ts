import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  Collection
} from "discord.js";

import ping from "./commands/ping";
import balance from "./commands/balance";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

const commands = new Collection<string, any>();

commands.set(ping.data.name, ping);

client.once("ready", () => {
  console.log(`${client.user?.tag} is online!`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) return;

  await command.execute(interaction);
});

client.login(process.env.TOKEN);
