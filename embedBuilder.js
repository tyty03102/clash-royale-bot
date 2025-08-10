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
        { name: '📊 **Stats**', value: '`!cr stats` - View your stats\n`!cr stats <player_tag>` - View any player\'s stats\n`!cr stats @username` - View logged-in Discord user\'s stats\n`!cr deck` - Generate deck image\n`!cr deck <player_tag>` - Generate deck image for any player\n`!cr deck @username` - Generate deck image for Discord user', inline: false },
        { name: '⚔️ **Comparison**', value: '`!cr compare @username` - Compare your stats with another Discord user\n`!cr compare @user1 @user2` - Compare two Discord users', inline: false },
        { name: '👥 **Server**', value: '`!cr players` - List all logged in players in this server', inline: false },
        { name: '💾 **Admin**', value: '`!cr save` - Save user data to file\n`!cr reload` - Reload user data from file\n`!cr adminlogin @username <player_tag>` - Force login a Discord user (Admin only)', inline: false },
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
