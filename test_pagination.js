import { EmbedBuilder } from './embedBuilder.js';

// Test the pagination system
const embedBuilder = new EmbedBuilder();

// Mock battle data (similar to the API response)
const mockBattles = [
  {
    battleTime: "20250812T000914.000Z",
    team: [{
      name: "Player1",
      crowns: 3,
      startingTrophies: 3925,
      trophyChange: 30,
      cards: [
        { name: "Goblin Barrel", evolutionLevel: 1, starLevel: 1 },
        { name: "Dart Goblin", evolutionLevel: 0, starLevel: 0 },
        { name: "Goblin Gang", evolutionLevel: 0, starLevel: 0 },
        { name: "Rocket", evolutionLevel: 0, starLevel: 0 },
        { name: "Knight", evolutionLevel: 0, starLevel: 0 },
        { name: "Ice Spirit", evolutionLevel: 0, starLevel: 0 },
        { name: "Barbarian Barrel", evolutionLevel: 0, starLevel: 0 },
        { name: "Cannon", evolutionLevel: 0, starLevel: 0 }
      ],
      supportCards: [{ name: "Tower Princess" }],
      elixirLeaked: 0.34
    }],
    opponent: [{
      name: "Player2",
      crowns: 0,
      startingTrophies: 3925,
      trophyChange: -30,
      cards: [
        { name: "Giant", evolutionLevel: 0, starLevel: 0 },
        { name: "Minions", evolutionLevel: 0, starLevel: 0 },
        { name: "Prince", evolutionLevel: 0, starLevel: 0 },
        { name: "Dark Prince", evolutionLevel: 0, starLevel: 0 },
        { name: "Mega Minion", evolutionLevel: 0, starLevel: 0 },
        { name: "Fireball", evolutionLevel: 0, starLevel: 0 },
        { name: "Arrows", evolutionLevel: 0, starLevel: 0 },
        { name: "Zap", evolutionLevel: 0, starLevel: 0 }
      ],
      supportCards: [{ name: "Tower Princess" }],
      elixirLeaked: 1.38
    }],
    gameMode: { name: "Ladder" },
    arena: { name: "Spooky Town" },
    isLadderTournament: false
  },
  {
    battleTime: "20250812T000611.000Z",
    team: [{
      name: "Player1",
      crowns: 3,
      startingTrophies: 3895,
      trophyChange: 30,
      cards: [
        { name: "Goblin Barrel", evolutionLevel: 1, starLevel: 1 },
        { name: "Dart Goblin", evolutionLevel: 0, starLevel: 0 },
        { name: "Goblin Gang", evolutionLevel: 0, starLevel: 0 },
        { name: "Rocket", evolutionLevel: 0, starLevel: 0 },
        { name: "Knight", evolutionLevel: 0, starLevel: 0 },
        { name: "Ice Spirit", evolutionLevel: 0, starLevel: 0 },
        { name: "Barbarian Barrel", evolutionLevel: 0, starLevel: 0 },
        { name: "Cannon", evolutionLevel: 0, starLevel: 0 }
      ],
      supportCards: [{ name: "Tower Princess" }],
      elixirLeaked: 1.78
    }],
    opponent: [{
      name: "Player3",
      crowns: 0,
      startingTrophies: 3895,
      trophyChange: -30,
      cards: [
        { name: "P.E.K.K.A", evolutionLevel: 0, starLevel: 0 },
        { name: "Witch", evolutionLevel: 0, starLevel: 0 },
        { name: "Mini P.E.K.K.A", evolutionLevel: 0, starLevel: 0 },
        { name: "Sparky", evolutionLevel: 0, starLevel: 0 },
        { name: "Arrows", evolutionLevel: 0, starLevel: 0 },
        { name: "Zap", evolutionLevel: 0, starLevel: 0 },
        { name: "The Log", evolutionLevel: 0, starLevel: 0 },
        { name: "Giant Snowball", evolutionLevel: 0, starLevel: 0 }
      ],
      supportCards: [{ name: "Dagger Duchess" }],
      elixirLeaked: 5.1
    }],
    gameMode: { name: "Ladder" },
    arena: { name: "Spooky Town" },
    isLadderTournament: false
  }
];

// Test pagination with different pages
console.log("=== Testing Battle Log Pagination ===\n");

// Test page 1 of 2
console.log("Page 1 of 2:");
const embed1 = embedBuilder.createBattleLogEmbed(mockBattles.slice(0, 1), null, 1, 2);
console.log("Title:", embed1.data.title);
console.log("Description:", embed1.data.description);
console.log("Fields count:", embed1.data.fields?.length || 0);

// Test pagination buttons
const actionRow1 = embedBuilder.createBattlePaginationRow(1, 2, "#V0VCP2909");
console.log("\nPagination buttons for page 1:");
console.log("Back button disabled:", actionRow1.components[0].data.disabled);
console.log("Next button disabled:", actionRow1.components[1].data.disabled);

// Test page 2 of 2
console.log("\nPage 2 of 2:");
const embed2 = embedBuilder.createBattleLogEmbed(mockBattles.slice(1, 2), null, 2, 2);
console.log("Title:", embed2.data.title);
console.log("Description:", embed2.data.description);
console.log("Fields count:", embed2.data.fields?.length || 0);

const actionRow2 = embedBuilder.createBattlePaginationRow(2, 2, "#V0VCP2909");
console.log("\nPagination buttons for page 2:");
console.log("Back button disabled:", actionRow2.components[0].data.disabled);
console.log("Next button disabled:", actionRow2.components[1].data.disabled);

console.log("\n=== Pagination Test Complete ===");
