import fetch from "node-fetch";
import { config } from "./config.js";

export class ClashAPI {
  constructor() {
    this.baseUrl = "https://proxy.royaleapi.dev/v1";
    this.token = config.CLASH_API_TOKEN;
  }

  async getPlayerData(playerTag) {
    try {
      // Remove # if present and add it back for the API call
      const cleanTag = playerTag.replace('#', '');
      const url = `${this.baseUrl}/players/%23${cleanTag}`;

      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${this.token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching player data:", error);
      throw error;
    }
  }

  async getPlayerStats(playerTag) {
    try {
      const playerData = await this.getPlayerData(playerTag);
      
      // Extract relevant stats
      const stats = {
        tag: playerData.tag,
        name: playerData.name,
        expLevel: playerData.expLevel,
        trophies: playerData.trophies,
        bestTrophies: playerData.bestTrophies,
        wins: playerData.wins,
        losses: playerData.losses,
        battleCount: playerData.battleCount,
        threeCrownWins: playerData.threeCrownWins,
        winRate: playerData.battleCount > 0 ? ((playerData.wins / playerData.battleCount) * 100).toFixed(1) : 0,
        donations: playerData.donations,
        donationsReceived: playerData.donationsReceived,
        totalDonations: playerData.totalDonations,
        warDayWins: playerData.warDayWins,
        clanCardsCollected: playerData.clanCardsCollected,
        arena: playerData.arena,
        clan: playerData.clan,
        currentDeck: playerData.currentDeck,
        cards: playerData.cards, // Add all cards for collection count
        starPoints: playerData.starPoints,
        expPoints: playerData.expPoints,
        totalExpPoints: playerData.totalExpPoints,
        badges: playerData.badges,
        achievements: playerData.achievements,
        // Add additional data for enhanced stats
        challengeCardsWon: playerData.challengeCardsWon || 0,
        challengeMaxWins: playerData.challengeMaxWins || 0,
        tournamentCardsWon: playerData.tournamentCardsWon || 0,
        tournamentBattleCount: playerData.tournamentBattleCount || 0
      };

      return stats;
    } catch (error) {
      console.error("Error getting player stats:", error);
      throw error;
    }
  }

  async getBattleLog(playerTag) {
    try {
      // Remove # if present and add it back for the API call
      const cleanTag = playerTag.replace('#', '');
      const url = `${this.baseUrl}/players/%23${cleanTag}/battlelog`;

      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${this.token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching battle log:", error);
      throw error;
    }
  }

  async getChallenges() {
    try {
      const url = `${this.baseUrl}/challenges`;

      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${this.token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching challenges:", error);
      throw error;
    }
  }

  async getMostRecentDeck(playerTag) {
    try {
      const battleLog = await this.getBattleLog(playerTag);
      
      if (!battleLog || battleLog.length === 0) {
        throw new Error('No battle data found for this player');
      }

      // Find the most recent battle where the player was the team leader
      for (let battle of battleLog) {
        // Check if player was in team 1 (usually the player's team)
        if (battle.team && battle.team.length > 0) {
          const playerInTeam = battle.team.find(member => member.tag === playerTag);
          if (playerInTeam && playerInTeam.deck) {
            return {
              deck: playerInTeam.deck,
              battleTime: battle.battleTime,
              gameMode: battle.gameMode?.name || 'Unknown',
              battleType: battle.type || 'Unknown'
            };
          }
        }
        
        // Also check opponent team in case player was in team 2
        if (battle.opponent && battle.opponent.length > 0) {
          const playerInOpponent = battle.opponent.find(member => member.tag === playerTag);
          if (playerInOpponent && playerInOpponent.deck) {
            return {
              deck: playerInOpponent.deck,
              battleTime: battle.battleTime,
              gameMode: battle.gameMode?.name || 'Unknown',
              battleType: battle.type || 'Unknown'
            };
          }
        }
      }

      throw new Error('No recent deck found in battle history');
    } catch (error) {
      console.error("Error getting most recent deck:", error);
      throw error;
    }
  }

  // Helper method to validate player tag format
  validatePlayerTag(tag) {
    // Clash Royale player tags are 8-9 characters long and contain only specific characters
    const cleanTag = tag.replace('#', '');
    return /^[0289PYLQGRJCUV]+$/.test(cleanTag) && cleanTag.length >= 8 && cleanTag.length <= 9;
  }
}
