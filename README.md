# Clash Royale Discord Bot

A feature-rich Discord bot for viewing and comparing Clash Royale player statistics. Users can login with their player tags and view detailed stats, decks, and compare with other players.

## Features

- 🔐 **Player Login System** - Login with your Clash Royale player tag
- 📊 **Detailed Statistics** - View comprehensive player stats including trophies, win rates, donations, etc.
- 🃏 **Deck Information** - View current deck with card levels and elixir costs
- ⚔️ **Player Comparison** - Compare stats between two players
- 👥 **Server Integration** - See all logged-in players in your Discord server
- 🎨 **Beautiful Embeds** - Rich, colorful Discord embeds with all information
- 🔘 **Interactive Buttons** - Quick access to deck view and stats refresh

## Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `!cr login <player_tag>` | Login with your Clash Royale player tag | `!cr login #V0VCP2909` |
| `!cr logout` | Logout from your account | `!cr logout` |
| `!cr stats` | View your stats (requires login) | `!cr stats` |
| `!cr stats <player_tag>` | View another player's stats | `!cr stats #V0VCP2909` |
| `!cr deck` | View your current deck (requires login) | `!cr deck` |
| `!cr deck <player_tag>` | View another player's deck | `!cr deck #V0VCP2909` |
| `!cr compare <player_tag>` | Compare your stats with another player | `!cr compare #V0VCP2909` |
| `!cr compare <player1> <player2>` | Compare two players | `!cr compare #V0VCP2909 #ABC123` |
| `!cr players` | List all logged-in players in the server | `!cr players` |
| `!cr help` | Show help message | `!cr help` |

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- A Discord Bot Token
- A Clash Royale API Token

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Discord Bot Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" section
4. Create a bot and copy the token
5. **Enable Message Content Intent** (this is required for the bot to read messages)

### 3. Get Clash Royale API Token

1. Go to [Clash Royale Developer Portal](https://developer.clashroyale.com)
2. Create an account and log in
3. Create a new API key
4. Copy the token

### 4. Configure the Bot

**Option A: Use the setup script (recommended)**
```bash
npm run setup
```

**Option B: Manual configuration**
Edit the `config.js` file and replace the placeholder values:

```javascript
export const config = {
  // Your Clash Royale API Token
  CLASH_API_TOKEN: "your_clash_royale_api_token_here",
  
  // Your Discord Bot Token
  DISCORD_BOT_TOKEN: "your_discord_bot_token_here",
  
  // Bot prefix (you can change this)
  PREFIX: "!cr",
  
  // Embed colors (optional)
  COLORS: {
    PRIMARY: 0x00ff00,
    SUCCESS: 0x00ff00,
    ERROR: 0xff0000,
    WARNING: 0xffff00,
    INFO: 0x0099ff
  }
};
```

### 5. Invite Bot to Your Server

1. Go to your Discord application's OAuth2 section
2. Select "bot" scope
3. Select the following permissions:
   - Send Messages
   - Embed Links
   - Use Slash Commands
   - Read Message History
4. Copy the generated invite link and use it to invite the bot to your server

### 6. Run the Bot

```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Usage Examples

### Basic Usage

1. **Login with your player tag:**
   ```
   !cr login #V0VCP2909
   ```

2. **View your stats:**
   ```
   !cr stats
   ```

3. **View your current deck:**
   ```
   !cr deck
   ```

4. **Compare with another player:**
   ```
   !cr compare #ABC123
   ```

### Advanced Usage

- **View any player's stats without logging in:**
  ```
  !cr stats #V0VCP2909
  ```

- **Compare two specific players:**
  ```
  !cr compare #V0VCP2909 #ABC123
  ```

- **See all logged-in players in your server:**
  ```
  !cr players
  ```

## Features in Detail

### Player Statistics
- Current and best trophies
- Win/loss record and win rate
- Three crown wins
- Donations given and received
- Star points and experience level
- Current arena
- Clan information

### Deck Information
- All 8 cards in current deck
- Card levels and evolution status
- Elixir costs
- Card rarities
- Average elixir cost

### Player Comparison
- Side-by-side comparison of key stats
- Trophy counts
- Win rates
- Three crown wins
- Donation totals
- Star points
- Player levels

## Error Handling

The bot includes comprehensive error handling for:
- Invalid player tags
- API rate limits
- Network errors
- Missing login credentials
- Invalid commands

## Security Features

- Player tag validation
- API error handling
- User authentication checks
- Safe error messages

## Troubleshooting

### "Used disallowed intents" Error
If you get this error, make sure you have enabled the **Message Content Intent** in your Discord application:
1. Go to your Discord application
2. Navigate to the "Bot" section
3. Scroll down to "Privileged Gateway Intents"
4. Enable "Message Content Intent"

### Bot Not Responding
1. Check that your bot token is correct
2. Ensure the bot has proper permissions in your Discord server
3. Verify that the bot is online in your server
4. Check the console for error messages

### API Errors
1. Verify your Clash Royale API token is valid
2. Check that player tags are in the correct format
3. Ensure you haven't exceeded API rate limits

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this bot for your own Discord servers.

## Support

If you encounter any issues:
1. Check that your API tokens are correct
2. Ensure the bot has proper permissions in your Discord server
3. Verify that the Clash Royale player tags are valid
4. Check the console for error messages

## Changelog

### v1.0.0
- Initial release
- Player login/logout system
- Stats viewing and comparison
- Deck information
- Interactive buttons
- Beautiful Discord embeds
