import { EmbedBuilder as DiscordEmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { config } from './config.js';

export class EmbedBuilder {
  constructor() {
    this.colors = config.COLORS;
  }

  // Create main player stats embed
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
          name: '⚔️ **Battle Stats**', 
          value: `Wins: **${playerStats.wins.toLocaleString()}**\nLosses: **${playerStats.losses.toLocaleString()}**\nWin Rate: **${playerStats.winRate}%**`, 
          inline: true 
        },
        { 
          name: '👑 **Three Crown Wins**', 
          value: `**${playerStats.threeCrownWins.toLocaleString()}**`, 
          inline: true 
        },
        { 
          name: '🎁 **Donations**', 
          value: `Given: **${playerStats.donations.toLocaleString()}**\nReceived: **${playerStats.donationsReceived.toLocaleString()}**`, 
          inline: true 
        },
        { 
          name: '⭐ **Star Points**', 
          value: `**${playerStats.starPoints.toLocaleString()}**`, 
          inline: true 
        }
      )
      .setFooter({ 
        text: discordUser ? `Requested by ${discordUser.username}` : 'Clash Royale Stats',
        iconURL: discordUser ? discordUser.displayAvatarURL() : null
      })
      .setTimestamp();

    // Add clan info if available
    if (playerStats.clan) {
      embed.addFields({
        name: '🏰 **Clan**',
        value: `**${playerStats.clan.name}**\nTag: \`${playerStats.clan.tag}\``,
        inline: false
      });
    }

    return embed;
  }

  // Create detailed deck embed
  createDeckEmbed(playerStats, discordUser = null) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.INFO)
      .setTitle(`🃏 ${playerStats.name}'s Current Deck`)
      .setDescription(`Average Elixir Cost: **${this.calculateAverageElixir(playerStats.currentDeck)}**`)
      .setThumbnail('https://api-assets.clashroyale.com/cards/300/CoZdp5PpsTH858l212lAMeJxVJ0zxv9V-f5xC8Bvj5g.png');

    // Add each card to the embed
    playerStats.currentDeck.forEach((card, index) => {
      const evolutionText = card.evolutionLevel ? ` (Evolved)` : '';
      embed.addFields({
        name: `${index + 1}. ${card.name}${evolutionText}`,
        value: `Level: **${card.level}** | Cost: **${card.elixirCost}** | Rarity: **${card.rarity}**`,
        inline: true
      });
    });

    embed.setFooter({ 
      text: discordUser ? `Requested by ${discordUser.username}` : 'Current Deck',
      iconURL: discordUser ? discordUser.displayAvatarURL() : null
    })
    .setTimestamp();

    return embed;
  }

  // Create comparison embed
  createComparisonEmbed(player1Stats, player2Stats, discordUser = null, player1DiscordUser = null, player2DiscordUser = null) {
    const embed = new DiscordEmbedBuilder()
      .setColor(this.colors.WARNING)
      .setTitle('⚔️ Player Comparison')
      .setDescription(`Comparing **${player1Stats.name}** vs **${player2Stats.name}**`)
      .addFields(
        {
          name: '🏆 **Trophies**',
          value: `${player1Stats.name}: **${player1Stats.trophies.toLocaleString()}**\n${player2Stats.name}: **${player2Stats.trophies.toLocaleString()}**`,
          inline: true
        },
        {
          name: '📊 **Win Rate**',
          value: `${player1Stats.name}: **${player1Stats.winRate}%**\n${player2Stats.name}: **${player2Stats.winRate}%**`,
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
        },
        {
          name: '⭐ **Star Points**',
          value: `${player1Stats.name}: **${player1Stats.starPoints.toLocaleString()}**\n${player2Stats.name}: **${player2Stats.starPoints.toLocaleString()}**`,
          inline: true
        },
        {
          name: '📈 **Level**',
          value: `${player1Stats.name}: **${player1Stats.expLevel}**\n${player2Stats.name}: **${player2Stats.expLevel}**`,
          inline: true
        }
      );

    // Add Discord user information if available
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
        { name: '📊 **Stats**', value: '`!cr stats` - View your stats\n`!cr stats <player_tag>` - View any player\'s stats\n`!cr stats @username` - View logged-in Discord user\'s stats\n`!cr deck` - View your deck\n`!cr deck <player_tag>` - View any player\'s deck\n`!cr deck @username` - View logged-in Discord user\'s deck', inline: false },
        { name: '⚔️ **Comparison**', value: '`!cr compare @username` - Compare your stats with another Discord user\n`!cr compare @user1 @user2` - Compare two Discord users', inline: false },
        { name: '👥 **Server**', value: '`!cr players` - List all logged in players in this server', inline: false },
        { name: '💾 **Admin**', value: '`!cr save` - Save user data to file\n`!cr reload` - Reload user data from file', inline: false },
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
