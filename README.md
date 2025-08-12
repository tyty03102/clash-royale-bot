# Clash Royale Discord Bot

A feature-rich Discord bot for viewing and comparing Clash Royale player statistics. Users can login with their player tags and view detailed stats, decks, battle logs, and compare with other players. Now with enhanced admin controls, beautiful deck images, comprehensive battle analysis, and improved user management.

## Features

- 🔐 **Player Login System** - Login with your Clash Royale player tag
- 📊 **Detailed Statistics** - View comprehensive player stats including trophies, win rates, donations, etc.
- 🃏 **Deck Information** - View current deck with card levels and elixir costs
- 🎨 **Beautiful Deck Images** - Generate stunning visual deck layouts with card details
- ⚔️ **Enhanced Battle Logs** - View detailed battle history with comprehensive match analysis
- ⚔️ **Player Comparison** - Compare stats between two players
- 👥 **Server Integration** - See all logged-in players in your Discord server
- 🎨 **Beautiful Embeds** - Rich, colorful Discord embeds with all information
- 🔘 **Interactive Buttons** - Quick access to deck view and stats refresh
- 🛡️ **Admin Controls** - Advanced user management and server administration
- 💾 **Persistent Storage** - User data persists across bot restarts
- ⚡ **Rate Limiting** - Prevents API abuse with intelligent request limiting
- 🔄 **Real-time Updates** - Fresh data from Clash Royale API

## Commands

### User Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `!cr login <player_tag>` | Login with your Clash Royale player tag | `!cr login #V0VCP2909` |
| `!cr logout` | Logout from your account | `!cr logout` |
| `!cr stats` | View your stats (requires login) | `!cr stats` |
| `!cr stats <player_tag>` | View another player's stats | `!cr stats #V0VCP2909` |
| `!cr stats @username` | View stats for a logged-in Discord user | `!cr stats @username` |
| `!cr deck` | Generate deck image (requires login) | `!cr deck` |
| `!cr deck <player_tag>` | Generate deck image for any player | `!cr deck #V0VCP2909` |
| `!cr deck @username` | Generate deck image for a logged-in user | `!cr deck @username` |
| `!cr battles` | View your 5 most recent battles with detailed analysis | `!cr battles` |
| `!cr challenges` | View currently available challenges and tournaments | `!cr challenges` |
| `!cr compare <player_tag>` | Compare your stats with another player | `!cr compare #V0VCP2909` |
| `!cr compare <player1> <player2>` | Compare two players | `!cr compare #V0VCP2909 #ABC123` |
| `!cr compare @username` | Compare with a Discord user | `!cr compare @username` |
| `!cr compare @user1 @user2` | Compare two Discord users | `!cr compare @user1 @user2` |
| `!cr players` | List all logged-in players in the server | `!cr players` |
| `!cr help` | Show help message | `!cr help` |

### Admin Commands

| Command | Description | Usage | Permissions |
|---------|-------------|-------|-------------|
| `!cr adminlogin @username <player_tag>` | Force login a user to a Clash Royale account | `!cr adminlogin @user #ABC123` | Admin Role/Admin |
| `!cr adminlink @username <player_tag>` | Link Discord user to shared Clash Royale account (allows multiple users) | `!cr adminlink @user #ABC123` | Admin Role/Admin |
| `!cr save` | Manually save all user data | `!cr save` | Admin Role/Admin |
| `!cr reload` | Reload user data from storage | `!cr reload` | Admin Role/Admin |

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- A Discord Bot Token
- A Clash Royale API Token
- Canvas library for deck image generation

### 1. Install Dependencies

```bash
npm install
```

**Note**: The bot now requires the `canvas` library for generating beautiful deck images. This will be installed automatically with npm install.

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
  
  // Admin role ID for admin commands (optional but recommended)
  ADMIN_ROLE_ID: "your_admin_role_id_here",
  
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
   - Attach Files (for deck images)
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

4. **View your recent battles:**
   ```
   !cr battles
   ```

5. **View available challenges:**
   ```
   !cr challenges
   ```

6. **Compare with another player:**
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

- **Compare with Discord users:**
  ```
  !cr compare @username
  !cr compare @user1 @user2
  ```

- **See all logged-in players in your server:**
  ```
  !cr players
  ```

### Admin Usage

- **Force login a user to a Clash Royale account:**
  ```
  !cr adminlogin @username #ABC123
  ```

- **Link a Discord user to a shared Clash Royale account (allows multiple users):**
  ```
  !cr adminlink @username #ABC123
  ```

- **Manually save user data:**
  ```
  !cr save
  ```

- **Reload user data from storage:**
  ```
  !cr reload
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

### Enhanced Battle Logs
- **Comprehensive Battle Analysis** - View your 5 most recent battles with detailed information
- **Battle Results** - Victory/Defeat/Draw with crown counts
- **Trophy Progression** - Starting → ending trophies with change indicators
- **Match Details** - Game mode, arena, battle type, league number
- **Player Information** - Names, tags, clans for both players
- **Tower Health** - King and Princess tower hit points for both sides
- **Elixir Management** - Elixir leaked statistics for both players
- **Deck Information** - Complete deck and support card lists
- **Battle Context** - Ladder tournament status, deck selection, hosted match flags
- **Timestamps** - Relative time formatting for easy reading

### Available Challenges
- **Current Challenges** - View all currently available challenges and tournaments
- **Challenge Details** - Name, description, game mode, and format information
- **Prize Information** - Detailed breakdown of rewards for different win counts
- **Time Tracking** - Start and end times for each challenge
- **Challenge Types** - Classic, Grand, Mega Draft, and special event challenges
- **Format Details** - Win/loss limits, casual vs competitive modes

### Deck Information
- **Beautiful Visual Deck Images** - Generate stunning PNG images of player decks
- All 8 cards in current deck with visual layout
- Card levels and evolution status
- Elixir costs for each card
- Card rarities with color coding
- Average elixir cost calculation
- Professional gradient backgrounds and styling

### Player Comparison
- Side-by-side comparison of key stats
- Trophy counts
- Win rates
- Three crown wins
- Donation totals
- Star points
- Player levels

### Interactive Features
- **Deck View Button** - Instantly view deck images
- **Compare Button** - Open comparison modal
- **Refresh Button** - Get latest stats
- **Modal Forms** - Easy input for comparisons
- **Real-time Validation** - Check usernames and login status

### Admin Features
- **Force Login** - Admin can link any user to any Clash Royale account
- **Shared Account Linking** - Admin can link multiple Discord users to the same Clash Royale account
- **Data Management** - Manual save/reload of user data
- **Role-based Access** - Admin commands restricted to specific roles
- **Audit Trail** - Admin actions are logged and marked

## Error Handling

The bot includes comprehensive error handling for:
- Invalid player tags
- API rate limits
- Network errors
- Missing login credentials
- Invalid commands
- Permission violations
- User validation errors

## Security Features

- Player tag validation
- API error handling
- User authentication checks
- Safe error messages
- Rate limiting (3 requests per minute per user)
- Admin role verification
- Secure user data storage

## Rate Limiting

The bot implements intelligent rate limiting:
- **3 requests per minute** per Discord user
- Prevents API abuse and ensures fair usage
- Applies to all commands including admin commands
- Automatic reset after 60 seconds

## Data Persistence

- **Automatic Saving** - User data saved after every login/logout
- **File-based Storage** - Data stored in `userData.json`
- **Restart Recovery** - All user data restored when bot restarts
- **Manual Control** - Admin commands for data management

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

### Deck Image Generation Issues
1. Ensure the `canvas` library is properly installed
2. Check that the bot has write permissions in the deck_images directory
3. Verify sufficient disk space for image generation

### Admin Command Issues
1. Check that `ADMIN_ROLE_ID` is set in your config
2. Verify the role ID is correct and exists in your server
3. Ensure the user has Administrator permissions or the admin role

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
5. Review the admin commands documentation if using admin features

## Changelog

### v1.2.0 (Latest)
- ⚔️ **Enhanced Battle Logs** - Comprehensive battle analysis with detailed match information
- 📊 **Battle Statistics** - Trophy progression, tower health, elixir management
- 🎮 **Match Context** - Game modes, arenas, league numbers, tournament status
- 🃏 **Deck Analysis** - Complete deck and support card information in battle logs
- 🏆 **Player Details** - Names, tags, clans, and performance metrics
- ⏰ **Time Tracking** - Relative timestamps for easy battle history reading
- 🔍 **Battle Metadata** - Hosted matches, deck selection, ladder tournament flags
- 🔗 **Shared Account Management** - Admin command to link multiple Discord users to the same Clash Royale account
- 🏆 **Available Challenges** - View current challenges and tournaments with detailed information

### v1.1.0
- ✨ **New Admin Commands** - Force login, data management, and server administration
- 🎨 **Enhanced Deck Images** - Beautiful visual deck layouts with professional styling
- 💾 **Persistent Storage** - User data persists across bot restarts
- ⚡ **Rate Limiting** - Intelligent request limiting to prevent API abuse
- 🔄 **Interactive Buttons** - Enhanced user experience with deck view and comparison buttons
- 📱 **Modal Forms** - Easy input for player comparisons
- 🛡️ **Role-based Security** - Admin commands restricted to specific roles
- 📊 **Improved User Management** - Better tracking and validation of user accounts
- 🎯 **Enhanced Comparisons** - Support for comparing Discord users directly
- 🔍 **Real-time Validation** - Instant checking of usernames and login status

### v1.0.0
- Initial release
- Player login/logout system
- Stats viewing and comparison
- Deck information
- Interactive buttons
- Beautiful Discord embeds
