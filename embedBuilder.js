import { EmbedBuilder as DiscordEmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { config } from './config.js';

export class EmbedBuilder {
  constructor() {
    this.colors = config.COLORS;
  }

  // Create main player stats embed with enhanced battle stats
  createPlayerStatsEmbed(playerStats, discordUser = null) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.PRIMARY)
      .setTitle(`🏆 ${playerStats.name}`)
      .setDescription(`Player Tag: \`${playerStats.tag}\``)
      .setThumbnail('https://api-assets.clashroyale.com/arenas/54000009.png')
      .addFields(
        { 
          name: '📊 **Level & Arena**', 
          value: `Level: **${playerStats.expLevel}**\nArena: **${playerStats.arena.name}**`, 
          inline: true 
        },
        { 
          name: '🏅 **Trophies**', 
          value: `Current: **${playerStats.trophies.toLocaleString()}**\nBest: **${playerStats.bestTrophies.toLocaleString()}**`, 
          inline: true 
        },
        { 
          name: '⭐ **Star Points**', 
          value: `**${playerStats.starPoints.toLocaleString()}**`, 
          inline: true 
        }
      );

    // Add enhanced battle stats section
    const totalGames = playerStats.battleCount || 0;
    const winRate = totalGames > 0 ? ((playerStats.wins / totalGames) * 100).toFixed(3) : 0;
    
    embed.addFields({
      name: '⚔️ **Battle Stats**',
      value: `**Wins:** ${playerStats.wins.toLocaleString()} (${winRate}%)\n**Losses:** ${playerStats.losses.toLocaleString()} (${(100 - parseFloat(winRate)).toFixed(3)}%)\n**Total Games:** ${totalGames.toLocaleString()}\n**Three Crown Wins:** ${playerStats.threeCrownWins.toLocaleString()}`,
      inline: false
    });

    // Add clan wars section
    embed.addFields({
      name: '🏰 **Clan Wars**',
      value: `**Clan Cards Collected:** ${playerStats.clanCardsCollected || 0}\n**War Day Wins:** ${playerStats.warDayWins || 0}`,
      inline: false
    });

    // Add time spent playing (estimated)
    const estimatedHours = Math.floor(totalGames * 3 / 60); // Assuming 3 minutes per game
    const estimatedMinutes = totalGames * 3 % 60;
    const timeSpent = `${estimatedHours}h ${estimatedMinutes}m`;
    
    embed.addFields({
      name: '⏱️ **Time Spent Playing**',
      value: `**Ladder + Challenges:** ${timeSpent}\n**Tournaments:** 0s\n**Total:** ${timeSpent}`,
      inline: false
    });

    // Add misc stats
    const cardsFound = this.countUniqueCards(playerStats);
    embed.addFields({
      name: '📈 **Misc Stats**',
      value: `**Experience:** Level ${playerStats.expLevel}\n**Cards Found:** ${cardsFound} / 120\n**Total Donations:** ${playerStats.totalDonations.toLocaleString()}\n**Star Points:** ${playerStats.starPoints.toLocaleString()}\n**Account Age:** ${this.calculateAccountAge(playerStats)}\n**Games per Day:** ${this.calculateGamesPerDay(playerStats)}`,
      inline: false
    });

    // Add clan info if available
    if (playerStats.clan) {
      embed.addFields({
        name: '🏰 **Clan**',
        value: `**${playerStats.clan.name}**\nTag: \`${playerStats.clan.tag}\``,
        inline: false
      });
    }

    embed.setFooter({ 
      text: discordUser ? `Requested by ${discordUser.username}` : 'Clash Royale Stats',
      iconURL: discordUser ? discordUser.displayAvatarURL() : null
    })
    .setTimestamp();

    return embed;
  }

  // Create enhanced deck embed that looks more like the image
  createDeckEmbed(playerStats, discordUser = null) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.INFO)
      .setTitle(`🃏 ${playerStats.name}'s Current Deck`)
      .setDescription(`**${playerStats.clan?.name || 'No Clan'}** • Average Elixir: **${this.calculateAverageElixir(playerStats.currentDeck)}**`)
      .setThumbnail('https://api-assets.clashroyale.com/cards/300/CoZdp5PpsTH858l212lAMeJxVJ0zxv9V-f5xC8Bvj5g.png');

    // Create a grid-like display for the deck (2 rows of 4 cards)
    const deck = playerStats.currentDeck || [];
    if (deck.length > 0) {
      // First row (cards 1-4)
      let firstRow = '';
      for (let i = 0; i < Math.min(4, deck.length); i++) {
        const card = deck[i];
        const evolutionText = card.evolutionLevel ? ' (Evolved)' : '';
        firstRow += `**${i + 1}.** ${card.name}${evolutionText}\n`;
      }
      
      // Second row (cards 5-8)
      let secondRow = '';
      for (let i = 4; i < Math.min(8, deck.length); i++) {
        const card = deck[i];
        const evolutionText = card.evolutionLevel ? ' (Evolved)' : '';
        secondRow += `**${i + 1}.** ${card.name}${evolutionText}\n`;
      }

      embed.addFields(
        { name: '🃏 **Deck Cards**', value: firstRow, inline: true },
        { name: '\u200b', value: secondRow, inline: true }
      );

      // Add card details in a more organized way with levels prominently displayed
      let cardDetails = '';
      deck.forEach((card, index) => {
        const evolutionText = card.evolutionLevel ? ' (Evolved)' : '';
        const rarityEmoji = this.getRarityEmoji(card.rarity);
        cardDetails += `${rarityEmoji} **${card.name}**${evolutionText}\n**Level ${card.level}** • ${card.elixirCost} elixir\n\n`;
      });

      embed.addFields({
        name: '📋 **Card Details**',
        value: cardDetails,
        inline: false
      });
    } else {
      embed.addFields({
        name: '❌ **No Deck Found**',
        value: 'This player does not have a current deck set.',
        inline: false
      });
    }

    embed.setFooter({ 
      text: discordUser ? `Requested by ${discordUser.username}` : 'Current Deck',
      iconURL: discordUser ? discordUser.displayAvatarURL() : null
    })
    .setTimestamp();

    return embed;
  }

  // Create deck analysis embed with recommendations
  createDeckAnalysisEmbed(deckAnalysis, playerStats, discordUser = null, deckSource = 'Current Deck') {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.getRatingColor(deckAnalysis.rating.rating))
      .setTitle(`🔍 ${playerStats.name}'s Deck Analysis`)
      .setDescription(`**${deckAnalysis.deckName || 'Auto-Generated Deck'}**\n**${deckSource}** • **${deckAnalysis.archetype}** • Average Elixir: **${deckAnalysis.averageElixir}**`)
      .setThumbnail('https://api-assets.clashroyale.com/cards/300/CoZdp5PpsTH858l212lAMeJxVJ0zxv9V-f5xC8Bvj5g.png');

    // Rating and meta score
    const stars = '⭐'.repeat(deckAnalysis.rating.stars);
    embed.addFields({
      name: `🏆 **Deck Rating: ${deckAnalysis.rating.rating}** ${stars}`,
      value: `**Meta Score:** ${deckAnalysis.metaScore}/100\n**${deckAnalysis.rating.description}**`,
      inline: false
    });

    // Deck composition
    const winConditions = deckAnalysis.winCondition.map(wc => wc.name).join(', ') || 'None';
    const spells = deckAnalysis.spells.map(s => s.name).join(', ') || 'None';
    const buildings = deckAnalysis.buildings.map(b => b.name).join(', ') || 'None';

    embed.addFields(
      { name: '🎯 **Win Conditions**', value: winConditions, inline: true },
      { name: '⚡ **Spells**', value: spells, inline: true },
      { name: '🏗️ **Buildings**', value: buildings, inline: true }
    );

    // Synergies
    if (deckAnalysis.synergies.length > 0) {
      let synergyText = '';
      deckAnalysis.synergies.forEach(synergy => {
        synergyText += `**${synergy.winCondition}** + ${synergy.presentCards.join(', ')} (${synergy.synergyScore.toFixed(0)}%)\n`;
      });
      embed.addFields({
        name: '🤝 **Card Synergies**',
        value: synergyText,
        inline: false
      });
    }

    // Strengths
    if (deckAnalysis.strengths.length > 0) {
      embed.addFields({
        name: '✅ **Strengths**',
        value: deckAnalysis.strengths.join('\n'),
        inline: false
      });
    }

    // Weaknesses
    if (deckAnalysis.weaknesses.length > 0) {
      embed.addFields({
        name: '❌ **Weaknesses**',
        value: deckAnalysis.weaknesses.join('\n'),
        inline: false
      });
    }

    // Recommendations
    if (deckAnalysis.recommendations.length > 0) {
      let recommendationsText = '';
      deckAnalysis.recommendations.forEach(rec => {
        const priorityEmoji = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
        recommendationsText += `${priorityEmoji} **${rec.type.toUpperCase()}:** ${rec.message}\n`;
      });
      embed.addFields({
        name: '💡 **Recommendations**',
        value: recommendationsText,
        inline: false
      });
    }

    embed.setFooter({ 
      text: discordUser ? `Requested by ${discordUser.username}` : 'Deck Analysis',
      iconURL: discordUser ? discordUser.displayAvatarURL() : null
    })
    .setTimestamp();

    return embed;
  }

  // Get color based on deck rating
  getRatingColor(rating) {
    const colors = {
      'S': 0x00ff00, // Green
      'A': 0x00ff88, // Light green
      'B': 0xffff00, // Yellow
      'C': 0xff8800, // Orange
      'D': 0xff0000  // Red
    };
    return colors[rating] || this.colors.INFO;
  }



  // Create enhanced comparison embed with more detailed stats
  createComparisonEmbed(player1Stats, player2Stats, discordUser = null, player1DiscordUser = null, player2DiscordUser = null) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.WARNING)
      .setTitle('⚔️ Player Comparison')
      .setDescription(`Comparing **${player1Stats.name}** vs **${player2Stats.name}**`);

    // Basic stats comparison
    embed.addFields(
      {
        name: '🏆 **Trophies**',
        value: `${player1Stats.name}: **${player1Stats.trophies.toLocaleString()}**\n${player2Stats.name}: **${player2Stats.trophies.toLocaleString()}**`,
        inline: true
      },
      {
        name: '📊 **Level**',
        value: `${player1Stats.name}: **${player1Stats.expLevel}**\n${player2Stats.name}: **${player2Stats.expLevel}**`,
        inline: true
      },
      {
        name: '⭐ **Star Points**',
        value: `${player1Stats.name}: **${player1Stats.starPoints.toLocaleString()}**\n${player2Stats.name}: **${player2Stats.starPoints.toLocaleString()}**`,
        inline: true
      }
    );

    // Battle stats comparison
    const p1WinRate = player1Stats.battleCount > 0 ? ((player1Stats.wins / player1Stats.battleCount) * 100).toFixed(1) : 0;
    const p2WinRate = player2Stats.battleCount > 0 ? ((player2Stats.wins / player2Stats.battleCount) * 100).toFixed(1) : 0;
    
    embed.addFields(
      {
        name: '⚔️ **Battle Stats**',
        value: `${player1Stats.name}: **${player1Stats.wins.toLocaleString()}** wins (${p1WinRate}%)\n${player2Stats.name}: **${player2Stats.wins.toLocaleString()}** wins (${p2WinRate}%)`,
        inline: true
      },
      {
        name: '👑 **Three Crown Wins**',
        value: `${player1Stats.name}: **${player1Stats.threeCrownWins.toLocaleString()}**\n${player2Stats.name}: **${player2Stats.threeCrownWins.toLocaleString()}**`,
        inline: true
      },
      {
        name: '🎁 **Total Donations**',
        value: `${player1Stats.name}: **${player1Stats.totalDonations.toLocaleString()}**\n${player2Stats.name}: **${player2Stats.totalDonations.toLocaleString()}**`,
        inline: true
      }
    );

    // Clan wars comparison
    embed.addFields({
      name: '🏰 **Clan Wars**',
      value: `${player1Stats.name}: **${player1Stats.clanCardsCollected || 0}** cards, **${player1Stats.warDayWins || 0}** wins\n${player2Stats.name}: **${player2Stats.clanCardsCollected || 0}** cards, **${player2Stats.warDayWins || 0}** wins`,
      inline: false
    });

    // Cards found comparison
    const p1Cards = this.countUniqueCards(player1Stats);
    const p2Cards = this.countUniqueCards(player2Stats);
    
    embed.addFields({
      name: '🃏 **Collection Progress**',
      value: `${player1Stats.name}: **${p1Cards}/120** cards\n${player2Stats.name}: **${p2Cards}/120** cards`,
      inline: false
    });

    // Discord user information if available
    if (player1DiscordUser && player2DiscordUser) {
      embed.addFields({
        name: '👥 **Discord Users**',
        value: `${player1Stats.name}: **${player1DiscordUser.username}**\n${player2Stats.name}: **${player2DiscordUser.username}**`,
        inline: false
      });
    }

    embed.setFooter({ 
      text: discordUser ? `Requested by ${discordUser.username}` : 'Player Comparison',
      iconURL: discordUser ? discordUser.displayAvatarURL() : null
    })
    .setTimestamp();

    return embed;
  }

  // Create login success embed
  createLoginSuccessEmbed(playerStats, discordUser) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.SUCCESS)
      .setTitle('✅ Login Successful!')
      .setDescription(`Welcome back, **${playerStats.name}**!`)
      .addFields(
        { name: 'Player Tag', value: `\`${playerStats.tag}\``, inline: true },
        { name: 'Current Trophies', value: `**${playerStats.trophies.toLocaleString()}**`, inline: true },
        { name: 'Level', value: `**${playerStats.expLevel}**`, inline: true }
      )
      .setThumbnail('https://api-assets.clashroyale.com/arenas/54000009.png')
      .setFooter({ 
        text: `Logged in as ${discordUser.username}`,
        iconURL: discordUser.displayAvatarURL()
      })
      .setTimestamp();

    return embed;
  }

  // Create logout success embed
  createLogoutSuccessEmbed(discordUser) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.INFO)
      .setTitle('👋 Logged Out Successfully')
      .setDescription(`You have been logged out of your Clash Royale account.`)
      .setFooter({ 
        text: `Logged out by ${discordUser.username}`,
        iconURL: discordUser.displayAvatarURL()
      })
      .setTimestamp();

    return embed;
  }

  // Create admin login success embed
  createAdminLoginSuccessEmbed(playerStats, targetUser, adminUser) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.WARNING)
      .setTitle('🔐 Admin Force Login Successful')
      .setDescription(`**${targetUser.username}** has been forcefully logged in as **${playerStats.name}** by an administrator.`)
      .addFields(
        { name: '🏆 **Player Info**', value: `Tag: \`${playerStats.tag}\`\nLevel: **${playerStats.expLevel}**\nArena: **${playerStats.arena.name}**`, inline: true },
        { name: '📊 **Stats**', value: `Trophies: **${playerStats.trophies.toLocaleString()}**\nBest: **${playerStats.bestTrophies.toLocaleString()}**\nWins: **${playerStats.wins.toLocaleString()}**`, inline: true },
        { name: '🏰 **Clan**', value: playerStats.clan ? `**${playerStats.clan.name}**` : 'No Clan', inline: true },
        { name: '👑 **Admin Action**', value: `Force login performed by **${adminUser.username}**\nThis action bypassed normal login restrictions.`, inline: false }
      )
      .setThumbnail('https://api-assets.clashroyale.com/arenas/54000009.png')
      .setFooter({ 
        text: `Admin action by ${adminUser.username}`,
        iconURL: adminUser.displayAvatarURL()
      })
      .setTimestamp();

    return embed;
  }

  // Create admin link success embed
  createAdminLinkSuccessEmbed(playerStats, targetUser, adminUser) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.INFO)
      .setTitle('🔗 Admin Account Link Successful')
      .setDescription(`**${targetUser.username}** has been linked to **${playerStats.name}** by an administrator.\n\n⚠️ **This account can now be shared by multiple Discord users.**`)
      .addFields(
        { name: '🏆 **Player Info**', value: `Tag: \`${playerStats.tag}\`\nLevel: **${playerStats.expLevel}**\nArena: **${playerStats.arena.name}**`, inline: true },
        { name: '📊 **Stats**', value: `Trophies: **${playerStats.trophies.toLocaleString()}**\nBest: **${playerStats.bestTrophies.toLocaleString()}**\nWins: **${playerStats.wins.toLocaleString()}**`, inline: true },
        { name: '🏰 **Clan**', value: playerStats.clan ? `**${playerStats.clan.name}**` : 'No Clan', inline: true },
        { name: '🔗 **Link Action**', value: `Account link performed by **${adminUser.username}**\nThis account can now be accessed by multiple Discord users.`, inline: false }
      )
      .setThumbnail('https://api-assets.clashroyale.com/arenas/54000009.png')
      .setFooter({ 
        text: `Admin link by ${adminUser.username}`,
        iconURL: adminUser.displayAvatarURL()
      })
      .setTimestamp();

    return embed;
  }

  // Create error embed
  createErrorEmbed(error, discordUser = null) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.ERROR)
      .setTitle('❌ Error')
      .setDescription(`**${error.message}**`)
      .setFooter({ 
        text: discordUser ? `Requested by ${discordUser.username}` : 'Error',
        iconURL: discordUser ? discordUser.displayAvatarURL() : null
      })
      .setTimestamp();

    return embed;
  }

  // Create success embed
  createSuccessEmbed(message, discordUser = null) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.SUCCESS)
      .setTitle('✅ Success')
      .setDescription(`**${message}**`)
      .setFooter({ 
        text: discordUser ? `Requested by ${discordUser.username}` : 'Success',
        iconURL: discordUser ? discordUser.displayAvatarURL() : null
      })
      .setTimestamp();

    return embed;
  }

  // Create help embed
  createHelpEmbed(discordUser = null) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.INFO)
      .setTitle('🤖 Clash Royale Bot Commands')
      .setDescription('Here are all the available commands:')
      .addFields(
        { name: '🔐 **Login/Logout**', value: '`!cr login <player_tag>` - Login with your player tag\n`!cr logout` - Logout from your account', inline: false },
        { name: '📊 **Stats**', value: '`!cr stats` - View your stats\n`!cr stats <player_tag>` - View any player\'s stats\n`!cr stats @username` - View logged-in Discord user\'s stats\n`!cr deck` - Generate deck image\n`!cr deck <player_tag>` - Generate deck image for any player\n`!cr deck @username` - Generate deck image for Discord user\n`!cr deck check` - Analyze deck with recommendations\n`!cr deck check <player_tag>` - Analyze any player\'s deck\n`!cr deck check @username` - Analyze Discord user\'s deck', inline: false },
        { name: '⚔️ **Battle Log**', value: '`!cr battles` - View your 5 most recent battles\n`!cr battles <player_tag>` - View any player\'s battles\n`!cr battles @username` - View logged-in Discord user\'s battles', inline: false },
        { name: '🏆 **Challenges**', value: '`!cr challenges` - View currently available challenges', inline: false },
        { name: '⚔️ **Comparison**', value: '`!cr compare @username` - Compare your stats with another Discord user\n`!cr compare @user1 @user2` - Compare two Discord users', inline: false },
        { name: '👥 **Server**', value: '`!cr players` - List all logged in players in this server', inline: false },
        { name: '💾 **Admin**', value: '`!cr save` - Save user data to file\n`!cr reload` - Reload user data from file\n`!cr adminlogin @username <player_tag>` - Force login a Discord user (Admin only)\n`!cr adminlink @username <player_tag>` - Link Discord user to shared Clash account (Admin only)', inline: false },
        { name: '❓ **Help**', value: '`!cr help` - Show this help message', inline: false }
      )
      .addFields({
        name: '💡 **Tips**',
        value: '• Player tags can be found in your Clash Royale profile\n• You can use tags with or without the # symbol\n• Make sure to login first before using other commands\n• User data is automatically saved and restored on bot restart',
        inline: false
      })
      .setFooter({ 
        text: discordUser ? `Requested by ${discordUser.username}` : 'Help',
        iconURL: discordUser ? discordUser.displayAvatarURL() : null
      })
      .setTimestamp();

    return embed;
  }

  // Create logged in players list embed
  createPlayersListEmbed(players, discordUser = null) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.INFO)
      .setTitle('👥 Logged In Players')
      .setDescription(players.length > 0 ? 'Here are all the players currently logged in:' : 'No players are currently logged in.');

    if (players.length > 0) {
      players.forEach((player, index) => {
        const discordInfo = player.discordUsername ? `Discord: **${player.discordUsername}**` : 'Discord: Unknown';
        embed.addFields({
          name: `${index + 1}. ${player.playerName}`,
          value: `Tag: \`${player.playerTag}\`\n${discordInfo}\nLogged in: <t:${Math.floor(player.loginTime.getTime() / 1000)}:R>`,
          inline: true
        });
      });
    }

    embed.setFooter({ 
      text: discordUser ? `Requested by ${discordUser.username}` : 'Server Players',
      iconURL: discordUser ? discordUser.displayAvatarURL() : null
    })
    .setTimestamp();

    return embed;
  }

  // Helper method to calculate average elixir cost
  calculateAverageElixir(deck) {
    if (!deck || deck.length === 0) return 0;
    const totalElixir = deck.reduce((sum, card) => sum + card.elixirCost, 0);
    return (totalElixir / deck.length).toFixed(1);
  }

  // Helper method to count unique cards found
  countUniqueCards(playerStats) {
    if (!playerStats.cards || !Array.isArray(playerStats.cards)) {
      return 0;
    }
    return playerStats.cards.length;
  }

  // Helper method to calculate account age (estimated)
  calculateAccountAge(playerStats) {
    // Estimate account age based on experience level
    // This is a rough estimation - in reality, you'd need account creation date
    const estimatedDays = Math.floor(playerStats.totalExpPoints / 100); // Rough estimate
    const years = Math.floor(estimatedDays / 365);
    const weeks = Math.floor((estimatedDays % 365) / 7);
    const days = estimatedDays % 7;
    
    if (years > 0) {
      return `${years}y ${weeks}w ${days}d`;
    } else if (weeks > 0) {
      return `${weeks}w ${days}d`;
    } else {
      return `${days}d`;
    }
  }

  // Helper method to calculate games per day (estimated)
  calculateGamesPerDay(playerStats) {
    // Estimate games per day based on total games and estimated account age
    const estimatedDays = Math.floor(playerStats.totalExpPoints / 100);
    if (estimatedDays > 0) {
      return (playerStats.battleCount / estimatedDays).toFixed(2);
    }
    return 'N/A';
  }

  // Helper method to get rarity emoji
  getRarityEmoji(rarity) {
    switch (rarity) {
      case 'Common':
        return '🟢';
      case 'Rare':
        return '🟡';
      case 'Epic':
        return '🔵';
      case 'Legendary':
        return '🟣';
      default:
        return '⚪';
    }
  }

  // Create battle log embed showing recent battles
  createBattleLogEmbed(battles, discordUser = null) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.INFO)
      .setTitle('⚔️ Recent Battle Log')
      .setDescription(`Showing the **5 most recent battles**`)
      .setThumbnail('https://api-assets.clashroyale.com/arenas/54000009.png');

    if (!battles || battles.length === 0) {
      embed.addFields({
        name: '❌ No Battles Found',
        value: 'No recent battle data available for this player.',
        inline: false
      });
    } else {
      battles.forEach((battle, index) => {
        // Fix timestamp parsing
        let formattedTime = 'Unknown time';
        try {
          const battleTime = new Date(battle.battleTime);
          if (!isNaN(battleTime.getTime())) {
            formattedTime = `<t:${Math.floor(battleTime.getTime() / 1000)}:R>`;
          }
        } catch (error) {
          console.error('Error parsing battle time:', error);
        }

        // Get player and opponent info
        const player = battle.team?.[0] || {};
        const opponent = battle.opponent?.[0] || {};

        // Determine result
        const playerCrowns = player.crowns ?? 0;
        const opponentCrowns = opponent.crowns ?? 0;
        let result = 'Draw';
        let resultEmoji = '🟡';
        if (playerCrowns > opponentCrowns) {
          result = 'Victory';
          resultEmoji = '🟢';
        } else if (playerCrowns < opponentCrowns) {
          result = 'Defeat';
          resultEmoji = '🔴';
        }

        // Trophies info
        const startingTrophies = player.startingTrophies ?? null;
        const trophyChange = typeof player.trophyChange === 'number' ? player.trophyChange : null;
        const endingTrophies = (startingTrophies !== null && trophyChange !== null)
          ? startingTrophies + trophyChange
          : null;
        const trophyEmoji = (trophyChange ?? 0) > 0 ? '📈' : (trophyChange ?? 0) < 0 ? '📉' : '➖';
        const trophyChangeText = trophyChange !== null ? (trophyChange > 0 ? `+${trophyChange}` : `${trophyChange}`) : 'N/A';
        const trophiesLine = (startingTrophies !== null && endingTrophies !== null)
          ? `🏅 ${startingTrophies} → ${endingTrophies} (${trophyEmoji} ${trophyChangeText})`
          : `🏅 ${trophyEmoji} ${trophyChangeText}`;

        // HP info - simplified
        const playerKTHP = player.kingTowerHitPoints ?? '—';
        const opponentKTHP = opponent.kingTowerHitPoints ?? '—';

        // Cards summary - simplified
        const playerDeckNames = Array.isArray(player.cards)
          ? player.cards.map(c => c?.name).filter(Boolean).slice(0, 4).join(', ') + (player.cards.length > 4 ? '...' : '')
          : '';

        // Misc battle info
        const modeName = battle.gameMode?.name || 'Unknown Mode';
        const arenaName = battle.arena?.name || 'Unknown Arena';

        const playerClan = player.clan?.name ? ` • ${player.clan.name}` : '';
        const playerTag = player.tag ? ` (${player.tag})` : '';
        const opponentTag = opponent.tag ? ` (${opponent.tag})` : '';

        const playerElixirLeaked = typeof player.elixirLeaked === 'number' ? player.elixirLeaked.toFixed(1) : null;
        const opponentElixirLeaked = typeof opponent.elixirLeaked === 'number' ? opponent.elixirLeaked.toFixed(1) : null;

        // Create simplified battle summary
        const summaryLines = [
          `${resultEmoji} **${result}** (${playerCrowns}-${opponentCrowns})`,
          trophiesLine,
          `🎮 ${modeName} • 🏟️ ${arenaName}`,
          `⏰ ${formattedTime}`,
          `👤 ${player.name || 'You'}${playerTag}${playerClan}`,
          `🆚 ${opponent.name || 'Opponent'}${opponentTag}`,
        ];

        // Add HP info if available
        if (playerKTHP !== '—' || opponentKTHP !== '—') {
          summaryLines.push(`💖 HP — You: ${playerKTHP} | Opp: ${opponentKTHP}`);
        }

        // Add elixir info if available
        if (playerElixirLeaked !== null || opponentElixirLeaked !== null) {
          const elixirParts = [];
          if (playerElixirLeaked !== null) elixirParts.push(`You: ${playerElixirLeaked}`);
          if (opponentElixirLeaked !== null) elixirParts.push(`Opp: ${opponentElixirLeaked}`);
          summaryLines.push(`🧪 Elixir leaked — ${elixirParts.join(' | ')}`);
        }

        // Add deck info if available
        if (playerDeckNames) {
          summaryLines.push(`🃏 Deck: ${playerDeckNames}`);
        }

        const battleSummary = summaryLines.join('\n');

        embed.addFields({
          name: `Battle ${index + 1}: ${player.name || 'You'} vs ${opponent.name || 'Opponent'}`,
          value: battleSummary,
          inline: false
        });
      });
    }

    embed.setFooter({ 
      text: discordUser ? `Requested by ${discordUser.username}` : 'Battle Log',
      iconURL: discordUser ? discordUser.displayAvatarURL() : null
    })
    .setTimestamp();

    return embed;
  }

  // Create challenges embed showing available challenges
  createChallengesEmbed(challenges, discordUser = null) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.INFO)
      .setTitle('🏆 Available Challenges')
      .setDescription(`Showing **${challenges.length}** currently available challenges`)
      .setThumbnail('https://api-assets.clashroyale.com/arenas/54000009.png');

    if (!challenges || challenges.length === 0) {
      embed.addFields({
        name: '❌ No Challenges Found',
        value: 'No challenges are currently available.',
        inline: false
      });
    } else {
      challenges.forEach((challengeGroup, groupIndex) => {
        const challengeType = challengeGroup.type || 'Unknown';
        const startTime = new Date(challengeGroup.startTime);
        const endTime = new Date(challengeGroup.endTime);
        const formattedStartTime = `<t:${Math.floor(startTime.getTime() / 1000)}:R>`;
        const formattedEndTime = `<t:${Math.floor(endTime.getTime() / 1000)}:R>`;

        // Add challenge group header
        embed.addFields({
          name: `📋 Challenge Group ${groupIndex + 1}: ${challengeType}`,
          value: `⏰ **Duration:** ${formattedStartTime} → ${formattedEndTime}`,
          inline: false
        });

        // Add individual challenges
        if (challengeGroup.challenges && Array.isArray(challengeGroup.challenges)) {
          challengeGroup.challenges.forEach((challenge, challengeIndex) => {
            const challengeName = challenge.name || 'Unknown Challenge';
            const description = challenge.description || 'No description available';
            const gameMode = challenge.gameMode?.name || 'Unknown Mode';
            const maxWins = challenge.maxWins || 0;
            const maxLosses = challenge.maxLosses || 0;
            const winMode = challenge.winMode || 'Unknown';
            const isCasual = challenge.casual ? 'Yes' : 'No';

            // Process prizes
            const prizes = challenge.prizes || [];
            const prizeSummary = prizes.map((prize, index) => {
              if (prize.type === 'none') return null;
              if (prize.type === 'consumable') {
                return `${index + 1} win${index > 0 ? 's' : ''}: ${prize.amount}x ${prize.consumableName || 'Unknown Item'}`;
              }
              return `${index + 1} win${index > 0 ? 's' : ''}: ${prize.type}`;
            }).filter(Boolean).join('\n');

            const challengeInfo = [
              `📝 **${description}**`,
              `🎮 **Game Mode:** ${gameMode}`,
              `🏆 **Format:** ${maxWins} wins or ${maxLosses} losses`,
              `🎯 **Win Mode:** ${winMode}`,
              `🎲 **Casual:** ${isCasual}`,
              `⏰ **Active:** ${formattedStartTime} → ${formattedEndTime}`
            ];

            if (prizeSummary) {
              challengeInfo.push(`\n🏅 **Prizes:**\n${prizeSummary}`);
            }

            embed.addFields({
              name: `${challengeIndex + 1}. ${challengeName} (ID: ${challenge.id})`,
              value: challengeInfo.join('\n'),
              inline: false
            });
          });
        }
      });
    }

    embed.setFooter({ 
      text: discordUser ? `Requested by ${discordUser.username}` : 'Available Challenges',
      iconURL: discordUser ? discordUser.displayAvatarURL() : null
    })
    .setTimestamp();

    return embed;
  }

  // Create action row with buttons for interactive features
  createActionRow() {
    return new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('view_deck')
          .setLabel('View Deck')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('🃏'),

        new ButtonBuilder()
          .setCustomId('analyze_deck')
          .setLabel('Analyze Deck')
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('🔍'),

        new ButtonBuilder()
          .setCustomId('compare_stats')
          .setLabel('Compare')
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('⚔️'),
        new ButtonBuilder()
          .setCustomId('refresh_stats')
          .setLabel('Refresh')
          .setStyle(ButtonStyle.Success)
          .setEmoji('🔄')
      );
  }
}
