import { ChatInputCommandInteraction } from "discord.js";

export default {
  name: "ping",
  description: "Check bot response",

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("Pong! 🏓");
  }
};
