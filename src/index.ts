import "dotenv/config";

import {
  Client,
  GatewayIntentBits,
  Collection
} from "discord.js";

import ping from "./commands/ping";
import balance from "./commands/balance";
import daily from "./commands/daily";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

const commands = new Collection<string, any>();

commands.set(ping.data.name, ping);
commands.set(balance.data.name, balance);
commands.set(daily.data.name, daily);

client.once("ready", () => {
  console.log(`${client.user?.tag} is online!`);
});

client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  console.log("COMMAND:", interaction.commandName);

  const command = commands.get(interaction.commandName);

  if (!command) {
    console.log("COMMAND NOT FOUND");
    return;
  }

  await command.execute(interaction);

});

client.login(process.env.TOKEN);
