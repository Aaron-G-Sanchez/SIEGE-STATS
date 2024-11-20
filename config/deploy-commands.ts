import fs from 'fs'
import path from 'path'
import { REST, Routes } from 'discord.js'
import 'dotenv/config'
import { Command } from '../utils/interfaces'

const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env

const commands: Command[] = []

const foldersPath = path.join(__dirname, '..', 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder)
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts'))

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ('data' in command.command && 'execute' in command.command) {
      commands.push(command.command.data.toJSON())
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      )
    }
  }
}

const rest = new REST().setToken(BOT_TOKEN!)

const deploy = async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )

    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID!, GUILD_ID!),
      { body: commands }
    )

    console.log(
      `Successfully reloaded ${commands.length} application (/) commands.`
    )
  } catch (err) {
    console.error(err)
  }
}

await deploy()
