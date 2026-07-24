import "dotenv/config";
import { REST, Routes } from "discord.js";

const commands = [
  {
    name: "ping",
    description: "Check bot response"
  }
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

async function deployCommands() {
  try {
    console.log("Started refreshing application commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands }
    );

    console.log("Successfully reloaded application commands.");
  } catch (error) {
    console.error(error);
  }
}

deployCommands();
