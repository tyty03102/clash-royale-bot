# Admin Commands for Clash Royale Discord Bot

This document describes the admin-only commands available in the Clash Royale Discord Bot.

## Setup

To use admin commands, you need to configure the bot with admin role permissions:

1. **Copy the config file**: Copy `config.example.js` to `config.js`
2. **Set your Discord Bot Token**: Get this from the [Discord Developer Portal](https://discord.com/developers/applications)
3. **Set your Clash Royale API Token**: Get this from [Clash Royale Developer Portal](https://developer.clashroyale.com)
4. **Configure Admin Role**: Set `ADMIN_ROLE_ID` to your Discord role ID

### Getting Discord Role ID

1. Enable Developer Mode in Discord (User Settings > Advanced > Developer Mode)
2. Right-click on the admin role and select "Copy ID"
3. Paste the ID in your `config.js` file

## Admin Commands

### `!cr adminlogin @username <player_tag>`

**Description**: Forcefully logs in a Discord member to a Clash Royale account, bypassing normal restrictions.

**Usage**: `!cr adminlogin @username #ABC123`

**What it does**:
- Logs the mentioned Discord user into the specified Clash Royale account
- If the player tag is already in use by another user, it will log them out first
- Bypasses the normal "one account per player tag" restriction
- Marks the login as admin-forced for audit purposes

**Permissions Required**:
- User must have the configured admin role, OR
- User must have Administrator permissions in the Discord server

**Example**:
```
!cr adminlogin @john #ABC123DEF
```

### `!cr save`

**Description**: Manually saves all user data to the persistent storage file.

**Usage**: `!cr save`

**What it does**:
- Forces a save of all current user login data to `userData.json`
- Useful for ensuring data persistence before bot restarts

**Permissions Required**: Admin role or Administrator permission

### `!cr reload`

**Description**: Reloads user data from the persistent storage file.

**Usage**: `!cr reload`

**What it does**:
- Reloads all user data from `userData.json`
- Useful for restoring data after manual file edits or bot restarts

**Permissions Required**: Admin role or Administrator permission

## Security Features

- **Role-based Access Control**: Commands check for specific admin role or Administrator permission
- **Audit Trail**: Admin-forced logins are marked with `adminForced: true` flag
- **Permission Validation**: All admin commands verify permissions before execution
- **Rate Limiting**: Admin commands still respect rate limiting to prevent abuse

## Use Cases

### Emergency Account Recovery
When a user loses access to their Discord account but needs to maintain their Clash Royale stats tracking.

### Account Migration
When transferring a Clash Royale account from one Discord user to another.

### Server Administration
For server moderators to help users with login issues or manage account associations.

### Data Management
For server administrators to maintain and backup user data.

## Troubleshooting

### "You do not have permission to use this command"
- Ensure the user has the configured admin role
- Check that the `ADMIN_ROLE_ID` is correctly set in `config.js`
- Verify the role ID is valid and exists in your Discord server

### "Invalid player tag format"
- Player tags should be 8-9 characters long
- Include the # symbol if present in the original tag
- Example: `#ABC123DEF`

### Rate Limit Errors
- Admin commands respect the same rate limiting as regular commands
- Wait 1 minute between commands if you hit the limit

## Configuration Example

```javascript
export const config = {
  CLASH_API_TOKEN: "your_clash_royale_api_token_here",
  DISCORD_BOT_TOKEN: "your_discord_bot_token_here",
  PREFIX: "!cr",
  ADMIN_ROLE_ID: "123456789012345678", // Your admin role ID here
  COLORS: {
    PRIMARY: 0x00ff00,
    SUCCESS: 0x00ff00,
    ERROR: 0xff0000,
    WARNING: 0xffff00,
    INFO: 0x0099ff
  }
};
```

## Best Practices

1. **Use Sparingly**: Only use admin commands when necessary
2. **Document Actions**: Keep records of when and why admin commands were used
3. **Regular Backups**: Use the `!cr save` command regularly
4. **Role Management**: Regularly review who has admin access
5. **Audit Logs**: Monitor the bot logs for admin command usage
