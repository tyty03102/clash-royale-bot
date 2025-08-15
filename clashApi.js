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

      // Debug: Log the structure of the first battle to understand the format
      if (battleLog.length > 0) {
        console.log('Battle log structure example:', JSON.stringify(battleLog[0], null, 2));
      }

      // Find the most recent battle where the player has deck data
      for (let battle of battleLog) {
        // The battle log structure can vary, so we need to check different possible structures
        let playerDeck = null;
        let gameMode = 'Unknown';
        let battleTime = battle.battleTime;

        // Check if this is a 1v1 battle
        if (battle.team && battle.team.length > 0) {
          const playerInTeam = battle.team.find(member => member.tag === playerTag);
          if (playerInTeam && playerInTeam.deck) {
            playerDeck = playerInTeam.deck;
            gameMode = battle.gameMode?.name || 'Ladder';
          }
        }
        
        // Check opponent team if not found in team
        if (!playerDeck && battle.opponent && battle.opponent.length > 0) {
          const playerInOpponent = battle.opponent.find(member => member.tag === playerTag);
          if (playerInOpponent && playerInOpponent.deck) {
            playerDeck = playerInOpponent.deck;
            gameMode = battle.gameMode?.name || 'Ladder';
          }
        }

        // Check if this is a 2v2 battle or other format
        if (!playerDeck && battle.team1 && battle.team1.length > 0) {
          const playerInTeam1 = battle.team1.find(member => member.tag === playerTag);
          if (playerInTeam1 && playerInTeam1.deck) {
            playerDeck = playerInTeam1.deck;
            gameMode = battle.gameMode?.name || '2v2';
          }
        }

        if (!playerDeck && battle.team2 && battle.team2.length > 0) {
          const playerInTeam2 = battle.team2.find(member => member.tag === playerTag);
          if (playerInTeam2 && playerInTeam2.deck) {
            playerDeck = playerInTeam2.deck;
            gameMode = battle.gameMode?.name || '2v2';
          }
        }

        // If we found a deck, return it
        if (playerDeck && playerDeck.length === 8) {
          return {
            deck: playerDeck,
            battleTime: battleTime,
            gameMode: gameMode,
            battleType: battle.type || 'Unknown'
          };
        }
      }

      // If we still haven't found a deck, try a more flexible approach
      // Look for any deck data in the battle log
      for (let battle of battleLog) {
        // Try to find deck data anywhere in the battle object
        const battleStr = JSON.stringify(battle);
        if (battleStr.includes('"deck"')) {
          console.log('Found deck data in battle, but structure is unexpected:', battleStr.substring(0, 500));
        }
      }

      throw new Error('No recent deck found in battle history. The player may not have played any recent battles, may have a private profile, or the battle log structure is not supported.');
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
