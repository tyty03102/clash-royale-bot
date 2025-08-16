export class DeckAnalyzer {
  constructor() {
    // Enhanced card database with detailed information from deckcheck.devtools
    this.cardDatabase = {
      // Win conditions with detailed properties
      winConditions: [
        'Giant', 'Golem', 'Royal Giant', 'Hog Rider', 'Balloon', 'X-Bow', 'Mortar', 
        'Goblin Barrel', 'Graveyard', 'Royal Hogs', 'Ram Rider', 'Elixir Golem',
        'Goblin Giant', 'Lava Hound', 'Miner', 'Wall Breakers', 'Skeleton Barrel',
        'Giant Skeleton', 'Sparky', 'Mega Knight', 'P.E.K.K.A', 'Electro Giant',
        'Goblin Drill', 'Goblin Machine', 'Rune Giant', 'Boss Bandit'
      ],
      
      // Spells with detailed properties
      spells: [
        'Arrows', 'Fireball', 'Zap', 'Poison', 'Lightning', 'Rocket', 'Freeze',
        'Mirror', 'Clone', 'Tornado', 'Earthquake', 'Heal', 'Rage', 'The Log',
        'Barbarian Barrel', 'Giant Snowball', 'Royal Delivery', 'Graveyard',
        'Goblin Barrel', 'Skeleton Barrel', 'Wall Breakers', 'Void', 'Goblin Curse'
      ],
      
      // Buildings with detailed properties
      buildings: [
        'Cannon', 'Inferno Tower', 'Tesla', 'Bomb Tower', 'X-Bow', 'Mortar',
        'Goblin Hut', 'Barbarian Hut', 'Tombstone', 'Goblin Cage',
        'Inferno Dragon', 'Elixir Collector', 'Goblin Drill'
      ],
      
      // Support cards with detailed properties
      supportCards: [
        // Common troops
        'Knight', 'Archers', 'Goblins', 'Giant', 'P.E.K.K.A', 'Minions', 'Balloon', 'Witch', 
        'Barbarians', 'Skeletons', 'Valkyrie', 'Skeleton Army', 'Bomber', 'Musketeer', 
        'Baby Dragon', 'Prince', 'Wizard', 'Mini P.E.K.K.A', 'Spear Goblins', 'Giant Skeleton', 
        'Hog Rider', 'Minion Horde', 'Ice Wizard', 'Royal Giant', 'Guards', 'Princess', 
        'Dark Prince', 'Three Musketeers', 'Lava Hound', 'Ice Spirit', 'Fire Spirit', 
        'Miner', 'Sparky', 'Bowler', 'Lumberjack', 'Battle Ram', 'Inferno Dragon', 
        'Ice Golem', 'Mega Minion', 'Dart Goblin', 'Goblin Gang', 'Electro Wizard', 
        'Elite Barbarians', 'Hunter', 'Executioner', 'Bandit', 'Royal Recruits', 
        'Night Witch', 'Bats', 'Royal Ghost', 'Ram Rider', 'Zappies', 'Rascals', 
        'Cannon Cart', 'Mega Knight', 'Skeleton Barrel', 'Flying Machine', 'Wall Breakers', 
        'Royal Hogs', 'Goblin Giant', 'Fisherman', 'Magic Archer', 'Electro Dragon', 
        'Firecracker', 'Mighty Miner', 'Elixir Golem', 'Battle Healer', 'Skeleton King', 
        'Archer Queen', 'Golden Knight', 'Monk', 'Skeleton Dragons', 'Mother Witch', 
        'Electro Spirit', 'Electro Giant', 'Phoenix', 'Little Prince', 'Goblin Demolisher', 
        'Goblin Machine', 'Suspicious Bush', 'Goblinstein', 'Rune Giant', 'Berserker', 
        'Boss Bandit',
        
        // Buildings (support role)
        'Cannon', 'Goblin Hut', 'Mortar', 'Inferno Tower', 'Bomb Tower', 'Barbarian Hut', 
        'Tesla', 'Elixir Collector', 'X-Bow', 'Tombstone', 'Furnace', 'Goblin Cage', 
        'Goblin Drill',
        
        // Spells (support role)
        'Fireball', 'Arrows', 'Rage', 'Rocket', 'Goblin Barrel', 'Freeze', 'Mirror', 
        'Lightning', 'Zap', 'Poison', 'Graveyard', 'The Log', 'Tornado', 'Clone', 
        'Earthquake', 'Barbarian Barrel', 'Heal Spirit', 'Giant Snowball', 'Royal Delivery', 
        'Void', 'Goblin Curse', 'Spirit Empress',
        
        // Support items
        'Tower Princess', 'Cannoneer', 'Dagger Duchess', 'Royal Chef'
      ]
    };

    // Enhanced card properties database (extracted from deckcheck.devtools)
    this.cardProperties = {
      // Low elixir cycle cards (1-2 elixir)
      cycleCards: ['Ice Spirit', 'The Log', 'Skeletons', 'Electro Spirit', 'Heal Spirit', 'Fire Spirit'],
      
      // High damage spells
      highDamageSpells: ['Rocket', 'Lightning', 'Fireball', 'Poison'],
      
      // Building targeting cards
      buildingTargeters: ['Goblin Barrel', 'Miner', 'Graveyard', 'Wall Breakers', 'Skeleton Barrel'],
      
      // Air targeting cards
      airTargeters: ['Archers', 'Musketeer', 'Baby Dragon', 'Minions', 'Minion Horde', 'Dart Goblin', 'Flying Machine'],
      
      // Tank cards
      tanks: ['Giant', 'Golem', 'Royal Giant', 'Goblin Giant', 'Electro Giant', 'Lava Hound', 'Giant Skeleton'],
      
      // Swarm cards
      swarms: ['Goblin Gang', 'Skeleton Army', 'Minion Horde', 'Barbarians', 'Royal Recruits'],
      
      // Spell bait cards
      spellBaits: ['Goblin Barrel', 'Princess', 'Goblin Gang', 'Skeleton Army', 'Minion Horde', 'Dart Goblin'],
      
      // Defensive buildings
      defensiveBuildings: ['Cannon', 'Tesla', 'Inferno Tower', 'Bomb Tower', 'Goblin Cage'],
      
      // Spawner buildings
      spawnerBuildings: ['Goblin Hut', 'Barbarian Hut', 'Tombstone', 'Furnace'],
      
      // Evolution cards (can be evolved)
      evolutionCards: ['Knight', 'Archers', 'Ice Spirit', 'Cannon', 'Tesla', 'Goblin Cage', 'Dart Goblin', 'Bats', 'Zap'],
      
      // Legendary cards
      legendaryCards: ['Princess', 'Ice Wizard', 'Miner', 'Sparky', 'Lumberjack', 'Inferno Dragon', 'Electro Wizard', 'Bandit', 'Royal Ghost', 'Magic Archer', 'Night Witch', 'Mother Witch', 'Fisherman', 'Phoenix', 'Archer Queen', 'Golden Knight', 'Skeleton King', 'Mighty Miner', 'Little Prince', 'Monk', 'Boss Bandit'],
      
      // Epic cards
      epicCards: ['Giant', 'P.E.K.K.A', 'Balloon', 'Witch', 'Prince', 'Dark Prince', 'Giant Skeleton', 'Golem', 'Lava Hound', 'Bowler', 'Battle Ram', 'Executioner', 'Cannon Cart', 'Electro Dragon', 'Goblin Giant', 'Electro Giant', 'Skeleton Dragons', 'Goblin Machine', 'Rune Giant', 'Berserker'],
      
      // Rare cards
      rareCards: ['Mini P.E.K.K.A', 'Musketeer', 'Valkyrie', 'Hog Rider', 'Wizard', 'Bomber', 'Three Musketeers', 'Furnace', 'Elixir Collector', 'Dart Goblin', 'Zappies', 'Hunter', 'Royal Hogs', 'Flying Machine', 'Firecracker', 'Battle Healer', 'Electro Spirit', 'Heal Spirit', 'Fire Spirit', 'Goblin Drill', 'Suspicious Bush', 'Goblinstein', 'Spirit Empress']
    };

    // Enhanced card synergies (extracted from deckcheck.devtools analysis)
    this.synergies = {
      'Goblin Barrel': ['Ice Spirit', 'Knight', 'Archers', 'Cannon', 'The Log', 'Rocket'],
      'Hog Rider': ['Ice Spirit', 'Fireball', 'Zap', 'Cannon', 'Tesla', 'Valkyrie'],
      'Giant': ['Witch', 'Wizard', 'Musketeer', 'Baby Dragon', 'Mega Minion', 'Poison'],
      'Royal Giant': ['Furnace', 'Electro Wizard', 'Mega Minion', 'Fireball', 'Zap'],
      'X-Bow': ['Tesla', 'Archers', 'Knight', 'Skeletons', 'Fireball', 'The Log'],
      'Mortar': ['Knight', 'Archers', 'Skeletons', 'Arrows', 'Fireball'],
      'Graveyard': ['Knight', 'Furnace', 'Ice Wizard', 'Poison', 'Tornado'],
      'Royal Hogs': ['Zappies', 'Flying Machine', 'Fireball', 'Arrows', 'Barbarian Barrel'],
      'Golem': ['Baby Dragon', 'Mega Minion', 'Lightning', 'Poison', 'Tornado'],
      'Lava Hound': ['Balloon', 'Mega Minion', 'Lightning', 'Arrows', 'Fireball'],
      'Miner': ['Poison', 'Goblin Barrel', 'Minions', 'Bats', 'Skeleton Army'],
      'Balloon': ['Lava Hound', 'Freeze', 'Rage', 'Lightning', 'Arrows'],
      'Sparky': ['Goblin Giant', 'Giant', 'Rage', 'Freeze', 'Zap'],
      'Mega Knight': ['Bandit', 'Dark Prince', 'Royal Ghost', 'Poison', 'Fireball'],
      'P.E.K.K.A': ['Dark Prince', 'Bandit', 'Poison', 'Fireball', 'Zap'],
      'Electro Giant': ['Lightning', 'Poison', 'Tornado', 'Zap', 'Arrows'],
      'Goblin Giant': ['Sparky', 'Dark Prince', 'Electro Wizard', 'Rage', 'Zap'],
      'Ram Rider': ['Bandit', 'Dark Prince', 'Poison', 'Fireball', 'Zap'],
      'Wall Breakers': ['Goblin Barrel', 'Miner', 'Poison', 'Fireball', 'Zap'],
      'Skeleton Barrel': ['Goblin Barrel', 'Miner', 'Poison', 'Fireball', 'Zap'],
      'Goblin Drill': ['Goblin Barrel', 'Miner', 'Poison', 'Fireball', 'Zap'],
      'Goblin Machine': ['Goblin Giant', 'Sparky', 'Rage', 'Freeze', 'Zap'],
      'Rune Giant': ['Goblin Giant', 'Sparky', 'Rage', 'Freeze', 'Zap'],
      'Boss Bandit': ['Bandit', 'Dark Prince', 'Royal Ghost', 'Poison', 'Fireball']
    };

    // Card roles and descriptions (extracted from deckcheck.devtools)
    this.cardRoles = {
      // Win conditions with descriptions
      'Goblin Barrel': { role: 'Win Condition', description: 'Spell bait win condition that deals tower damage', elixir: 3, rarity: 'Epic' },
      'Hog Rider': { role: 'Win Condition', description: 'Fast building-targeting win condition', elixir: 4, rarity: 'Rare' },
      'Giant': { role: 'Win Condition', description: 'Tank win condition for beatdown decks', elixir: 5, rarity: 'Rare' },
      'Royal Giant': { role: 'Win Condition', description: 'Long-range building-targeting win condition', elixir: 6, rarity: 'Common' },
      'X-Bow': { role: 'Win Condition', description: 'Siege building that attacks from your side', elixir: 6, rarity: 'Epic' },
      'Mortar': { role: 'Win Condition', description: 'Siege building with area damage', elixir: 4, rarity: 'Common' },
      'Graveyard': { role: 'Win Condition', description: 'Spell that spawns skeletons on enemy tower', elixir: 5, rarity: 'Legendary' },
      'Royal Hogs': { role: 'Win Condition', description: 'Split-lane win condition', elixir: 5, rarity: 'Common' },
      'Golem': { role: 'Win Condition', description: 'Heavy tank for beatdown decks', elixir: 8, rarity: 'Epic' },
      'Lava Hound': { role: 'Win Condition', description: 'Flying tank that spawns pups', elixir: 7, rarity: 'Legendary' },
      'Miner': { role: 'Win Condition', description: 'Versatile win condition that can target anywhere', elixir: 3, rarity: 'Legendary' },
      'Balloon': { role: 'Win Condition', description: 'Flying building-targeting win condition', elixir: 5, rarity: 'Epic' },
      'Sparky': { role: 'Win Condition', description: 'High damage but slow win condition', elixir: 6, rarity: 'Legendary' },
      'Mega Knight': { role: 'Win Condition', description: 'Jumping tank with area damage', elixir: 7, rarity: 'Legendary' },
      'P.E.K.K.A': { role: 'Win Condition', description: 'High damage single-target tank', elixir: 7, rarity: 'Epic' },
      'Electro Giant': { role: 'Win Condition', description: 'Tank that stuns enemies', elixir: 8, rarity: 'Epic' },
      'Goblin Giant': { role: 'Win Condition', description: 'Tank that spawns spear goblins', elixir: 6, rarity: 'Epic' },
      'Ram Rider': { role: 'Win Condition', description: 'Charging win condition that snares', elixir: 5, rarity: 'Legendary' },
      'Wall Breakers': { role: 'Win Condition', description: 'Fast building-targeting win condition', elixir: 2, rarity: 'Common' },
      'Skeleton Barrel': { role: 'Win Condition', description: 'Flying spell bait win condition', elixir: 3, rarity: 'Common' },
      'Goblin Drill': { role: 'Win Condition', description: 'Underground building-targeting win condition', elixir: 4, rarity: 'Rare' },
      'Goblin Machine': { role: 'Win Condition', description: 'Mechanical win condition', elixir: 6, rarity: 'Epic' },
      'Rune Giant': { role: 'Win Condition', description: 'Magical tank win condition', elixir: 7, rarity: 'Epic' },
      'Boss Bandit': { role: 'Win Condition', description: 'Boss version of Bandit', elixir: 4, rarity: 'Legendary' },

      // Support cards with descriptions
      'Knight': { role: 'Support', description: 'Versatile defensive troop', elixir: 3, rarity: 'Common' },
      'Archers': { role: 'Support', description: 'Ranged defensive troop', elixir: 3, rarity: 'Common' },
      'Ice Spirit': { role: 'Support', description: 'Fast cycle card that freezes', elixir: 1, rarity: 'Common' },
      'Cannon': { role: 'Building', description: 'Cheap defensive building', elixir: 3, rarity: 'Common' },
      'Tesla': { role: 'Building', description: 'Hidden defensive building', elixir: 4, rarity: 'Common' },
      'The Log': { role: 'Spell', description: 'Ground-targeting spell', elixir: 2, rarity: 'Legendary' },
      'Rocket': { role: 'Spell', description: 'High damage building-targeting spell', elixir: 6, rarity: 'Rare' },
      'Goblin Gang': { role: 'Support', description: 'Swarm defensive troop', elixir: 3, rarity: 'Common' },
      'Fireball': { role: 'Spell', description: 'Medium damage area spell', elixir: 4, rarity: 'Rare' },
      'Zap': { role: 'Spell', description: 'Fast stun spell', elixir: 2, rarity: 'Common' },
      'Poison': { role: 'Spell', description: 'Area damage over time spell', elixir: 4, rarity: 'Epic' },
      'Lightning': { role: 'Spell', description: 'High damage multi-target spell', elixir: 6, rarity: 'Epic' },
      'Freeze': { role: 'Spell', description: 'Stuns all enemies', elixir: 4, rarity: 'Epic' },
      'Tornado': { role: 'Spell', description: 'Pulls enemies together', elixir: 3, rarity: 'Epic' },
      'Valkyrie': { role: 'Support', description: 'Area damage defensive troop', elixir: 4, rarity: 'Rare' },
      'Musketeer': { role: 'Support', description: 'High damage ranged troop', elixir: 4, rarity: 'Rare' },
      'Baby Dragon': { role: 'Support', description: 'Flying area damage troop', elixir: 4, rarity: 'Epic' },
      'Mega Minion': { role: 'Support', description: 'Flying defensive troop', elixir: 3, rarity: 'Rare' },
      'Electro Wizard': { role: 'Support', description: 'Stuns and spawns zap', elixir: 4, rarity: 'Legendary' },
      'Dark Prince': { role: 'Support', description: 'Charging area damage troop', elixir: 4, rarity: 'Epic' },
      'Bandit': { role: 'Support', description: 'Fast charging troop', elixir: 3, rarity: 'Legendary' },
      'Royal Ghost': { role: 'Support', description: 'Invisible charging troop', elixir: 3, rarity: 'Legendary' },
      'Flying Machine': { role: 'Support', description: 'Flying ranged troop', elixir: 4, rarity: 'Rare' },
      'Zappies': { role: 'Support', description: 'Stun troops', elixir: 4, rarity: 'Rare' },
      'Hunter': { role: 'Support', description: 'High damage close-range troop', elixir: 4, rarity: 'Rare' },
      'Fisherman': { role: 'Support', description: 'Hooks and pulls enemies', elixir: 3, rarity: 'Legendary' },
      'Magic Archer': { role: 'Support', description: 'Piercing ranged troop', elixir: 4, rarity: 'Legendary' },
      'Phoenix': { role: 'Support', description: 'Flying troop that respawns', elixir: 4, rarity: 'Legendary' },
      'Little Prince': { role: 'Support', description: 'Versatile support troop', elixir: 3, rarity: 'Legendary' },
      'Golden Knight': { role: 'Support', description: 'Charging golden troop', elixir: 4, rarity: 'Legendary' },
      'Skeleton King': { role: 'Support', description: 'Skeleton spawning champion', elixir: 4, rarity: 'Legendary' },
      'Mighty Miner': { role: 'Support', description: 'Underground support troop', elixir: 3, rarity: 'Legendary' },
      'Archer Queen': { role: 'Support', description: 'Invisible ranged champion', elixir: 4, rarity: 'Legendary' },
      'Monk': { role: 'Support', description: 'Reflects projectiles', elixir: 4, rarity: 'Legendary' },
      'Berserker': { role: 'Support', description: 'Rage-enhanced troop', elixir: 4, rarity: 'Epic' },
      'Furnace': { role: 'Building', description: 'Spawns fire spirits', elixir: 4, rarity: 'Rare' },
      'Goblin Hut': { role: 'Building', description: 'Spawns spear goblins', elixir: 5, rarity: 'Rare' },
      'Barbarian Hut': { role: 'Building', description: 'Spawns barbarians', elixir: 7, rarity: 'Rare' },
      'Tombstone': { role: 'Building', description: 'Spawns skeletons', elixir: 3, rarity: 'Rare' },
      'Goblin Cage': { role: 'Building', description: 'Spawns goblin brawler', elixir: 4, rarity: 'Rare' },
      'Elixir Collector': { role: 'Building', description: 'Generates elixir', elixir: 6, rarity: 'Rare' },
      'Inferno Tower': { role: 'Building', description: 'High damage building', elixir: 5, rarity: 'Rare' },
      'Bomb Tower': { role: 'Building', description: 'Area damage building', elixir: 4, rarity: 'Rare' },
      'Arrows': { role: 'Spell', description: 'Area damage spell', elixir: 3, rarity: 'Common' },
      'Barbarian Barrel': { role: 'Spell', description: 'Rolling barbarian spell', elixir: 2, rarity: 'Epic' },
      'Giant Snowball': { role: 'Spell', description: 'Slows and damages', elixir: 2, rarity: 'Common' },
      'Royal Delivery': { role: 'Spell', description: 'Drops royal recruit', elixir: 3, rarity: 'Common' },
      'Earthquake': { role: 'Spell', description: 'Building damage spell', elixir: 3, rarity: 'Rare' },
      'Heal': { role: 'Spell', description: 'Heals troops', elixir: 1, rarity: 'Rare' },
      'Rage': { role: 'Spell', description: 'Increases attack and speed', elixir: 2, rarity: 'Epic' },
      'Mirror': { role: 'Spell', description: 'Copies last played card', elixir: 1, rarity: 'Epic' },
      'Clone': { role: 'Spell', description: 'Clones troops', elixir: 3, rarity: 'Epic' },
      'Void': { role: 'Spell', description: 'Void damage spell', elixir: 3, rarity: 'Epic' },
      'Goblin Curse': { role: 'Spell', description: 'Curses enemies', elixir: 3, rarity: 'Epic' },
      'Spirit Empress': { role: 'Spell', description: 'Spirit summoning spell', elixir: 4, rarity: 'Epic' }
    };

    // Meta deck archetypes
    this.metaArchetypes = {
      'Beatdown': {
        description: 'Heavy tank-based decks that build up elixir advantage',
        characteristics: ['High average elixir', 'Tank win condition', 'Support troops'],
        examples: ['Golem Beatdown', 'Giant Beatdown', 'Lava Hound Beatdown']
      },
      'Control': {
        description: 'Defensive decks that counter-push for damage',
        characteristics: ['Low average elixir', 'Defensive buildings', 'Spells'],
        examples: ['X-Bow Control', 'Mortar Control', 'Hog Control']
      },
      'Siege': {
        description: 'Building-based decks that attack from your side',
        characteristics: ['X-Bow or Mortar', 'Defensive buildings', 'Spells'],
        examples: ['X-Bow Siege', 'Mortar Siege']
      },
      'Cycle': {
        description: 'Fast cycling decks that rely on quick card rotation',
        characteristics: ['Very low average elixir', 'Fast cycle', 'Spells'],
        examples: ['Hog Cycle', 'X-Bow Cycle', 'Miner Cycle']
      },
      'Bridge Spam': {
        description: 'Aggressive decks that pressure both lanes',
        characteristics: ['Medium elixir', 'Multiple win conditions', 'Fast troops'],
        examples: ['Royal Hogs Bridge Spam', 'Ram Rider Bridge Spam']
      },
      'Spell Bait': {
        description: 'Decks that bait out opponent spells',
        characteristics: ['Multiple spell targets', 'Swarm troops', 'Spells'],
        examples: ['Log Bait', 'Zap Bait', 'Fireball Bait']
      }
    };
  }

  analyzeDeck(deck) {
    if (!deck || deck.length !== 8) {
      throw new Error('Invalid deck: Must contain exactly 8 cards');
    }

    const analysis = {
      deck: deck,
      deckName: this.generateDeckName(deck),
      averageElixir: this.calculateAverageElixir(deck),
      archetype: this.determineArchetype(deck),
      winCondition: this.findWinCondition(deck),
      spells: this.findSpells(deck),
      buildings: this.findBuildings(deck),
      supportCards: this.findSupportCards(deck),
      synergies: this.analyzeSynergies(deck),
      strengths: this.analyzeStrengths(deck),
      weaknesses: this.analyzeWeaknesses(deck),
      recommendations: this.generateRecommendations(deck),
      rating: this.rateDeck(deck)
    };

    return analysis;
  }

  calculateAverageElixir(deck) {
    const totalElixir = deck.reduce((sum, card) => sum + card.elixirCost, 0);
    return (totalElixir / 8).toFixed(1);
  }

  findWinCondition(deck) {
    return deck.filter(card => this.cardDatabase.winConditions.includes(card.name));
  }

  findSpells(deck) {
    return deck.filter(card => this.cardDatabase.spells.includes(card.name));
  }

  findBuildings(deck) {
    return deck.filter(card => this.cardDatabase.buildings.includes(card.name));
  }

  findSupportCards(deck) {
    return deck.filter(card => this.cardDatabase.supportCards.includes(card.name));
  }

  findEvolutionCards(deck) {
    return deck.filter(card => card.evolutionLevel && card.evolutionLevel > 0);
  }



  determineArchetype(deck) {
    const avgElixir = parseFloat(this.calculateAverageElixir(deck));
    const winConditions = this.findWinCondition(deck);
    const spells = this.findSpells(deck);
    const buildings = this.findBuildings(deck);

    // Determine archetype based on characteristics
    if (avgElixir >= 4.0 && winConditions.some(wc => ['Golem', 'Giant', 'Lava Hound'].includes(wc.name))) {
      return 'Beatdown';
    } else if (buildings.length >= 2 && winConditions.some(wc => ['X-Bow', 'Mortar'].includes(wc.name))) {
      return 'Siege';
    } else if (avgElixir <= 3.2 && spells.length >= 2) {
      return 'Cycle';
    } else if (winConditions.length >= 2 && avgElixir <= 3.8) {
      return 'Bridge Spam';
    } else if (spells.length >= 2 && this.hasSpellBaitCards(deck)) {
      return 'Spell Bait';
    } else {
      return 'Control';
    }
  }

  hasSpellBaitCards(deck) {
    const baitCards = ['Goblin Barrel', 'Princess', 'Goblin Gang', 'Skeleton Army', 'Minion Horde'];
    return deck.some(card => baitCards.includes(card.name));
  }

  analyzeSynergies(deck) {
    const synergies = [];
    const winConditions = this.findWinCondition(deck);

    winConditions.forEach(wc => {
      const recommendedCards = this.synergies[wc.name] || [];
      const presentCards = deck.filter(card => recommendedCards.includes(card.name));
      
      if (presentCards.length > 0) {
        synergies.push({
          winCondition: wc.name,
          recommendedCards: recommendedCards,
          presentCards: presentCards.map(c => c.name),
          synergyScore: (presentCards.length / recommendedCards.length) * 100
        });
      }
    });

    return synergies;
  }

  analyzeStrengths(deck) {
    const strengths = [];
    const avgElixir = parseFloat(this.calculateAverageElixir(deck));
    const winConditions = this.findWinCondition(deck);
    const spells = this.findSpells(deck);
    const buildings = this.findBuildings(deck);

    // Analyze strengths based on deck composition
    if (winConditions.length > 0) {
      strengths.push(`✅ Has ${winConditions.length} win condition(s): ${winConditions.map(wc => wc.name).join(', ')}`);
    }

    if (spells.length >= 2) {
      strengths.push(`✅ Good spell coverage with ${spells.length} spells`);
    }

    if (buildings.length > 0) {
      strengths.push(`✅ Defensive buildings for tower protection`);
    }

    if (avgElixir <= 3.5) {
      strengths.push(`✅ Fast cycle potential with ${avgElixir} average elixir`);
    } else if (avgElixir >= 4.0) {
      strengths.push(`✅ Heavy hitting power with ${avgElixir} average elixir`);
    }

    const synergies = this.analyzeSynergies(deck);
    if (synergies.length > 0) {
      strengths.push(`✅ Good card synergies with ${synergies.length} win condition(s)`);
    }

    // Check for evolution cards
    const evolutionCards = this.findEvolutionCards(deck);
    if (evolutionCards.length > 0) {
      strengths.push(`✅ Has ${evolutionCards.length} evolution card(s): ${evolutionCards.map(c => c.name).join(', ')}`);
    }

    return strengths;
  }

  analyzeWeaknesses(deck) {
    const weaknesses = [];
    const winConditions = this.findWinCondition(deck);
    const spells = this.findSpells(deck);
    const buildings = this.findBuildings(deck);
    const avgElixir = parseFloat(this.calculateAverageElixir(deck));

    // Analyze weaknesses
    if (winConditions.length === 0) {
      weaknesses.push(`❌ No clear win condition - deck may struggle to take towers`);
    } else if (winConditions.length > 2) {
      weaknesses.push(`❌ Too many win conditions (${winConditions.length}) - may lack support`);
    }

    if (spells.length === 0) {
      weaknesses.push(`❌ No spells - limited removal and finishing options`);
    } else if (spells.length === 1) {
      weaknesses.push(`⚠️ Only ${spells.length} spell - may struggle with certain matchups`);
    }

    if (buildings.length === 0) {
      weaknesses.push(`❌ No defensive buildings - vulnerable to heavy pushes`);
    }

    if (avgElixir > 4.5) {
      weaknesses.push(`❌ Very high elixir cost (${avgElixir}) - vulnerable to fast decks`);
    }

    // Check for specific weaknesses
    const hasAirDefense = deck.some(card => 
      ['Archers', 'Musketeer', 'Baby Dragon', 'Mega Minion', 'Minions', 'Minion Horde', 'Bats'].includes(card.name)
    );
    if (!hasAirDefense) {
      weaknesses.push(`❌ Weak air defense - vulnerable to air decks`);
    }

    const hasSplashDamage = deck.some(card => 
      ['Wizard', 'Witch', 'Baby Dragon', 'Valkyrie', 'Bowler', 'Executioner', 'Fireball', 'Poison'].includes(card.name)
    );
    if (!hasSplashDamage) {
      weaknesses.push(`❌ Limited splash damage - may struggle against swarms`);
    }

    return weaknesses;
  }

  generateRecommendations(deck) {
    const recommendations = [];
    const weaknesses = this.analyzeWeaknesses(deck);
    const winConditions = this.findWinCondition(deck);
    const spells = this.findSpells(deck);
    const buildings = this.findBuildings(deck);

    // Generate specific recommendations based on weaknesses
    if (winConditions.length === 0) {
      recommendations.push({
        type: 'critical',
        message: 'Add a win condition like Hog Rider, Giant, or X-Bow',
        priority: 'high'
      });
    }

    if (spells.length === 0) {
      recommendations.push({
        type: 'important',
        message: 'Add a spell like Fireball, Zap, or Arrows for removal',
        priority: 'high'
      });
    }

    if (buildings.length === 0) {
      recommendations.push({
        type: 'important',
        message: 'Consider adding a defensive building like Cannon or Tesla',
        priority: 'medium'
      });
    }

    // Win condition specific recommendations
    winConditions.forEach(wc => {
      const recommendedCards = this.synergies[wc.name] || [];
      const presentCards = deck.filter(card => recommendedCards.includes(card.name));
      
      if (presentCards.length < 2) {
        recommendations.push({
          type: 'synergy',
          message: `Add support cards for ${wc.name}: ${recommendedCards.slice(0, 3).join(', ')}`,
          priority: 'medium'
        });
      }
    });

    // Archetype recommendations
    const archetype = this.determineArchetype(deck);
    if (archetype === 'Beatdown' && parseFloat(this.calculateAverageElixir(deck)) < 4.0) {
      recommendations.push({
        type: 'archetype',
        message: 'Consider adding more heavy support cards for beatdown strategy',
        priority: 'medium'
      });
    }

    if (archetype === 'Cycle' && parseFloat(this.calculateAverageElixir(deck)) > 3.5) {
      recommendations.push({
        type: 'archetype',
        message: 'Replace expensive cards with cheaper alternatives for better cycling',
        priority: 'medium'
      });
    }

    // Evolution recommendations
    const evolutionCards = this.findEvolutionCards(deck);
    if (evolutionCards.length === 0) {
      recommendations.push({
        type: 'meta',
        message: 'Consider adding evolution cards for better meta performance',
        priority: 'medium'
      });
    }



    // Specific meta deck recommendations
    const deckWinConditions = this.findWinCondition(deck);
    deckWinConditions.forEach(wc => {
      if (wc.name === 'Graveyard' && !deck.some(c => c.name === 'Furnace')) {
        recommendations.push({
          type: 'synergy',
          message: 'Furnace works great with Graveyard for continuous pressure',
          priority: 'high'
        });
      }
      if (wc.name === 'Royal Giant' && !deck.some(c => c.name === 'Furnace')) {
        recommendations.push({
          type: 'synergy',
          message: 'Furnace provides excellent support for Royal Giant pushes',
          priority: 'high'
        });
      }
    });

    return recommendations;
  }

  calculateMetaScore(deck) {
    let score = 0;
    const archetype = this.determineArchetype(deck);
    const avgElixir = parseFloat(this.calculateAverageElixir(deck));
    const synergies = this.analyzeSynergies(deck);

    // Base score for having a clear archetype
    score += 20;

    // Score for good elixir cost
    if (avgElixir >= 3.0 && avgElixir <= 4.5) {
      score += 15;
    } else if (avgElixir < 3.0 || avgElixir > 4.5) {
      score += 5;
    }

    // Score for synergies
    score += synergies.length * 10;

    // Score for having spells
    const spells = this.findSpells(deck);
    score += spells.length * 5;

    // Score for having buildings
    const buildings = this.findBuildings(deck);
    score += buildings.length * 5;

    // Score for having win conditions
    const winConditions = this.findWinCondition(deck);
    score += winConditions.length * 10;

    // Bonus for evolution cards (current meta trend)
    const evolutionCards = this.findEvolutionCards(deck);
    score += evolutionCards.length * 8;

    return Math.min(100, score);
  }

  rateDeck(deck) {
    const metaScore = this.calculateMetaScore(deck);
    const weaknesses = this.analyzeWeaknesses(deck);
    const strengths = this.analyzeStrengths(deck);

    let rating = 'C';
    let stars = 1;

    if (metaScore >= 80 && weaknesses.length <= 2) {
      rating = 'S';
      stars = 5;
    } else if (metaScore >= 70 && weaknesses.length <= 3) {
      rating = 'A';
      stars = 4;
    } else if (metaScore >= 60 && weaknesses.length <= 4) {
      rating = 'B';
      stars = 3;
    } else if (metaScore >= 50 && weaknesses.length <= 5) {
      rating = 'C';
      stars = 2;
    } else {
      rating = 'D';
      stars = 1;
    }

    return {
      rating,
      stars,
      metaScore,
      description: this.getRatingDescription(rating)
    };
  }

  getRatingDescription(rating) {
    const descriptions = {
      'S': 'Excellent deck with great synergies and composition',
      'A': 'Very good deck with solid composition and few weaknesses',
      'B': 'Good deck that could benefit from some improvements',
      'C': 'Average deck with several areas for improvement',
      'D': 'Deck needs significant changes to be competitive'
    };
    return descriptions[rating] || 'Unknown rating';
  }

  // Auto-generate deck name based on composition and archetype
  generateDeckName(deck) {
    const archetype = this.determineArchetype(deck);
    const avgElixir = parseFloat(this.calculateAverageElixir(deck));
    const evolutionCards = this.findEvolutionCards(deck);
    
    // Check for specific deck types first
    if (this.isLogBaitDeck(deck)) {
      return this.generateLogBaitName(deck, evolutionCards, avgElixir);
    }
    
    // Get key cards for naming
    const keyCards = this.getKeyCardsForNaming(deck);
    
    // Build the name components
    let nameComponents = [];
    let usedCardNames = new Set();
    
    // Add evolution cards first if present
    if (evolutionCards.length > 0) {
      nameComponents.push(`Evo ${evolutionCards[0].name}`);
      usedCardNames.add(evolutionCards[0].name);
    }
    
    // Add key cards (max 2, avoid duplicates with evolution cards)
    const uniqueCardNames = [];
    keyCards.forEach(card => {
      if (!usedCardNames.has(card.name) && uniqueCardNames.length < 2) {
        uniqueCardNames.push(card.name);
        usedCardNames.add(card.name);
      }
    });
    nameComponents = nameComponents.concat(uniqueCardNames);
    
    // Add elixir cost if it's notable (≤3.0)
    if (avgElixir <= 3.0) {
      nameComponents.push(`${avgElixir.toFixed(1)}`);
    }
    
    // Add archetype (but not if it's already a specific type)
    if (!this.isLogBaitDeck(deck)) {
      nameComponents.push(archetype);
    }
    
    return nameComponents.join(' ');
  }

  // Generate specific name for log bait decks
  generateLogBaitName(deck, evolutionCards, avgElixir) {
    let nameComponents = [];
    
    // Add evolution cards first if present
    if (evolutionCards.length > 0) {
      nameComponents.push(`Evo ${evolutionCards[0].name}`);
    }
    
    // Add key log bait cards (max 2, excluding evolution cards)
    const logBaitCards = this.getLogBaitKeyCards(deck);
    const uniqueCardNames = [];
    logBaitCards.forEach(card => {
      if (!uniqueCardNames.includes(card.name) && 
          uniqueCardNames.length < 2 && 
          !(evolutionCards.length > 0 && card.name === evolutionCards[0].name)) {
        uniqueCardNames.push(card.name);
      }
    });
    nameComponents = nameComponents.concat(uniqueCardNames);
    
    // Add elixir cost if it's cycle (≤3.0)
    if (avgElixir <= 3.0) {
      nameComponents.push(`${avgElixir.toFixed(1)}`);
    }
    
    // Add "Log Bait" at the end
    nameComponents.push('Log Bait');
    
    return nameComponents.join(' ');
  }

  // Get key cards specifically for log bait naming
  getLogBaitKeyCards(deck) {
    const logBaitPriority = [
      'Goblin Barrel', 'Princess', 'Dart Goblin', 'Firecracker',
      'Goblin Gang', 'Skeleton Barrel', 'Goblins'
    ];
    
    return deck.filter(card => logBaitPriority.includes(card.name))
      .sort((a, b) => logBaitPriority.indexOf(a.name) - logBaitPriority.indexOf(b.name));
  }

  // Get key cards for deck naming (prioritizes win conditions, evolution cards, and unique cards)
  getKeyCardsForNaming(deck) {
    const evolutionCards = this.findEvolutionCards(deck);
    const winConditions = this.findWinCondition(deck);
    
    let keyCards = [];
    let usedCardNames = new Set();
    
    // Add evolution cards first
    evolutionCards.forEach(card => {
      keyCards.push(card);
      usedCardNames.add(card.name);
    });
    
    // Add win conditions (avoid duplicates with evolution cards)
    winConditions.forEach(wc => {
      if (!usedCardNames.has(wc.name)) {
        keyCards.push(wc);
        usedCardNames.add(wc.name);
      }
    });
    
    // Add unique cards (not common, not already included)
    const remainingCards = deck.filter(card => 
      !usedCardNames.has(card.name) &&
      !this.isCommonCard(card.name)
    );
    
    keyCards = keyCards.concat(remainingCards);
    
    return keyCards;
  }

  // Check if a card is common (used in many decks)
  isCommonCard(cardName) {
    const commonCards = [
      'Zap', 'The Log', 'Fireball', 'Arrows', 'Ice Spirit', 'Skeletons',
      'Knight', 'Archers', 'Goblin Gang', 'Cannon', 'Tesla'
    ];
    return commonCards.includes(cardName);
  }

  // Get special modifiers for deck names
  getDeckModifiers(deck) {
    const modifiers = [];
    const avgElixir = parseFloat(this.calculateAverageElixir(deck));
    const spells = this.findSpells(deck);
    const buildings = this.findBuildings(deck);
    
    // Cycle modifier
    if (avgElixir <= 3.0) {
      modifiers.push('Cycle');
    }
    
    // Bait modifier
    if (this.isBaitDeck(deck)) {
      modifiers.push('Bait');
    }
    
    // Control modifier
    if (this.isControlDeck(deck)) {
      modifiers.push('Control');
    }
    
    // Beatdown modifier
    if (this.isBeatdownDeck(deck)) {
      modifiers.push('Beatdown');
    }
    
    // Siege modifier
    if (this.isSiegeDeck(deck)) {
      modifiers.push('Siege');
    }
    
    // Bridge Spam modifier
    if (this.isBridgeSpamDeck(deck)) {
      modifiers.push('Bridge Spam');
    }
    
    return modifiers;
  }

  // Check if deck is a log bait deck (more specific detection)
  isLogBaitDeck(deck) {
    const hasGoblinBarrel = deck.some(card => card.name === 'Goblin Barrel');
    const hasShooter = deck.some(card => ['Princess', 'Dart Goblin', 'Archers', 'Firecracker', 'Musketeer'].includes(card.name));
    const hasGoblinGang = deck.some(card => card.name === 'Goblin Gang');
    const hasLog = deck.some(card => card.name === 'The Log');
    const hasFastCycle = deck.some(card => ['Ice Spirit', 'Skeletons', 'Electro Spirit'].includes(card.name));
    const hasBuilding = deck.some(card => ['Cannon', 'Tesla', 'Inferno Tower', 'Goblin Cage'].includes(card.name));
    const hasHighDamageSpell = deck.some(card => ['Rocket', 'Fireball', 'Lightning'].includes(card.name));
    
    // Log bait needs: Goblin Barrel + Shooter + Goblin Gang + Log + Fast Cycle + Building + High Damage Spell
    // But we'll be more flexible - at least 6 out of 7 components
    const components = [hasGoblinBarrel, hasShooter, hasGoblinGang, hasLog, hasFastCycle, hasBuilding, hasHighDamageSpell];
    const componentCount = components.filter(Boolean).length;
    
    return hasGoblinBarrel && componentCount >= 6; // Must have Goblin Barrel and at least 6 components
  }

  // Check if deck is a bait deck (general)
  isBaitDeck(deck) {
    const baitCards = ['Goblin Barrel', 'Princess', 'Dart Goblin', 'Goblin Gang', 'Skeleton Barrel'];
    const baitCount = deck.filter(card => baitCards.includes(card.name)).length;
    return baitCount >= 2;
  }

  // Check if deck is a control deck
  isControlDeck(deck) {
    const controlCards = ['Graveyard', 'Witch', 'Ice Wizard', 'Poison', 'Tornado'];
    const controlCount = deck.filter(card => controlCards.includes(card.name)).length;
    return controlCount >= 2;
  }

  // Check if deck is a beatdown deck
  isBeatdownDeck(deck) {
    const beatdownCards = ['Golem', 'Lava Hound', 'Giant', 'Royal Giant', 'Goblin Giant', 'Electro Giant'];
    const beatdownCount = deck.filter(card => beatdownCards.includes(card.name)).length;
    return beatdownCount >= 1;
  }

  // Check if deck is a siege deck
  isSiegeDeck(deck) {
    const siegeCards = ['X-Bow', 'Mortar'];
    const siegeCount = deck.filter(card => siegeCards.includes(card.name)).length;
    return siegeCount >= 1;
  }

  // Check if deck is a bridge spam deck
  isBridgeSpamDeck(deck) {
    const bridgeSpamCards = ['Royal Hogs', 'Elite Barbarians', 'Dark Prince', 'Royal Ghost', 'Bandit'];
    const bridgeSpamCount = deck.filter(card => bridgeSpamCards.includes(card.name)).length;
    return bridgeSpamCount >= 2;
  }

  // Get popular meta decks for comparison (updated August 2025)
  getMetaDecks() {
    return [
      {
        name: 'GobGiant Sparky EBarbs',
        cards: ['Goblin Giant', 'Zap', 'Elite Barbarians', 'Sparky', 'Dark Prince', 'Electro Wizard', 'Heal Spirit', 'Rage'],
        archetype: 'Bridge Spam',
        rating: 'S',
        meta: 'Current Top Meta'
      },
      {
        name: 'X-Bow eSpirit Cycle',
        cards: ['Archers', 'Tesla', 'X-Bow', 'Knight', 'Skeletons', 'Electro Spirit', 'Fireball', 'The Log'],
        archetype: 'Siege',
        rating: 'S',
        meta: 'Current Top Meta'
      },
      {
        name: 'Royal Hogs Recruits Fireball Cage',
        cards: ['Royal Recruits', 'Goblin Cage', 'Royal Hogs', 'Zappies', 'Flying Machine', 'Fireball', 'Arrows', 'Barbarian Barrel'],
        archetype: 'Bridge Spam',
        rating: 'S',
        meta: 'Current Top Meta'
      },
      {
        name: 'Evo Witch Gob Hut Graveyard',
        cards: ['Knight', 'Witch', 'Graveyard', 'Ice Wizard', 'Skeletons', 'Goblin Hut', 'Poison', 'Barbarian Barrel'],
        archetype: 'Control',
        rating: 'A',
        meta: 'Current Meta'
      },
      {
        name: 'Evo Valk Wall Breakers Log Bait',
        cards: ['Goblin Barrel', 'Valkyrie', 'Wall Breakers', 'Princess', 'Dart Goblin', 'Goblin Gang', 'Ice Spirit', 'Cannon'],
        archetype: 'Spell Bait',
        rating: 'A',
        meta: 'Current Meta'
      },
      {
        name: '3.1 Royal Giant Ghost Cycle',
        cards: ['Royal Giant', 'Hunter', 'Royal Ghost', 'Fisherman', 'Skeletons', 'Electro Spirit', 'Lightning', 'The Log'],
        archetype: 'Cycle',
        rating: 'A',
        meta: 'Current Meta'
      },
      {
        name: 'Evo Furnace Berserker Graveyard',
        cards: ['Knight', 'Furnace', 'Graveyard', 'Berserker', 'Ice Spirit', 'Goblin Hut', 'Poison', 'Barbarian Barrel'],
        archetype: 'Control',
        rating: 'A',
        meta: 'Current Meta'
      },
      {
        name: 'Double Elixir Loon Freeze',
        cards: ['Lumberjack', 'Electro Dragon', 'Balloon', 'Bowler', 'Inferno Dragon', 'Freeze', 'Tornado', 'Barbarian Barrel'],
        archetype: 'Beatdown',
        rating: 'A',
        meta: 'Current Meta'
      }
    ];
  }

  // Enhanced analysis functions using deckcheck.devtools data
  
  // Get detailed card information
  getCardInfo(cardName) {
    return this.cardRoles[cardName] || {
      role: 'Unknown',
      description: 'Card information not available',
      elixir: 0,
      rarity: 'Unknown'
    };
  }

  // Analyze deck cycle potential
  analyzeCyclePotential(deck) {
    const cycleCards = deck.filter(card => this.cardProperties.cycleCards.includes(card.name));
    const cycleElixir = cycleCards.reduce((sum, card) => sum + card.elixirCost, 0);
    
    return {
      cycleCards: cycleCards,
      cycleElixir: cycleElixir,
      cycleCount: cycleCards.length,
      isFastCycle: cycleElixir <= 9,
      cycleDescription: cycleElixir <= 9 ? 'Fast cycle potential' : 'Standard cycle'
    };
  }

  // Analyze deck spell coverage
  analyzeSpellCoverage(deck) {
    const spells = this.findSpells(deck);
    const highDamageSpells = spells.filter(spell => this.cardProperties.highDamageSpells.includes(spell.name));
    const smallSpells = spells.filter(spell => spell.elixirCost <= 2);
    
    return {
      totalSpells: spells.length,
      highDamageSpells: highDamageSpells,
      smallSpells: smallSpells,
      hasHighDamage: highDamageSpells.length > 0,
      hasSmallSpells: smallSpells.length > 0,
      spellCoverage: this.getSpellCoverageRating(spells)
    };
  }

  // Get spell coverage rating
  getSpellCoverageRating(spells) {
    if (spells.length >= 3) return 'Excellent';
    if (spells.length === 2) return 'Good';
    if (spells.length === 1) return 'Limited';
    return 'Poor';
  }

  // Analyze deck air defense
  analyzeAirDefense(deck) {
    const airTargeters = deck.filter(card => this.cardProperties.airTargeters.includes(card.name));
    const airSpells = deck.filter(card => 
      this.cardProperties.airTargeters.includes(card.name) && 
      this.cardDatabase.spells.includes(card.name)
    );
    
    return {
      airTargeters: airTargeters,
      airSpells: airSpells,
      airDefenseCount: airTargeters.length,
      hasAirDefense: airTargeters.length > 0,
      airDefenseRating: this.getAirDefenseRating(airTargeters.length)
    };
  }

  // Get air defense rating
  getAirDefenseRating(count) {
    if (count >= 3) return 'Excellent';
    if (count === 2) return 'Good';
    if (count === 1) return 'Limited';
    return 'Poor';
  }

  // Analyze deck building targeting
  analyzeBuildingTargeting(deck) {
    const buildingTargeters = deck.filter(card => this.cardProperties.buildingTargeters.includes(card.name));
    const buildingSpells = deck.filter(card => 
      this.cardProperties.buildingTargeters.includes(card.name) && 
      this.cardDatabase.spells.includes(card.name)
    );
    
    return {
      buildingTargeters: buildingTargeters,
      buildingSpells: buildingSpells,
      buildingTargetCount: buildingTargeters.length,
      hasBuildingTargeting: buildingTargeters.length > 0,
      buildingTargetRating: this.getBuildingTargetRating(buildingTargeters.length)
    };
  }

  // Get building targeting rating
  getBuildingTargetRating(count) {
    if (count >= 2) return 'Excellent';
    if (count === 1) return 'Good';
    return 'Limited';
  }

  // Analyze deck swarm defense
  analyzeSwarmDefense(deck) {
    const swarms = deck.filter(card => this.cardProperties.swarms.includes(card.name));
    const areaSpells = deck.filter(card => 
      ['Arrows', 'Fireball', 'Poison', 'Lightning', 'Rocket', 'Freeze', 'Tornado'].includes(card.name)
    );
    
    return {
      swarms: swarms,
      areaSpells: areaSpells,
      swarmDefenseCount: swarms.length + areaSpells.length,
      hasSwarmDefense: swarms.length > 0 || areaSpells.length > 0,
      swarmDefenseRating: this.getSwarmDefenseRating(swarms.length + areaSpells.length)
    };
  }

  // Get swarm defense rating
  getSwarmDefenseRating(count) {
    if (count >= 3) return 'Excellent';
    if (count === 2) return 'Good';
    if (count === 1) return 'Limited';
    return 'Poor';
  }

  // Analyze deck tank presence
  analyzeTankPresence(deck) {
    const tanks = deck.filter(card => this.cardProperties.tanks.includes(card.name));
    const tankSupport = deck.filter(card => 
      !this.cardProperties.tanks.includes(card.name) && 
      card.elixirCost >= 4
    );
    
    return {
      tanks: tanks,
      tankSupport: tankSupport,
      tankCount: tanks.length,
      hasTank: tanks.length > 0,
      tankSupportCount: tankSupport.length,
      tankRating: this.getTankRating(tanks.length, tankSupport.length)
    };
  }

  // Get tank rating
  getTankRating(tankCount, supportCount) {
    if (tankCount >= 2) return 'Heavy';
    if (tankCount === 1 && supportCount >= 2) return 'Balanced';
    if (tankCount === 1) return 'Light';
    return 'None';
  }

  // Analyze deck spell bait potential
  analyzeSpellBaitPotential(deck) {
    const spellBaits = deck.filter(card => this.cardProperties.spellBaits.includes(card.name));
    const baitSpells = deck.filter(card => 
      this.cardProperties.spellBaits.includes(card.name) && 
      this.cardDatabase.spells.includes(card.name)
    );
    
    return {
      spellBaits: spellBaits,
      baitSpells: baitSpells,
      baitCount: spellBaits.length,
      hasSpellBait: spellBaits.length >= 2,
      baitRating: this.getBaitRating(spellBaits.length)
    };
  }

  // Get bait rating
  getBaitRating(count) {
    if (count >= 4) return 'Heavy Bait';
    if (count >= 2) return 'Moderate Bait';
    if (count === 1) return 'Light Bait';
    return 'No Bait';
  }

  // Enhanced deck analysis with detailed information
  analyzeDeckDetailed(deck) {
    if (!deck || deck.length !== 8) {
      throw new Error('Invalid deck: Must contain exactly 8 cards');
    }

    const basicAnalysis = this.analyzeDeck(deck);
    const cycleAnalysis = this.analyzeCyclePotential(deck);
    const spellAnalysis = this.analyzeSpellCoverage(deck);
    const airAnalysis = this.analyzeAirDefense(deck);
    const buildingAnalysis = this.analyzeBuildingTargeting(deck);
    const swarmAnalysis = this.analyzeSwarmDefense(deck);
    const tankAnalysis = this.analyzeTankPresence(deck);
    const baitAnalysis = this.analyzeSpellBaitPotential(deck);

    return {
      ...basicAnalysis,
      cycleAnalysis,
      spellAnalysis,
      airAnalysis,
      buildingAnalysis,
      swarmAnalysis,
      tankAnalysis,
      baitAnalysis,
      detailedStrengths: this.generateDetailedStrengths(deck, {
        cycleAnalysis,
        spellAnalysis,
        airAnalysis,
        buildingAnalysis,
        swarmAnalysis,
        tankAnalysis,
        baitAnalysis
      }),
      detailedWeaknesses: this.generateDetailedWeaknesses(deck, {
        cycleAnalysis,
        spellAnalysis,
        airAnalysis,
        buildingAnalysis,
        swarmAnalysis,
        tankAnalysis,
        baitAnalysis
      })
    };
  }

  // Generate detailed strengths based on enhanced analysis
  generateDetailedStrengths(deck, analysis) {
    const strengths = [];
    
    // Cycle analysis
    if (analysis.cycleAnalysis.isFastCycle) {
      strengths.push(`✅ **Fast Cycle:** ${analysis.cycleAnalysis.cycleElixir} elixir cycle (${analysis.cycleAnalysis.cycleCount} cycle cards)`);
    }
    
    // Spell analysis
    if (analysis.spellAnalysis.spellCoverage === 'Excellent') {
      strengths.push(`✅ **Excellent Spell Coverage:** ${analysis.spellAnalysis.totalSpells} spells with good variety`);
    } else if (analysis.spellAnalysis.spellCoverage === 'Good') {
      strengths.push(`✅ **Good Spell Coverage:** ${analysis.spellAnalysis.totalSpells} spells`);
    }
    
    // Air defense
    if (analysis.airAnalysis.airDefenseRating === 'Excellent') {
      strengths.push(`✅ **Strong Air Defense:** ${analysis.airAnalysis.airDefenseCount} air-targeting cards`);
    } else if (analysis.airAnalysis.airDefenseRating === 'Good') {
      strengths.push(`✅ **Good Air Defense:** ${analysis.airAnalysis.airDefenseCount} air-targeting cards`);
    }
    
    // Building targeting
    if (analysis.buildingAnalysis.buildingTargetRating === 'Excellent') {
      strengths.push(`✅ **Excellent Building Targeting:** ${analysis.buildingAnalysis.buildingTargetCount} building-targeting cards`);
    }
    
    // Swarm defense
    if (analysis.swarmAnalysis.swarmDefenseRating === 'Excellent') {
      strengths.push(`✅ **Strong Swarm Defense:** ${analysis.swarmAnalysis.swarmDefenseCount} swarm defense options`);
    }
    
    // Tank presence
    if (analysis.tankAnalysis.tankRating === 'Heavy') {
      strengths.push(`✅ **Heavy Tank Presence:** ${analysis.tankAnalysis.tankCount} tanks with good support`);
    } else if (analysis.tankAnalysis.tankRating === 'Balanced') {
      strengths.push(`✅ **Balanced Tank Support:** Tank with ${analysis.tankAnalysis.tankSupportCount} support cards`);
    }
    
    // Spell bait
    if (analysis.baitAnalysis.baitRating === 'Heavy Bait') {
      strengths.push(`✅ **Heavy Spell Bait:** ${analysis.baitAnalysis.baitCount} spell bait cards`);
    } else if (analysis.baitAnalysis.baitRating === 'Moderate Bait') {
      strengths.push(`✅ **Moderate Spell Bait:** ${analysis.baitAnalysis.baitCount} spell bait cards`);
    }
    
    return strengths;
  }

  // Generate detailed weaknesses based on enhanced analysis
  generateDetailedWeaknesses(deck, analysis) {
    const weaknesses = [];
    
    // Spell coverage
    if (analysis.spellAnalysis.spellCoverage === 'Poor') {
      weaknesses.push(`❌ **Poor Spell Coverage:** No spells for removal and finishing`);
    } else if (analysis.spellAnalysis.spellCoverage === 'Limited') {
      weaknesses.push(`❌ **Limited Spell Coverage:** Only ${analysis.spellAnalysis.totalSpells} spell(s)`);
    }
    
    // Air defense
    if (analysis.airAnalysis.airDefenseRating === 'Poor') {
      weaknesses.push(`❌ **Poor Air Defense:** No air-targeting cards`);
    } else if (analysis.airAnalysis.airDefenseRating === 'Limited') {
      weaknesses.push(`❌ **Limited Air Defense:** Only ${analysis.airAnalysis.airDefenseCount} air-targeting card(s)`);
    }
    
    // Building targeting
    if (analysis.buildingAnalysis.buildingTargetRating === 'Limited') {
      weaknesses.push(`❌ **Limited Building Targeting:** No building-targeting cards`);
    }
    
    // Swarm defense
    if (analysis.swarmAnalysis.swarmDefenseRating === 'Poor') {
      weaknesses.push(`❌ **Poor Swarm Defense:** No swarm defense options`);
    } else if (analysis.swarmAnalysis.swarmDefenseRating === 'Limited') {
      weaknesses.push(`❌ **Limited Swarm Defense:** Only ${analysis.swarmAnalysis.swarmDefenseCount} swarm defense option(s)`);
    }
    
    // Tank presence
    if (analysis.tankAnalysis.tankRating === 'None') {
      weaknesses.push(`❌ **No Tank Presence:** No tanks for protection`);
    }
    
    return weaknesses;
  }
}
