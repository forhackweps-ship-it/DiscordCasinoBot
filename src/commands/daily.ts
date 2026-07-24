console.log("DAILY COMMAND WORKING");
import { ChatInputCommandInteraction } from "discord.js";
import db from "../database/db";

export default {
  data: {
    name: "daily",
    description: "Get your daily reward"
  },

  async execute(interaction: ChatInputCommandInteraction) {

    await interaction.deferReply();

    let user = db.prepare(
      "SELECT * FROM users WHERE id = ?"
    ).get(interaction.user.id) as any;

    if (!user) {
      db.prepare(
        "INSERT INTO users (id, balance, lastDaily) VALUES (?, ?, ?)"
      ).run(
        interaction.user.id,
        1000,
        0
      );

      user = {
        balance: 1000,
        lastDaily: 0
      };
    }

    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000;

    if (now - user.lastDaily < cooldown) {
      const hours = Math.ceil(
        (cooldown - (now - user.lastDaily)) / 3600000
      );

      return interaction.editReply(
        `⏳ Come back in ${hours} hours`
      );
    }

    const reward = 500;

    db.prepare(
      "UPDATE users SET balance = balance + ?, lastDaily = ? WHERE id = ?"
    ).run(
      reward,
      now,
      interaction.user.id
    );

    await interaction.editReply(
      `🎁 You received ${reward} coins!`
    );
  }
};
