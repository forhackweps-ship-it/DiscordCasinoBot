import "dotenv/config";
import { REST, Routes } from "discord.js";

const commands = [

  {
    name: "ping",
    description: "Check bot response"
  },

  {
    name: "balance",
    description: "Show your money"
  },

  {
    name: "daily",
    description: "Get your daily reward"
  }

];

const rest = new REST({ version: "10" })
  .setToken(process.env.TOKEN!);

async function deploy() {

  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID!),
    {
      body: commands
    }
  );

  console.log("Commands deployed");

}

deploy();
