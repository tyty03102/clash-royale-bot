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
| `!cr battles <player_tag>` | View any player's 5 most recent battles | `!cr battles #V0VCP2909` |
| `!cr battles @username` | View a logged-in Discord user's battles | `!cr battles @username` |
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
```

### Advanced Usage

- **View any player's stats without logging in:**
  ```
  !cr stats #V0VCP2909
  ```

- **View any player's battles without logging in:**
  ```
  !cr battles #V0VCP2909
  ```

- **View battles for a logged-in Discord user:**
  ```
  !cr battles @username
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