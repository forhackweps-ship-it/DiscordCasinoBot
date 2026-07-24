import "dotenv/config";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import ping from "./commands/ping";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

const commands = new Collection();

commands.set(ping.name, ping);

client.once("ready", () => {
  console.log(`${client.user?.tag} is online!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) return;

  await command.execute(interaction);
});

client.login(process.env.TOKEN);
