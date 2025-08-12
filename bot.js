import { Client, GatewayIntentBits, Events, Collection } from 'discord.js';
import { config } from './config.js';
import { ClashAPI } from './clashApi.js';
import { UserManager } from './userManager.js';
import { EmbedBuilder } from './embedBuilder.js';
import { DeckImageGenerator } from './deckImageGenerator.js';
import fs from 'fs';

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Initialize managers and API
const clashAPI = new ClashAPI();
const userManager = new UserManager();
const embedBuilder = new EmbedBuilder();
const deckImageGenerator = new DeckImageGenerator();

// Rate limiting
const rateLimits = new Map(); // userId -> { count: number, resetTime: number }
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per minute per user

// Command collection
client.commands = new Collection();

// Bot ready event
client.once(Events.ClientReady, async () => {
  console.log(`🤖 Bot is ready! Logged in as ${client.user.tag}`);
  console.log(`📊 Serving ${client.guilds.cache.size} guilds`);
  console.log(`👥 Serving ${client.users.cache.size} users`);
  
  // Load saved user data
  await userManager.loadUsersFromFile();
  const loggedInUsers = userManager.getAllLoggedInUsers();
  console.log(`📂 Restored ${loggedInUsers.length} logged-in user(s) from file`);
});

// Message event handler
client.on(Events.MessageCreate, async (message) => {
  // Ignore bot messages and messages that don't start with prefix
  if (message.author.bot || !message.content.startsWith(config.PREFIX)) {
    return;
  }

  // Parse command
  const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  try {
    await handleCommand(message, command, args);
  } catch (error) {
    console.error('Error handling command:', error);
    const errorEmbed = embedBuilder.createErrorEmbed(error, message.author);
    await message.reply({ embeds: [errorEmbed] });
  }
});

// Command handler
async function handleCommand(message, command, args) {
  switch (command) {
    case 'login':
      await handleLogin(message, args);
      break;
    case 'logout':
      await handleLogout(message);
      break;
    case 'stats':
      await handleStats(message, args);
      break;
    case 'deck':
      await handleDeck(message, args);
      break;
    case 'compare':
      await handleCompare(message, args);
      break;
    case 'players':
      await handlePlayers(message);
      break;
    case 'help':
      await handleHelp(message);
      break;
    case 'save':
      await handleSave(message);
      break;
    case 'reload':
      await handleReload(message);
      break;
    case 'battles':
      await handleBattles(message, args);
      break;
    case 'challenges':
      await handleChallenges(message, args);
      break;
    case 'adminlogin':
      await handleAdminLogin(message, args);
      break;
    case 'adminlink':
      await handleAdminLink(message, args);
      break;
    default:
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error(`Unknown command: ${command}. Use \`${config.PREFIX} help\` for available commands.`),
        message.author
      );
      await message.reply({ embeds: [errorEmbed] });
  }
}

// Login command handler
async function handleLogin(message, args) {
  if (args.length === 0) {
    const errorEmbed = embedBuilder.createErrorEmbed(
      new Error('Please provide your Clash Royale player tag. Usage: `!cr login <player_tag>`'),
      message.author
    );
    await message.reply({ embeds: [errorEmbed] });
    return;
  }

  const playerTag = args[0];
  
  try {
    // Check rate limit
    checkRateLimit(message.author.id);
    
    const playerStats = await userManager.loginUser(message.author.id, playerTag, clashAPI, message.author);
    const loginEmbed = embedBuilder.createLoginSuccessEmbed(playerStats, message.author);
    await message.reply({ embeds: [loginEmbed] });
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, message.author);
    await message.reply({ embeds: [errorEmbed] });
  }
}

// Logout command handler
async function handleLogout(message) {
  try {
    const wasLoggedIn = await userManager.logoutUser(message.author.id);
    
    if (wasLoggedIn) {
      const logoutEmbed = embedBuilder.createLogoutSuccessEmbed(message.author);
      await message.reply({ embeds: [logoutEmbed] });
    } else {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error('You are not currently logged in.'),
        message.author
      );
      await message.reply({ embeds: [errorEmbed] });
    }
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, message.author);
    await message.reply({ embeds: [errorEmbed] });
  }
}

// Stats command handler
async function handleStats(message, args) {
  let playerTag;
  
  if (args.length === 0) {
    // User wants their own stats
    if (!userManager.isUserLoggedIn(message.author.id)) {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error('You are not logged in. Please login first with `!cr login <player_tag>` or provide a player tag/Discord mention.'),
        message.author
      );
      await message.reply({ embeds: [errorEmbed] });
      return;
    }
    playerTag = userManager.getUserPlayerTag(message.author.id);
  } else {
    // Check if user provided a Discord mention
    const mentionedUser = message.mentions.users.first();
    if (mentionedUser) {
      // User mentioned a Discord user
      if (!userManager.isUserLoggedIn(mentionedUser.id)) {
        const errorEmbed = embedBuilder.createErrorEmbed(
          new Error(`**${mentionedUser.username}** is not logged in. They need to login first with \`!cr login <player_tag>\``),
          message.author
        );
        await message.reply({ embeds: [errorEmbed] });
        return;
      }
      playerTag = userManager.getUserPlayerTag(mentionedUser.id);
    } else {
      // User provided a player tag
      playerTag = args[0];
    }
  }

  try {
    // Check rate limit
    checkRateLimit(message.author.id);
    
    const playerStats = await clashAPI.getPlayerStats(playerTag);
    const statsEmbed = embedBuilder.createPlayerStatsEmbed(playerStats, message.author);
    const actionRow = embedBuilder.createActionRow();
    
    await message.reply({ 
      embeds: [statsEmbed],
      components: [actionRow]
    });
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, message.author);
    await message.reply({ embeds: [errorEmbed] });
  }
}

// Deck command handler
async function handleDeck(message, args) {
  let playerTag;
  
  if (args.length === 0) {
    // User wants their own deck
    if (!userManager.isUserLoggedIn(message.author.id)) {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error('You are not logged in. Please login first with `!cr login <player_tag>` or provide a player tag/Discord mention.'),
        message.author
      );
      await message.reply({ embeds: [errorEmbed] });
      return;
    }
    playerTag = userManager.getUserPlayerTag(message.author.id);
  } else {
    // Check if user provided a Discord mention
    const mentionedUser = message.mentions.users.first();
    if (mentionedUser) {
      // User mentioned a Discord user
      if (!userManager.isUserLoggedIn(mentionedUser.id)) {
        const errorEmbed = embedBuilder.createErrorEmbed(
          new Error(`**${mentionedUser.username}** is not logged in. They need to login first with \`!cr login <player_tag>\``),
          message.author
        );
        await message.reply({ embeds: [errorEmbed] });
        return;
      }
      playerTag = userManager.getUserPlayerTag(mentionedUser.id);
    } else {
      // User provided a player tag
      playerTag = args[0];
    }
  }

  try {
    // Check rate limit
    checkRateLimit(message.author.id);
    
    const playerStats = await clashAPI.getPlayerStats(playerTag);
    
    // Generate deck image
    const deckImage = await deckImageGenerator.generateDeckImage(playerStats);
    
    // Create action row with buttons
    const actionRow = embedBuilder.createActionRow();
    
    // Send the PNG image as an attachment with just buttons
    await message.reply({
      content: `🃏 **${playerStats.name}'s Current Deck**`,
      components: [actionRow],
      files: [{
        attachment: deckImage.filepath,
        name: deckImage.filename
      }]
    });
    
    // Clean up the file after sending
    setTimeout(() => {
      try {
        if (fs.existsSync(deckImage.filepath)) {
          fs.unlinkSync(deckImage.filepath);
        }
      } catch (cleanupError) {
        console.error('Error cleaning up deck image file:', cleanupError);
      }
    }, 60000); // Clean up after 1 minute
    
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, message.author);
    await message.reply({ embeds: [errorEmbed] });
  }
}

// Compare command handler
async function handleCompare(message, args) {
  if (args.length === 0) {
    const errorEmbed = embedBuilder.createErrorEmbed(
      new Error('Please provide a Discord member to compare with. Usage: `!cr compare @username` or `!cr compare @user1 @user2`'),
      message.author
    );
    await message.reply({ embeds: [errorEmbed] });
    return;
  }

  try {
    // Check rate limit
    checkRateLimit(message.author.id);
    
    let player1Stats, player2Stats, player1DiscordUser, player2DiscordUser;

    if (args.length === 1) {
      // Compare user's stats with provided Discord member
      if (!userManager.isUserLoggedIn(message.author.id)) {
        const errorEmbed = embedBuilder.createErrorEmbed(
          new Error('You are not logged in. Please login first with `!cr login <player_tag>`'),
          message.author
        );
        await message.reply({ embeds: [errorEmbed] });
        return;
      }

      // Get mentioned user
      const mentionedUser = message.mentions.users.first();
      if (!mentionedUser) {
        const errorEmbed = embedBuilder.createErrorEmbed(
          new Error('Please mention a Discord user to compare with. Usage: `!cr compare @username`'),
          message.author
        );
        await message.reply({ embeds: [errorEmbed] });
        return;
      }

      // Check if mentioned user is logged in
      if (!userManager.isUserLoggedIn(mentionedUser.id)) {
        const errorEmbed = embedBuilder.createErrorEmbed(
          new Error(`**${mentionedUser.username}** is not logged in. They need to login first with \`!cr login <player_tag>\``),
          message.author
        );
        await message.reply({ embeds: [errorEmbed] });
        return;
      }
      
      const userPlayerTag = userManager.getUserPlayerTag(message.author.id);
      const mentionedPlayerTag = userManager.getUserPlayerTag(mentionedUser.id);
      
      player1Stats = await clashAPI.getPlayerStats(userPlayerTag);
      player2Stats = await clashAPI.getPlayerStats(mentionedPlayerTag);
      player1DiscordUser = message.author;
      player2DiscordUser = mentionedUser;
    } else if (args.length === 2) {
      // Compare two mentioned Discord members
      const mentionedUsers = message.mentions.users;
      if (mentionedUsers.size !== 2) {
        const errorEmbed = embedBuilder.createErrorEmbed(
          new Error('Please mention exactly two Discord users to compare. Usage: `!cr compare @user1 @user2`'),
          message.author
        );
        await message.reply({ embeds: [errorEmbed] });
        return;
      }

      const userArray = Array.from(mentionedUsers.values());
      const user1 = userArray[0];
      const user2 = userArray[1];

      // Check if both users are logged in
      if (!userManager.isUserLoggedIn(user1.id)) {
        const errorEmbed = embedBuilder.createErrorEmbed(
          new Error(`**${user1.username}** is not logged in. They need to login first with \`!cr login <player_tag>\``),
          message.author
        );
        await message.reply({ embeds: [errorEmbed] });
        return;
      }

      if (!userManager.isUserLoggedIn(user2.id)) {
        const errorEmbed = embedBuilder.createErrorEmbed(
          new Error(`**${user2.username}** is not logged in. They need to login first with \`!cr login <player_tag>\``),
          message.author
        );
        await message.reply({ embeds: [errorEmbed] });
        return;
      }

      const player1Tag = userManager.getUserPlayerTag(user1.id);
      const player2Tag = userManager.getUserPlayerTag(user2.id);
      
      player1Stats = await clashAPI.getPlayerStats(player1Tag);
      player2Stats = await clashAPI.getPlayerStats(player2Tag);
      player1DiscordUser = user1;
      player2DiscordUser = user2;
    } else {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error('Too many arguments. Usage: `!cr compare @username` or `!cr compare @user1 @user2`'),
        message.author
      );
      await message.reply({ embeds: [errorEmbed] });
      return;
    }

    const comparisonEmbed = embedBuilder.createComparisonEmbed(player1Stats, player2Stats, message.author, player1DiscordUser, player2DiscordUser);
    await message.reply({ embeds: [comparisonEmbed] });
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, message.author);
    await message.reply({ embeds: [errorEmbed] });
  }
}

// Players command handler
async function handlePlayers(message) {
  const loggedInPlayers = userManager.getAllLoggedInUsers();
  const playersEmbed = embedBuilder.createPlayersListEmbed(loggedInPlayers, message.author);
  
  await message.reply({ embeds: [playersEmbed] });
}

// Help command handler
async function handleHelp(message) {
  const helpEmbed = embedBuilder.createHelpEmbed(message.author);
  await message.reply({ embeds: [helpEmbed] });
}

// Save command handler (admin only)
async function handleSave(message) {
  // Check admin permissions
  if (!hasAdminPermission(message.member)) {
    const errorEmbed = embedBuilder.createErrorEmbed(
      new Error('You do not have permission to use this command. This command is restricted to administrators only.'),
      message.author
    );
    await message.reply({ embeds: [errorEmbed] });
    return;
  }

  try {
    await userManager.saveUsersToFile();
    const successEmbed = embedBuilder.createSuccessEmbed('User data saved successfully!', message.author);
    await message.reply({ embeds: [successEmbed] });
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, message.author);
    await message.reply({ embeds: [errorEmbed] });
  }
}

// Reload command handler (admin only)
async function handleReload(message) {
  // Check admin permissions
  if (!hasAdminPermission(message.member)) {
    const errorEmbed = embedBuilder.createErrorEmbed(
      new Error('You do not have permission to use this command. This command is restricted to administrators only.'),
      message.author
    );
    await message.reply({ embeds: [errorEmbed] });
    return;
  }

  try {
    await userManager.reloadUsers();
    const loggedInUsers = userManager.getAllLoggedInUsers();
    const successEmbed = embedBuilder.createSuccessEmbed(`User data reloaded successfully! ${loggedInUsers.length} user(s) loaded.`, message.author);
    await message.reply({ embeds: [successEmbed] });
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, message.author);
    await message.reply({ embeds: [errorEmbed] });
  }
}

// Admin login command handler (admin only)
async function handleAdminLogin(message, args) {
  // Check admin permissions
  if (!hasAdminPermission(message.member)) {
    const errorEmbed = embedBuilder.createErrorEmbed(
      new Error('You do not have permission to use this command. This command is restricted to administrators only.'),
      message.author
    );
    await message.reply({ embeds: [errorEmbed] });
    return;
  }

  if (args.length < 2) {
    const errorEmbed = embedBuilder.createErrorEmbed(
      new Error('Please provide both a Discord member mention and a Clash Royale player tag. Usage: `!cr adminlogin @username <player_tag>`'),
      message.author
    );
    await message.reply({ embeds: [errorEmbed] });
    return;
  }

  // Get mentioned user
  const mentionedUser = message.mentions.users.first();
  if (!mentionedUser) {
    const errorEmbed = embedBuilder.createErrorEmbed(
      new Error('Please mention a Discord user to log in. Usage: `!cr adminlogin @username <player_tag>`'),
      message.author
    );
    await message.reply({ embeds: [errorEmbed] });
    return;
  }

  const playerTag = args[1];
  
  try {
    // Check rate limit
    checkRateLimit(message.author.id);
    
    // Force login the mentioned user
    const playerStats = await userManager.adminLoginUser(mentionedUser.id, playerTag, clashAPI, mentionedUser);
    
    const successEmbed = embedBuilder.createAdminLoginSuccessEmbed(playerStats, mentionedUser, message.author);
    await message.reply({ embeds: [successEmbed] });
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, message.author);
    await message.reply({ embeds: [errorEmbed] });
  }
}

// Admin link command handler (admin only)
async function handleAdminLink(message, args) {
  // Check admin permissions
  if (!hasAdminPermission(message.member)) {
    const errorEmbed = embedBuilder.createErrorEmbed(
      new Error('You do not have permission to use this command. This command is restricted to administrators only.'),
      message.author
    );
    await message.reply({ embeds: [errorEmbed] });
    return;
  }

  if (args.length < 2) {
    const errorEmbed = embedBuilder.createErrorEmbed(
      new Error('Please provide both a Discord member mention and a Clash Royale player tag. Usage: `!cr adminlink @username <player_tag>`'),
      message.author
    );
    await message.reply({ embeds: [errorEmbed] });
    return;
  }

  // Get mentioned user
  const mentionedUser = message.mentions.users.first();
  if (!mentionedUser) {
    const errorEmbed = embedBuilder.createErrorEmbed(
      new Error('Please mention a Discord user to link. Usage: `!cr adminlink @username <player_tag>`'),
      message.author
    );
    await message.reply({ embeds: [errorEmbed] });
    return;
  }

  const playerTag = args[1];
  
  try {
    // Check rate limit
    checkRateLimit(message.author.id);
    
    // Force link the mentioned user
    const playerStats = await userManager.adminLinkUser(mentionedUser.id, playerTag, clashAPI, mentionedUser);
    
    const successEmbed = embedBuilder.createAdminLinkSuccessEmbed(playerStats, mentionedUser, message.author);
    await message.reply({ embeds: [successEmbed] });
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, message.author);
    await message.reply({ embeds: [errorEmbed] });
  }
}

// Interaction handler for buttons and modals
client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isButton()) {
      const { customId } = interaction;
      
      switch (customId) {
        case 'view_deck':
          await handleDeckButton(interaction);
          break;
        case 'copy_deck':
          await handleCopyDeckButton(interaction);
          break;
        case 'compare_stats':
          await handleCompareButton(interaction);
          break;
        case 'refresh_stats':
          await handleRefreshButton(interaction);
          break;
      }
    } else if (interaction.isModalSubmit()) {
      const { customId } = interaction;
      
      if (customId === 'compare_modal') {
        await handleCompareModal(interaction);
      }
    }
  } catch (error) {
    console.error('Error handling interaction:', error);
    const errorEmbed = embedBuilder.createErrorEmbed(error, interaction.user);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
    } else {
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  }
});

// Button handlers
async function handleDeckButton(interaction) {
  try {
    // Check rate limit
    checkRateLimit(interaction.user.id);
    
    if (!userManager.isUserLoggedIn(interaction.user.id)) {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error('You are not logged in. Please login first with `!cr login <player_tag>`'),
        interaction.user
      );
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      return;
    }

    const playerTag = userManager.getUserPlayerTag(interaction.user.id);
    const playerStats = await clashAPI.getPlayerStats(playerTag);
    
    // Generate deck image
    const deckImage = await deckImageGenerator.generateDeckImage(playerStats);
    
    // Create action row with buttons
    const actionRow = embedBuilder.createActionRow();
    
    // Send the PNG image as an attachment with just buttons
    await interaction.reply({
      content: `🃏 **${playerStats.name}'s Current Deck**`,
      components: [actionRow],
      files: [{
        attachment: deckImage.filepath,
        name: deckImage.filename
      }],
      ephemeral: true
    });
    
    // Clean up the file after sending
    setTimeout(() => {
      try {
        if (fs.existsSync(deckImage.filepath)) {
          fs.unlinkSync(deckImage.filepath);
        }
      } catch (cleanupError) {
        console.error('Error cleaning up deck image file:', cleanupError);
      }
    }, 60000); // Clean up after 1 minute
    
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, interaction.user);
    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
  }
}

async function handleCompareButton(interaction) {
  if (!userManager.isUserLoggedIn(interaction.user.id)) {
    const errorEmbed = embedBuilder.createErrorEmbed(
      new Error('You are not logged in. Please login first with `!cr login <player_tag>`'),
      interaction.user
    );
    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    return;
  }

  // Create a modal for the user to enter a Discord username to compare with
  const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = await import('discord.js');
  
  const modal = new ModalBuilder()
    .setCustomId('compare_modal')
    .setTitle('Compare Stats');

  const discordUserInput = new TextInputBuilder()
    .setCustomId('discord_user_input')
    .setLabel('Enter Discord username to compare with')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('e.g., username (without @)')
    .setRequired(true)
    .setMaxLength(32);

  const firstActionRow = new ActionRowBuilder().addComponents(discordUserInput);
  modal.addComponents(firstActionRow);

  await interaction.showModal(modal);
}

async function handleRefreshButton(interaction) {
  try {
    // Check rate limit
    checkRateLimit(interaction.user.id);
    
    if (!userManager.isUserLoggedIn(interaction.user.id)) {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error('You are not logged in. Please login first with `!cr login <player_tag>`'),
        interaction.user
      );
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      return;
    }

    const playerTag = userManager.getUserPlayerTag(interaction.user.id);
    const playerStats = await clashAPI.getPlayerStats(playerTag);
    const statsEmbed = embedBuilder.createPlayerStatsEmbed(playerStats, interaction.user);
    
    await interaction.reply({ embeds: [statsEmbed], ephemeral: true });
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, interaction.user);
    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
  }
}

async function handleCopyDeckButton(interaction) {
  try {
    // Check rate limit
    checkRateLimit(interaction.user.id);
    
    if (!userManager.isUserLoggedIn(interaction.user.id)) {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error('You are not logged in. Please login first with `!cr login <player_tag>`'),
        interaction.user
      );
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      return;
    }

    const playerTag = userManager.getUserPlayerTag(interaction.user.id);
    const playerStats = await clashAPI.getPlayerStats(playerTag);
    
    // Generate deck link
    const deckLink = embedBuilder.generateDeckLink(playerStats.currentDeck);
    
    if (!deckLink) {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error('No deck found to copy.'),
        interaction.user
      );
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      return;
    }
    
    // Try to generate a Clash Royale deck link
    const clashRoyaleLink = embedBuilder.generateClashRoyaleDeckLink(playerStats.currentDeck);
    
    // Create success embed with deck info
    let successMessage = `Deck copied successfully!\n\n**${playerStats.name}'s Deck:**\n\`\`\`${deckLink}\`\`\``;
    
    if (clashRoyaleLink) {
      successMessage += `\n\n🔗 **Deck Link:** ${clashRoyaleLink}`;
    }
    
    const successEmbed = embedBuilder.createSuccessEmbed(successMessage, interaction.user);
    
    await interaction.reply({ embeds: [successEmbed], ephemeral: true });
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, interaction.user);
    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
  }
}

// Rate limiting function
function checkRateLimit(userId) {
  const now = Date.now();
  const userLimit = rateLimits.get(userId);
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new rate limit
    rateLimits.set(userId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return true;
  }
  
  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    const timeLeft = Math.ceil((userLimit.resetTime - now) / 1000);
    throw new Error(`Rate limit exceeded. Please wait ${timeLeft} seconds before making another request.`);
  }
  
  userLimit.count++;
  return true;
}

// Battles command handler
async function handleBattles(message, args) {
  try {
    // Check rate limit
    checkRateLimit(message.author.id);
    
    let playerTag;
    
    if (args.length === 0) {
      // User wants their own battles
      if (!userManager.isUserLoggedIn(message.author.id)) {
        const errorEmbed = embedBuilder.createErrorEmbed(
          new Error('You are not logged in. Please login first with `!cr login <player_tag>` or provide a player tag/Discord mention.'),
          message.author
        );
        await message.reply({ embeds: [errorEmbed] });
        return;
      }
      playerTag = userManager.getUserPlayerTag(message.author.id);
    } else {
      // Check if user provided a Discord mention
      const mentionedUser = message.mentions.users.first();
      if (mentionedUser) {
        // User mentioned a Discord user
        if (!userManager.isUserLoggedIn(mentionedUser.id)) {
          const errorEmbed = embedBuilder.createErrorEmbed(
            new Error(`**${mentionedUser.username}** is not logged in. They need to login first with \`!cr login <player_tag>\``),
            message.author
          );
          await message.reply({ embeds: [errorEmbed] });
          return;
        }
        playerTag = userManager.getUserPlayerTag(mentionedUser.id);
      } else {
        // User provided a player tag
        playerTag = args[0];
      }
    }
    
    // Get battle log from the API
    const battleLog = await clashAPI.getBattleLog(playerTag);
    
    if (!battleLog || battleLog.length === 0) {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error('No battle data found for this player.'),
        message.author
      );
      await message.reply({ embeds: [errorEmbed] });
      return;
    }

    // Get the 5 most recent battles
    const recentBattles = battleLog.slice(0, 5);
    
    // Create battle log embed
    const battleLogEmbed = embedBuilder.createBattleLogEmbed(recentBattles, message.author);
    await message.reply({ embeds: [battleLogEmbed] });
    
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, message.author);
    await message.reply({ embeds: [errorEmbed] });
  }
}

// Challenges command handler
async function handleChallenges(message, args) {
  try {
    // Check rate limit
    checkRateLimit(message.author.id);
    
    // Get available challenges from the API
    const challenges = await clashAPI.getChallenges();
    
    if (!challenges || challenges.length === 0) {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error('No challenges currently available.'),
        message.author
      );
      await message.reply({ embeds: [errorEmbed] });
      return;
    }
    
    // Create challenges embed
    const challengesEmbed = embedBuilder.createChallengesEmbed(challenges, message.author);
    await message.reply({ embeds: [challengesEmbed] });
    
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, message.author);
    await message.reply({ embeds: [errorEmbed] });
  }
}

// Admin permission check function
function hasAdminPermission(member) {
  if (!member) return false;
  
  // Check if user has admin role
  if (config.ADMIN_ROLE_ID && member.roles.cache.has(config.ADMIN_ROLE_ID)) {
    return true;
  }
  
  // Check if user has administrator permission
  if (member.permissions.has('Administrator')) {
    return true;
  }
  
  return false;
}

// Modal handler for compare
async function handleCompareModal(interaction) {
  const discordUsername = interaction.fields.getTextInputValue('discord_user_input');
  
  try {
    // Check rate limit
    checkRateLimit(interaction.user.id);
    
    if (!userManager.isUserLoggedIn(interaction.user.id)) {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error('You are not logged in. Please login first with `!cr login <player_tag>`'),
        interaction.user
      );
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      return;
    }

    // Find Discord user by username
    const guild = interaction.guild;
    if (!guild) {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error('This command can only be used in a server.'),
        interaction.user
      );
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      return;
    }

    const targetUser = guild.members.cache.find(member => 
      member.user.username.toLowerCase() === discordUsername.toLowerCase() ||
      member.displayName.toLowerCase() === discordUsername.toLowerCase()
    );

    if (!targetUser) {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error(`Could not find Discord user "${discordUsername}" in this server.`),
        interaction.user
      );
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      return;
    }

    // Check if target user is logged in
    if (!userManager.isUserLoggedIn(targetUser.user.id)) {
      const errorEmbed = embedBuilder.createErrorEmbed(
        new Error(`**${targetUser.user.username}** is not logged in. They need to login first with \`!cr login <player_tag>\``),
        interaction.user
      );
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      return;
    }
    
    const userPlayerTag = userManager.getUserPlayerTag(interaction.user.id);
    const targetPlayerTag = userManager.getUserPlayerTag(targetUser.user.id);
    
    const player1Stats = await clashAPI.getPlayerStats(userPlayerTag);
    const player2Stats = await clashAPI.getPlayerStats(targetPlayerTag);
    
    const comparisonEmbed = embedBuilder.createComparisonEmbed(
      player1Stats, 
      player2Stats, 
      interaction.user, 
      interaction.user, 
      targetUser.user
    );
    await interaction.reply({ embeds: [comparisonEmbed], ephemeral: true });
  } catch (error) {
    const errorEmbed = embedBuilder.createErrorEmbed(error, interaction.user);
    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
  }
}

// Error handling
client.on(Events.Error, (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Login to Discord
client.login(config.DISCORD_BOT_TOKEN);
