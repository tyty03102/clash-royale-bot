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

  // Helper method to validate player tag format
  validatePlayerTag(tag) {
    // Clash Royale player tags are 8-9 characters long and contain only specific characters
    const cleanTag = tag.replace('#', '');
    return /^[0289PYLQGRJCUV]+$/.test(cleanTag) && cleanTag.length >= 8 && cleanTag.length <= 9;
  }
}
