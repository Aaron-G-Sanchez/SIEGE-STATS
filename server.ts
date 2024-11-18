import { Client, Events, GatewayIntentBits } from 'discord.js'
import 'dotenv/config'

const BOT_TOKEN = process.env.BOT_TOKEN

const client: Client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Loggin in as ${readyClient.user.tag}`)
})

client.login(BOT_TOKEN)
