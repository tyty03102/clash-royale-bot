// Example configuration file for the Clash Royale Discord Bot
// Copy this file to config.js and fill in your actual tokens

export const config = {
  // Clash Royale API Token (get from https://developer.clashroyale.com)
  CLASH_API_TOKEN: "your_clash_royale_api_token_here",
  
  // Discord Bot Token (get from https://discord.com/developers/applications)
  DISCORD_BOT_TOKEN: "your_discord_bot_token_here",
  
  // Bot prefix for commands
  PREFIX: "!cr",
  
  // Admin role ID (Discord role ID that can use admin commands)
  ADMIN_ROLE_ID: "your_admin_role_id_here",
  
  // Embed colors
  COLORS: {
    PRIMARY: 0x00ff00,    // Green
    SUCCESS: 0x00ff00,    // Green
    ERROR: 0xff0000,      // Red
    WARNING: 0xffff00,    // Yellow
    INFO: 0x0099ff        // Blue
  }
};
