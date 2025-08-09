#!/usr/bin/env node

import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🤖 Clash Royale Discord Bot Setup');
console.log('================================\n');

async function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setup() {
  try {
    console.log('This setup will help you configure your Clash Royale Discord Bot.\n');
    
    // Get Discord Bot Token
    console.log('📋 Step 1: Discord Bot Token');
    console.log('1. Go to https://discord.com/developers/applications');
    console.log('2. Create a new application');
    console.log('3. Go to the "Bot" section');
    console.log('4. Create a bot and copy the token');
    console.log('5. Enable Message Content Intent\n');
    
    const discordToken = await question('Enter your Discord Bot Token: ');
    
    // Get Clash Royale API Token
    console.log('\n📋 Step 2: Clash Royale API Token');
    console.log('1. Go to https://developer.clashroyale.com');
    console.log('2. Create an account and log in');
    console.log('3. Create a new API key');
    console.log('4. Copy the token\n');
    
    const clashToken = await question('Enter your Clash Royale API Token: ');
    
    // Get bot prefix
    console.log('\n📋 Step 3: Bot Prefix (optional)');
    console.log('This is the prefix for all bot commands (default: !cr)\n');
    
    const prefix = await question('Enter bot prefix (press Enter for default !cr): ') || '!cr';
    
    // Create config file
    const configContent = `// Configuration file for the Clash Royale Discord Bot
export const config = {
  // Clash Royale API Token (get from https://developer.clashroyale.com)
  CLASH_API_TOKEN: "${clashToken}",
  
  // Discord Bot Token (get from https://discord.com/developers/applications)
  DISCORD_BOT_TOKEN: "${discordToken}",
  
  // Bot prefix for commands
  PREFIX: "${prefix}",
  
  // Embed colors
  COLORS: {
    PRIMARY: 0x00ff00,    // Green
    SUCCESS: 0x00ff00,    // Green
    ERROR: 0xff0000,      // Red
    WARNING: 0xffff00,    // Yellow
    INFO: 0x0099ff        // Blue
  }
};
`;

    fs.writeFileSync('config.js', configContent);
    
    console.log('\n✅ Configuration saved successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Invite your bot to your Discord server');
    console.log('2. Run the bot with: npm start');
    console.log('3. Use !cr help to see all available commands');
    
    console.log('\n🔗 To invite your bot:');
    console.log('1. Go to your Discord application\'s OAuth2 section');
    console.log('2. Select "bot" scope');
    console.log('3. Select these permissions: Send Messages, Embed Links, Use Slash Commands, Read Message History');
    console.log('4. Copy the generated invite link');
    
    console.log('\n🎮 Happy gaming!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setup();
