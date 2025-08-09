import fs from 'fs/promises';
import path from 'path';

// User Manager for storing Discord user -> Clash Royale player mappings
export class UserManager {
  constructor() {
    this.users = new Map(); // Discord User ID -> Player Data
    this.dataFile = 'userData.json';
    this.loadUsersFromFile();
  }

  // Login a user with their Clash Royale player tag
  async loginUser(discordUserId, playerTag, clashAPI, discordUser = null) {
    try {
      // Validate player tag
      if (!clashAPI.validatePlayerTag(playerTag)) {
        throw new Error("Invalid player tag format. Player tags should be 8-9 characters long.");
      }

      // Check if this player tag is already logged in by another user
      const existingUser = this.getDiscordUserByPlayerTag(playerTag);
      if (existingUser && existingUser.discordUserId !== discordUserId) {
        throw new Error(`This Clash Royale account is already logged in by Discord user **${existingUser.discordUsername}**. Only one Discord account can be linked to a Clash Royale account at a time.`);
      }

      // Fetch player data to verify the tag is valid
      const playerStats = await clashAPI.getPlayerStats(playerTag);
      
      // Store user data with Discord account information
      this.users.set(discordUserId, {
        playerTag: playerStats.tag,
        playerName: playerStats.name,
        discordUserId: discordUserId,
        discordUsername: discordUser ? discordUser.username : null,
        discordDisplayName: discordUser ? discordUser.displayName : null,
        discordAvatar: discordUser ? discordUser.displayAvatarURL() : null,
        loginTime: new Date(),
        lastUpdated: new Date()
      });

      // Save to file
      await this.saveUsersToFile();

      return playerStats;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  // Logout a user
  async logoutUser(discordUserId) {
    const wasLoggedIn = this.users.has(discordUserId);
    this.users.delete(discordUserId);
    
    if (wasLoggedIn) {
      // Save to file
      await this.saveUsersToFile();
    }
    
    return wasLoggedIn;
  }

  // Check if a user is logged in
  isUserLoggedIn(discordUserId) {
    return this.users.has(discordUserId);
  }

  // Get user's player tag
  getUserPlayerTag(discordUserId) {
    const userData = this.users.get(discordUserId);
    return userData ? userData.playerTag : null;
  }

  // Get user's player name
  getUserPlayerName(discordUserId) {
    const userData = this.users.get(discordUserId);
    return userData ? userData.playerName : null;
  }

  // Get all logged in users
  getAllLoggedInUsers() {
    return Array.from(this.users.entries()).map(([discordUserId, userData]) => ({
      discordUserId,
      playerTag: userData.playerTag,
      playerName: userData.playerName,
      discordUsername: userData.discordUsername,
      discordDisplayName: userData.discordDisplayName,
      discordAvatar: userData.discordAvatar,
      loginTime: userData.loginTime
    }));
  }

  // Update user's last activity
  updateUserActivity(discordUserId) {
    const userData = this.users.get(discordUserId);
    if (userData) {
      userData.lastUpdated = new Date();
      this.users.set(discordUserId, userData);
    }
  }

  // Get user data
  getUserData(discordUserId) {
    return this.users.get(discordUserId);
  }

  // Get Discord user by Clash Royale player tag
  getDiscordUserByPlayerTag(playerTag) {
    for (const [discordUserId, userData] of this.users.entries()) {
      if (userData.playerTag === playerTag) {
        return {
          discordUserId,
          discordUsername: userData.discordUsername,
          discordDisplayName: userData.discordDisplayName,
          discordAvatar: userData.discordAvatar,
          playerName: userData.playerName,
          loginTime: userData.loginTime
        };
      }
    }
    return null;
  }

  // Check if a player tag is already logged in by another user
  isPlayerTagLoggedIn(playerTag) {
    return this.getDiscordUserByPlayerTag(playerTag) !== null;
  }

  // Save users to file
  async saveUsersToFile() {
    try {
      const usersArray = Array.from(this.users.entries()).map(([discordUserId, userData]) => ({
        discordUserId,
        ...userData,
        loginTime: userData.loginTime.toISOString(),
        lastUpdated: userData.lastUpdated.toISOString()
      }));

      await fs.writeFile(this.dataFile, JSON.stringify(usersArray, null, 2));
      console.log(`💾 Saved ${usersArray.length} user(s) to ${this.dataFile}`);
    } catch (error) {
      console.error('Error saving users to file:', error);
    }
  }

  // Load users from file
  async loadUsersFromFile() {
    try {
      const data = await fs.readFile(this.dataFile, 'utf8');
      const usersArray = JSON.parse(data);
      
      this.users.clear();
      usersArray.forEach(userData => {
        this.users.set(userData.discordUserId, {
          ...userData,
          loginTime: new Date(userData.loginTime),
          lastUpdated: new Date(userData.lastUpdated)
        });
      });
      
      console.log(`📂 Loaded ${usersArray.length} user(s) from ${this.dataFile}`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('📂 No existing user data file found. Starting fresh.');
      } else {
        console.error('Error loading users from file:', error);
      }
    }
  }

  // Force reload users from file
  async reloadUsers() {
    await this.loadUsersFromFile();
  }

  // Get file path for user data
  getDataFilePath() {
    return path.resolve(this.dataFile);
  }
}
