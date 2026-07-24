import { ChatInputCommandInteraction } from "discord.js";

export default {
  data: {
    name: "daily",
    description: "Get your daily reward"
  },

  async execute(interaction: ChatInputCommandInteraction) {

    console.log("DAILY WORKING");

    await interaction.reply("🎁 Daily test works!");

  }
};
