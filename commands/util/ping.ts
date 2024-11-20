import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export const command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('Pong!')
  }
}
