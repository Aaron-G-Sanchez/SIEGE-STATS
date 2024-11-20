import { Client, Collection } from 'discord.js'
import { Command } from './interfaces'

// TODO: change the any to match the value of the exported command file
export class CustomClient extends Client {
  commands: Collection<string, Command>
}
