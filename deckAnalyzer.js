export class DeckAnalyzer {
  constructor() {
    // Card database with meta information
    this.cardDatabase = {
      // Win conditions
      winConditions: [
        'Giant', 'Golem', 'Royal Giant', 'Hog Rider', 'Balloon', 'X-Bow', 'Mortar', 
        'Goblin Barrel', 'Graveyard', 'Royal Hogs', 'Ram Rider', 'Elixir Golem',
        'Goblin Giant', 'Lava Hound', 'Miner', 'Wall Breakers', 'Skeleton Barrel',
        'Giant Skeleton', 'Sparky', 'Mega Knight', 'P.E.K.K.A', 'Electro Giant'
      ],
      
      // Spells
      spells: [
        'Arrows', 'Fireball', 'Zap', 'Poison', 'Lightning', 'Rocket', 'Freeze',
        'Mirror', 'Clone', 'Tornado', 'Earthquake', 'Heal', 'Rage', 'The Log',
        'Barbarian Barrel', 'Giant Snowball', 'Royal Delivery', 'Graveyard',
        'Goblin Barrel', 'Skeleton Barrel', 'Wall Breakers'
      ],
      
      // Buildings
      buildings: [
        'Cannon', 'Inferno Tower', 'Tesla', 'Bomb Tower', 'X-Bow', 'Mortar',
        'Goblin Hut', 'Barbarian Hut', 'Furnace', 'Tombstone', 'Goblin Cage',
        'Inferno Dragon', 'Elixir Collector', 'Goblin Drill'
      ],
      
      // Support cards
      supportCards: [
        'Wizard', 'Witch', 'Valkyrie', 'Knight', 'Archers', 'Goblins', 'Spear Goblins',
        'Skeletons', 'Skeleton Army', 'Minions', 'Minion Horde', 'Baby Dragon',
        'Mega Minion', 'Dart Goblin', 'Princess', 'Ice Wizard', 'Electro Wizard',
        'Musketeer', 'Hunter', 'Executioner', 'Bowler', 'Dark Prince', 'Prince',
        'Bandit', 'Royal Ghost', 'Magic Archer', 'Fisherman', 'Cannon Cart',
        'Skeleton Dragons', 'Mother Witch', 'Goblin Gang', 'Fire Spirits',
        'Ice Spirit', 'Bats', 'Guards', 'Lumberjack', 'Inferno Dragon',
        'Night Witch', 'Lava Hound', 'Golem', 'P.E.K.K.A', 'Giant Skeleton',
        'Sparky', 'Mega Knight', 'Electro Giant', 'Royal Recruits', 'Elite Barbarians',
        'Royal Hogs', 'Three Musketeers', 'Goblin Barrel', 'Graveyard',
        'Skeleton Barrel', 'Wall Breakers', 'Ram Rider', 'Elixir Golem'
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

    // Common deck synergies
    this.synergies = {
      'Giant': ['Witch', 'Wizard', 'Musketeer', 'Baby Dragon', 'Mega Minion'],
      'Golem': ['Night Witch', 'Baby Dragon', 'Mega Minion', 'Lumberjack'],
      'Hog Rider': ['Fireball', 'Zap', 'Ice Spirit', 'Goblins', 'Cannon'],
      'X-Bow': ['Tesla', 'Archers', 'Knight', 'Ice Spirit', 'Fireball'],
      'Balloon': ['Lava Hound', 'Baby Dragon', 'Mega Minion', 'Freeze'],
      'Royal Giant': ['Furnace', 'Fireball', 'Zap', 'Mega Minion'],
      'Goblin Barrel': ['Princess', 'Goblin Gang', 'Knight', 'Inferno Tower'],
      'Graveyard': ['Freeze', 'Poison', 'Baby Dragon', 'Knight'],
      'Royal Hogs': ['Earthquake', 'Fireball', 'Zap', 'Cannon Cart'],
      'Ram Rider': ['Battle Ram', 'Bandit', 'Royal Ghost', 'Dark Prince']
    };
  }

  analyzeDeck(deck) {
    if (!deck || deck.length !== 8) {
      throw new Error('Invalid deck: Must contain exactly 8 cards');
    }

    const analysis = {
      deck: deck,
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

  // Get popular meta decks for comparison
  getMetaDecks() {
    return [
      {
        name: 'Hog 2.6 Cycle',
        cards: ['Hog Rider', 'Cannon', 'Fireball', 'Zap', 'Ice Spirit', 'Skeletons', 'Musketeer', 'Knight'],
        archetype: 'Cycle',
        rating: 'S'
      },
      {
        name: 'Golem Beatdown',
        cards: ['Golem', 'Night Witch', 'Baby Dragon', 'Mega Minion', 'Lumberjack', 'Zap', 'Poison', 'Tombstone'],
        archetype: 'Beatdown',
        rating: 'A'
      },
      {
        name: 'X-Bow 2.9',
        cards: ['X-Bow', 'Tesla', 'Archers', 'Knight', 'Ice Spirit', 'Fireball', 'The Log', 'Skeletons'],
        archetype: 'Siege',
        rating: 'A'
      },
      {
        name: 'Log Bait',
        cards: ['Goblin Barrel', 'Princess', 'Knight', 'Inferno Tower', 'Goblin Gang', 'The Log', 'Rocket', 'Ice Spirit'],
        archetype: 'Spell Bait',
        rating: 'A'
      }
    ];
  }
}
