# 🏆 Clash Royale Discord Bot

## 🤖 **Bot Description**

The Clash Royale Discord Bot allows Discord server members to link their Clash Royale accounts and compare stats with other players in the server. View detailed player statistics, deck information, and competitive comparisons through an intuitive Discord interface.

### ✨ **Key Features**
- **🔐 Account Linking**: Link your Discord account to your Clash Royale player tag
- **📊 Real-time Stats**: View detailed player statistics including trophies, win rates, and achievements
- **🃏 Deck Analysis**: See current deck compositions with card levels and elixir costs
- **⚔️ Player Comparisons**: Compare your stats with other Discord users in the server
- **👥 Server Integration**: See which Discord users are linked to which Clash Royale accounts
- **🎯 Interactive Buttons**: Quick access to deck viewing, stats refresh, and comparisons

---

## 📋 **Commands Reference**

### 🔐 **Account Management**

#### `!cr login <player_tag>`
**Description**: Link your Discord account to your Clash Royale player tag  
**Usage**: `!cr login V0VCP2909` or `!cr login #V0VCP2909`  
**Example**: `!cr login V0VCP2909`  
**Notes**: 
- Player tags can be found in your Clash Royale profile
- Only one Discord account can be linked to a Clash Royale account at a time

#### `!cr logout`
**Description**: Unlink your Discord account from your Clash Royale account  
**Usage**: `!cr logout`  
**Example**: `!cr logout`  
**Notes**: This will remove your account link and you'll need to login again

---

### 📊 **Statistics & Information**

#### `!cr stats`
**Description**: View your own Clash Royale statistics  
**Usage**: `!cr stats`  
**Example**: `!cr stats`  
**Notes**: You must be logged in first to use this command

#### `!cr stats <player_tag>`
**Description**: View statistics for any Clash Royale player  
**Usage**: `!cr stats V0VCP2909`  
**Example**: `!cr stats V0VCP2909`  
**Notes**: You don't need to be logged in to view other players' stats

#### `!cr stats @username`
**Description**: View statistics for a logged-in Discord user  
**Usage**: `!cr stats @tyty0310`  
**Example**: `!cr stats @tyty0310`  
**Notes**: The mentioned Discord user must be logged in with their Clash Royale account

#### `!cr deck`
**Description**: Generate deck image  
**Usage**: `!cr deck`  
**Example**: `!cr deck`  
**Notes**: Generates a visual deck image with card levels, elixir costs, and average deck elixir

#### `!cr deck <player_tag>`
**Description**: Generate deck image for any player  
**Usage**: `!cr deck V0VCP2909`  
**Example**: `!cr deck V0VCP2909`  
**Notes**: Useful for analyzing opponents or teammates

#### `!cr deck @username`
**Description**: Generate deck image for a logged-in Discord user  
**Usage**: `!cr deck @tyty0310`  
**Example**: `!cr deck @tyty0310`  
**Notes**: The mentioned Discord user must be logged in with their Clash Royale account

---

### ⚔️ **Player Comparisons**

#### `!cr compare @username`
**Description**: Compare your stats with another Discord user in the server  
**Usage**: `!cr compare @tyty0310`  
**Example**: `!cr compare @tyty0310`  
**Notes**: 
- Both you and the mentioned user must be logged in
- Shows side-by-side comparison of all major stats

#### `!cr compare @user1 @user2`
**Description**: Compare two Discord users' stats with each other  
**Usage**: `!cr compare @tyty0310 @anotherUser`  
**Example**: `!cr compare @tyty0310 @anotherUser`  
**Notes**: 
- Both mentioned users must be logged in
- You don't need to be logged in to compare other users
- Perfect for settling debates about who's better!

---

### 👥 **Server Management**

#### `!cr players`
**Description**: List all Discord users currently logged in with their Clash Royale accounts  
**Usage**: `!cr players`  
**Example**: `!cr players`  
**Notes**: 
- Shows player names, tags, Discord usernames, and login times
- Useful for seeing who's active in your server
- No login required to view this list

---

### ❓ **Help & Information**

#### `!cr help`
**Description**: Display help message with all available commands  
**Usage**: `!cr help`  
**Example**: `!cr help`  
**Notes**: Always available, no login required

---

## 🎮 **Interactive Features**

### 📱 **Button Interactions**
When you view stats, the bot provides interactive buttons:

- **🃏 View Deck**: Instantly view the player's current deck
- **⚔️ Compare**: Open a modal to compare with another Discord user
- **🔄 Refresh**: Get the latest stats from the Clash Royale API

### 📝 **Modal Forms**
- **Compare Modal**: Enter a Discord username to compare stats with
- **Input Validation**: Real-time checking for valid usernames and login status

---

## 📈 **Statistics Displayed**

### 🏆 **Player Stats**
- **Level & Arena**: Current player level and arena name
- **Trophies**: Current and best trophy counts
- **Battle Stats**: Wins, losses, and win rate percentage
- **Three Crown Wins**: Total three-crown victories
- **Donations**: Cards given and received
- **Star Points**: Total star points earned
- **Clan Information**: Current clan name and tag (if applicable)

### 🃏 **Deck Information**
- **Visual Deck Image**: Beautiful deck layout with all 8 cards
- **Card List**: All 8 cards in current deck
- **Card Levels**: Individual card levels displayed prominently
- **Elixir Costs**: Cost for each card
- **Rarity**: Card rarity information with color coding
- **Average Elixir**: Calculated average elixir cost
- **Evolution Status**: Shows if cards are evolved

### ⚔️ **Comparison Data**
- **Side-by-side Stats**: All major statistics compared
- **Discord Users**: Shows which Discord accounts are linked
- **Visual Indicators**: Easy to see who has better stats in each category

---

## 🚀 **Getting Started**

### 1. **First Time Setup**
1. Find your Clash Royale player tag in your profile
2. Use `!cr login <your_player_tag>` to link your account
3. Verify the login was successful
4. Start exploring your stats with `!cr stats`

### 2. **Comparing with Friends**
1. Make sure your friend is also logged in with `!cr login <their_tag>`
2. Use `!cr compare @their_username` to compare stats
3. Or let them compare with you using `!cr compare @your_username`

### 3. **Server Management**
1. Use `!cr players` to see who's active
2. Encourage friends to login with their Clash Royale accounts
3. Organize friendly competitions and comparisons

---

## 💡 **Tips & Best Practices**

### 🎯 **For Users**
- **Keep Your Tag Handy**: Save your player tag somewhere for easy access
- **Regular Updates**: Use the refresh button to get the latest stats
- **Compare Strategically**: Use comparisons to learn from better players
- **Deck Analysis**: Study other players' decks to improve your own

---

## 🆘 **Troubleshooting**

### ❌ **Common Issues**

**"Invalid player tag format"**
- Make sure you're using the correct player tag from your Clash Royale profile
- Player tags are 8-9 characters long and contain specific characters

**"This Clash Royale account is already logged in by Discord user..."**
- Only one Discord account can be linked to a Clash Royale account
- Ask the other user to logout first, or use a different account

**"Rate limit exceeded"**
- Wait 60 seconds before making another request
- The limit is 3 requests per minute per user

**"Could not find Discord user..."**
- Make sure you're using the correct Discord username
- The user must be in the same server as the bot

**"You are not logged in"**
- Use `!cr login <player_tag>` to link your account first
- Make sure you're using the correct player tag

---

## 📞 **Support & Feedback**

If you encounter any issues or have suggestions for improvements:

1. **Check the help command**: `!cr help`
2. **Review this documentation**: All commands and features are listed above
3. **Contact the bot owner**: For technical issues or feature requests

---

*This bot is designed to enhance your Clash Royale Discord community experience by providing easy access to player statistics and fostering friendly competition among server members.*
