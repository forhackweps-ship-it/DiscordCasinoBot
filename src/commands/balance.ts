import { ChatInputCommandInteraction } from "discord.js";

export default {
  data: {
    name: "balance",
    description: "Show your money"
  },

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("💰 Your balance: 1000");
  }
};
