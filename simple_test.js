// Simple test to verify the auto-generation fixes
const testDeck = [
  { name: 'Goblin Barrel', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Knight', elixirCost: 3, evolutionLevel: 1 },
  { name: 'Princess', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Goblin Gang', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Ice Spirit', elixirCost: 1, evolutionLevel: 0 },
  { name: 'Cannon', elixirCost: 3, evolutionLevel: 0 },
  { name: 'Rocket', elixirCost: 6, evolutionLevel: 0 },
  { name: 'The Log', elixirCost: 2, evolutionLevel: 0 }
];

console.log('Testing Log Bait Detection:');
console.log('Cards:', testDeck.map(c => c.name).join(', '));

// Check log bait components
const hasGoblinBarrel = testDeck.some(card => card.name === 'Goblin Barrel');
const hasShooter = testDeck.some(card => ['Princess', 'Dart Goblin', 'Archers', 'Firecracker', 'Musketeer'].includes(card.name));
const hasGoblinGang = testDeck.some(card => card.name === 'Goblin Gang');
const hasLog = testDeck.some(card => card.name === 'The Log');
const hasFastCycle = testDeck.some(card => ['Ice Spirit', 'Skeletons', 'Electro Spirit'].includes(card.name));
const hasBuilding = testDeck.some(card => ['Cannon', 'Tesla', 'Inferno Tower', 'Goblin Cage'].includes(card.name));
const hasHighDamageSpell = testDeck.some(card => ['Rocket', 'Fireball', 'Lightning'].includes(card.name));

console.log('Components:');
console.log('- Goblin Barrel:', hasGoblinBarrel);
console.log('- Shooter (Princess):', hasShooter);
console.log('- Goblin Gang:', hasGoblinGang);
console.log('- The Log:', hasLog);
console.log('- Fast Cycle (Ice Spirit):', hasFastCycle);
console.log('- Building (Cannon):', hasBuilding);
console.log('- High Damage Spell (Rocket):', hasHighDamageSpell);

const components = [hasGoblinBarrel, hasShooter, hasGoblinGang, hasLog, hasFastCycle, hasBuilding, hasHighDamageSpell];
const componentCount = components.filter(Boolean).length;
console.log('Total components:', componentCount, '/ 7');
console.log('Is Log Bait:', hasGoblinBarrel && componentCount >= 6);

// Test naming logic
const evolutionCards = testDeck.filter(card => card.evolutionLevel && card.evolutionLevel > 0);
const logBaitPriority = ['Goblin Barrel', 'Princess', 'Dart Goblin', 'Firecracker', 'Goblin Gang', 'Skeleton Barrel', 'Goblins'];
const logBaitCards = testDeck.filter(card => logBaitPriority.includes(card.name))
  .sort((a, b) => logBaitPriority.indexOf(a.name) - logBaitPriority.indexOf(b.name));

console.log('\nNaming Logic:');
console.log('Evolution cards:', evolutionCards.map(c => c.name));
console.log('Log bait cards (priority order):', logBaitCards.map(c => c.name));

// Expected name: "Evo Knight Goblin Barrel Log Bait"
console.log('\nExpected name: "Evo Knight Goblin Barrel Log Bait"');
