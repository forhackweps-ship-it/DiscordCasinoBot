import { ChatInputCommandInteraction } from "discord.js";
import db from "../database/db";

export default {
  data: {
    name: "balance",
    description: "Show your money"
  },

  async execute(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply();

    let user = db.prepare(
      "SELECT * FROM users WHERE id = ?"
    ).get(interaction.user.id) as any;

    if (!user) {
      db.prepare(
        "INSERT INTO users (id, balance) VALUES (?, ?)"
      ).run(
        interaction.user.id,
        1000
      );

      user = {
        balance: 1000
      };
    }

    await interaction.editReply(
      `💰 Your balance: ${user.balance}`
    );
  }
};
