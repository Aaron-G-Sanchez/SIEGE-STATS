import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export interface Command {
  data: SlashCommandBuilder
  execute: (interactions: ChatInputCommandInteraction) => Promise<void>
}
