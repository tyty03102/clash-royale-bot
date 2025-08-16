export class DeckAnalyzer {
  constructor() {
    // Card database with meta information (updated with all cards from cards_output.json)
    this.cardDatabase = {
      // Win conditions
      winConditions: [
        'Giant', 'Golem', 'Royal Giant', 'Hog Rider', 'Balloon', 'X-Bow', 'Mortar', 
        'Goblin Barrel', 'Graveyard', 'Royal Hogs', 'Ram Rider', 'Elixir Golem',
        'Goblin Giant', 'Lava Hound', 'Miner', 'Wall Breakers', 'Skeleton Barrel',
        'Giant Skeleton', 'Sparky', 'Mega Knight', 'P.E.K.K.A', 'Electro Giant',
        'Goblin Drill', 'Goblin Machine', 'Rune Giant', 'Boss Bandit'
      ],
      
      // Spells
      spells: [
        'Arrows', 'Fireball', 'Zap', 'Poison', 'Lightning', 'Rocket', 'Freeze',
        'Mirror', 'Clone', 'Tornado', 'Earthquake', 'Heal', 'Rage', 'The Log',
        'Barbarian Barrel', 'Giant Snowball', 'Royal Delivery', 'Graveyard',
        'Goblin Barrel', 'Skeleton Barrel', 'Wall Breakers', 'Void', 'Goblin Curse'
      ],
      
      // Buildings
      buildings: [
        'Cannon', 'Inferno Tower', 'Tesla', 'Bomb Tower', 'X-Bow', 'Mortar',
        'Goblin Hut', 'Barbarian Hut', 'Tombstone', 'Goblin Cage',
        'Inferno Dragon', 'Elixir Collector', 'Goblin Drill'
      ],
      
      // Support cards (complete list from cards_output.json)
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

    // Common deck synergies (updated with current meta and all cards)
    this.synergies = {
      'Giant': ['Witch', 'Wizard', 'Musketeer', 'Baby Dragon', 'Mega Minion'],
      'Golem': ['Night Witch', 'Baby Dragon', 'Mega Minion', 'Lumberjack'],
      'Hog Rider': ['Fireball', 'Zap', 'Ice Spirit', 'Goblins', 'Cannon'],
      'X-Bow': ['Tesla', 'Archers', 'Knight', 'Ice Spirit', 'Fireball'],
      'Balloon': ['Lava Hound', 'Baby Dragon', 'Mega Minion', 'Freeze'],
      'Royal Giant': ['Furnace', 'Fireball', 'Zap', 'Mega Minion', 'Hunter', 'Royal Ghost'],
      'Goblin Barrel': ['Princess', 'Goblin Gang', 'Knight', 'Inferno Tower', 'Valkyrie'],
      'Graveyard': ['Freeze', 'Poison', 'Baby Dragon', 'Knight', 'Furnace', 'Goblin Hut'],
      'Royal Hogs': ['Earthquake', 'Fireball', 'Zap', 'Cannon Cart', 'Royal Recruits', 'Zappies'],
      'Ram Rider': ['Battle Ram', 'Bandit', 'Royal Ghost', 'Dark Prince'],
      'Goblin Giant': ['Sparky', 'Dark Prince', 'Electro Wizard', 'Heal Spirit', 'Rage'],
      'Sparky': ['Goblin Giant', 'Dark Prince', 'Electro Wizard', 'Heal Spirit', 'Rage'],
      'Royal Recruits': ['Royal Hogs', 'Zappies', 'Flying Machine', 'Goblin Cage'],
      'Wall Breakers': ['Goblin Barrel', 'Valkyrie', 'Princess', 'Dart Goblin'],
      'Furnace': ['Graveyard', 'Royal Giant', 'Berserker', 'Ice Spirit'],
      'Lava Hound': ['Balloon', 'Baby Dragon', 'Mega Minion', 'Lightning'],
      'Mega Knight': ['Witch', 'Wizard', 'Baby Dragon', 'Mega Minion'],
      'P.E.K.K.A': ['Witch', 'Wizard', 'Baby Dragon', 'Mega Minion'],
      'Electro Giant': ['Witch', 'Wizard', 'Baby Dragon', 'Mega Minion'],
      'Miner': ['Balloon', 'Wall Breakers', 'Goblin Barrel', 'Poison'],
      'Elixir Golem': ['Battle Healer', 'Giant Skeleton', 'Rage'],
      'Skeleton Barrel': ['Goblin Barrel', 'Princess', 'Goblin Gang', 'Valkyrie'],
      'Giant Skeleton': ['Witch', 'Wizard', 'Baby Dragon', 'Mega Minion'],
      'Mortar': ['Tesla', 'Archers', 'Knight', 'Ice Spirit', 'Fireball']
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
      metaScore: this.calculateMetaScore(deck),
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

  findMetaCards(deck) {
    // Current meta cards based on August 2025 balance changes (established meta only)
    const currentMetaCards = [
      'Goblin Giant', 'Sparky', 'Elite Barbarians', 'Archers', 'Tesla', 'X-Bow',
      'Royal Recruits', 'Royal Hogs', 'Zappies', 'Flying Machine', 'Goblin Cage',
      'Witch', 'Graveyard', 'Goblin Hut', 'Valkyrie', 'Wall Breakers', 'Dart Goblin',
      'Royal Giant', 'Hunter', 'Royal Ghost', 'Furnace', 'Berserker', 'Lumberjack',
      'Electro Dragon', 'Balloon', 'Bowler', 'Inferno Dragon', 'Freeze', 'Furnace'
    ];
    return deck.filter(card => currentMetaCards.includes(card.name));
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

    // Check for meta relevance
    const metaCards = this.findMetaCards(deck);
    if (metaCards.length >= 3) {
      strengths.push(`✅ Good meta relevance with ${metaCards.length} current meta cards`);
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

    // Meta recommendations
    const metaCards = this.findMetaCards(deck);
    if (metaCards.length < 3) {
      recommendations.push({
        type: 'meta',
        message: 'Add more current meta cards for better competitive performance',
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

    // Bonus for current meta cards
    const metaCards = this.findMetaCards(deck);
    score += metaCards.length * 5;

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
      'S': 'Excellent deck with great synergies and meta relevance',
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
}
