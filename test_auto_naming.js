import { DeckAnalyzer } from './deckAnalyzer.js';

// Test the auto-generation functionality
const deckAnalyzer = new DeckAnalyzer();

// Test deck 1: Classic Log Bait
const logBaitDeck = [
  { name: 'Goblin Barrel', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Knight', elixirCost: 3, evolutionLevel: 1 },
  { name: 'Princess', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Goblin Gang', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Ice Spirit', elixirCost: 1, evolutionLevel: 0 },
  { name: 'Cannon', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Rocket', elixirCost: 6, evolutionLevel: 0 },
  { name: 'The Log', elixirCost: 2, evolutionLevel: 0 }
];

// Test deck 2: Evo Archers Control
const evoArchersDeck = [
  { name: 'Archers', elixirCost: 3, evolutionLevel: 1 },
  { name: 'Knight', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Graveyard', elixirCost: 5, evolutionLevel: 0 },
  { name: 'Witch', elixirCost: 5, evolutionLevel: 0 },
  { name: 'Ice Spirit', elixirCost: 1, evolutionLevel: 0 },
  { name: 'Goblin Hut', elixirCost: 5, evolutionLevel: 0 },
  { name: 'Poison', elixirCost: 4, evolutionLevel: 0 },
  { name: 'Barbarian Barrel', elixirCost: 2, evolutionLevel: 0 }
];

// Test deck 3: 2.6 Hog Cycle
const hogCycleDeck = [
  { name: 'Hog Rider', elixirCost: 4, evolutionLevel: 0 },
  { name: 'Cannon', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Fireball', elixirCost: 4, evolutionLevel: 0 },
  { name: 'Zap', elixirCost: 2, evolutionLevel: 0 },
  { name: 'Ice Spirit', elixirCost: 1, evolutionLevel: 0 },
  { name: 'Skeletons', elixirCost: 1, evolutionLevel: 0 },
  { name: 'Musketeer', elixirCost: 4, evolutionLevel: 0 },
  { name: 'Knight', elixirCost: 3, evolutionLevel: 0 }
];

// Test deck 4: Golem Beatdown
const golemBeatdownDeck = [
  { name: 'Golem', elixirCost: 8, evolutionLevel: 0 },
  { name: 'Baby Dragon', elixirCost: 4, evolutionLevel: 0 },
  { name: 'Mega Minion', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Lightning', elixirCost: 6, evolutionLevel: 0 },
  { name: 'Tornado', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Lumberjack', elixirCost: 4, evolutionLevel: 0 },
  { name: 'Elixir Collector', elixirCost: 6, evolutionLevel: 0 },
  { name: 'Skeleton Army', elixirCost: 3, evolutionLevel: 0 }
];

// Test deck 5: X-Bow Siege
const xbowSiegeDeck = [
  { name: 'X-Bow', elixirCost: 6, evolutionLevel: 0 },
  { name: 'Tesla', elixirCost: 4, evolutionLevel: 0 },
  { name: 'Archers', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Knight', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Skeletons', elixirCost: 1, evolutionLevel: 0 },
  { name: 'Electro Spirit', elixirCost: 1, evolutionLevel: 0 },
  { name: 'Fireball', elixirCost: 4, evolutionLevel: 0 },
  { name: 'The Log', elixirCost: 2, evolutionLevel: 0 }
];

console.log('🎯 **Auto-Generated Deck Names Test**\n');

// Test each deck
const testDecks = [
  { name: 'Log Bait', deck: logBaitDeck },
  { name: 'Evo Archers Control', deck: evoArchersDeck },
  { name: 'Hog Cycle', deck: hogCycleDeck },
  { name: 'Golem Beatdown', deck: golemBeatdownDeck },
  { name: 'X-Bow Siege', deck: xbowSiegeDeck }
];

testDecks.forEach(({ name, deck }) => {
  try {
    const analysis = deckAnalyzer.analyzeDeck(deck);
    console.log(`📋 **${name}:**`);
    console.log(`   Auto-Generated Name: "${analysis.deckName}"`);
    console.log(`   Archetype: ${analysis.archetype}`);
    console.log(`   Average Elixir: ${analysis.averageElixir}`);
    console.log(`   Rating: ${analysis.rating.rating} ${'⭐'.repeat(analysis.rating.stars)}`);
    console.log('');
  } catch (error) {
    console.log(`❌ Error analyzing ${name}: ${error.message}`);
  }
});

console.log('✨ **Auto-Generation Features:**');
console.log('• Evolution cards are prioritized in naming');
console.log('• Key cards (win conditions, unique cards) are included');
console.log('• Elixir cost is added for cycle decks (≤3.2)');
console.log('• Archetype is automatically detected and included');
console.log('• Special modifiers (Bait, Control, etc.) are added');
console.log('• Common cards (Zap, Log, etc.) are deprioritized');
