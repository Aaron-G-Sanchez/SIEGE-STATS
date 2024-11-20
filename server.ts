import fs from 'fs'
import path from 'path'
import { CustomClient } from './utils/classes'
import { Collection, Events, GatewayIntentBits } from 'discord.js'
import 'dotenv/config'

const BOT_TOKEN = process.env.BOT_TOKEN

const client: CustomClient = new CustomClient({
  intents: [GatewayIntentBits.Guilds]
})

client.commands = new Collection()

const foldersPath = path.join(__dirname, 'commands')
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
      client.commands.set(command.command.data.name, command.command)
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      )
    }
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logging in as ${readyClient.user.tag}`)
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const command = (interaction.client as CustomClient).commands.get(
    interaction.commandName
  )

  try {
    await command!.execute(interaction)
  } catch (err) {
    console.log(err)
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true
      })
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true
      })
    }
  }
})

client.login(BOT_TOKEN)
