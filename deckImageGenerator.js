import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage, registerFont } from 'canvas';

export class DeckImageGenerator {
  constructor() {
    this.outputDir = './deck_images';
    this.ensureOutputDir();
    
    // Set up canvas dimensions - increased height for better card layout
    this.width = 800;
    this.height = 700; // Increased from 600 to accommodate larger cards
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async generateDeckImage(playerStats) {
    const canvas = createCanvas(this.width, this.height);
    const ctx = canvas.getContext('2d');
    
    // Draw background
    this.drawBackground(ctx);
    
    // Draw player info
    await this.drawPlayerInfo(ctx, playerStats);
    
    // Draw deck grid
    await this.drawDeckGrid(ctx, playerStats.currentDeck || []);
    
    // Generate filename and save as PNG
    const filename = `deck_${playerStats.tag.replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}.png`;
    const filepath = path.join(this.outputDir, filename);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filepath, buffer);
    
    return {
      filepath,
      filename,
      buffer
    };
  }

  drawBackground(ctx) {
    // Create gradient background - match HTML version
    const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);
    
    // Add subtle decorative elements like HTML version
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(20, 20, this.width - 40, this.height - 40);
    
    // Add some subtle pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < this.width; i += 40) {
      for (let j = 0; j < this.height; j += 40) {
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }

  async drawPlayerInfo(ctx, playerStats) {
    // Player name - match HTML styling
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(playerStats.name, this.width / 2, 40);
    
    // Clan name - match HTML styling
    ctx.fillStyle = '#b8c5d6';
    ctx.font = '24px Arial';
    ctx.fillText(playerStats.clan?.name || 'No Clan', this.width / 2, 90);
    
    // Trophy info - match HTML styling
    const trophyY = 140;
    const trophyWidth = 80;
    const spacing = 20;
    const startX = (this.width - (trophyWidth * 3 + spacing * 2)) / 2;
    
    // Previous trophies
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(startX, trophyY, trophyWidth, 40);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(Math.max(0, playerStats.trophies - 30).toString(), startX + trophyWidth/2, trophyY + 20);
    
    // Trophy change
    ctx.fillStyle = '#3182ce';
    ctx.fillRect(startX + trophyWidth + spacing, trophyY, trophyWidth, 40);
    ctx.fillStyle = 'white';
    ctx.fillText('+30', startX + trophyWidth + spacing + trophyWidth/2, trophyY + 20);
    
    // Current trophies
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(startX + (trophyWidth + spacing) * 2, trophyY, trophyWidth, 40);
    ctx.fillStyle = 'white';
    ctx.fillText(playerStats.trophies.toString(), startX + (trophyWidth + spacing) * 2 + trophyWidth/2, trophyY + 20);
  }

  async drawDeckGrid(ctx, deck) {
    const cardWidth = 140; // Increased width for better proportions
    const cardHeight = 180; // Increased height to make cards more square
    const cardsPerRow = 4;
    const startY = 200; // Adjusted to work with new player info layout
    const startX = (this.width - (cardWidth * cardsPerRow)) / 2;
    
    // Debug: Log the deck structure
    console.log('Deck data structure:', JSON.stringify(deck, null, 2));
    
    for (let i = 0; i < deck.length; i++) {
      const row = Math.floor(i / cardsPerRow);
      const col = i % cardsPerRow;
      const x = startX + col * cardWidth;
      const y = startY + row * cardHeight;
      
      await this.drawCard(ctx, deck[i], x, y, cardWidth, cardHeight);
    }
  }

  async drawCard(ctx, card, x, y, width, height) {
    // Debug: Log individual card data
    console.log(`Drawing card:`, card);
    
    // Card background with better styling - match HTML version
    const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, height);
    
    // Card border based on rarity
    const borderColor = this.getRarityColor(card.rarity);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);
    
    // Try to load and display actual card image
    try {
      // Use the card's iconUrls if available (this is what the HTML version uses)
      let imageUrl = null;
      
      if (card.iconUrls && card.iconUrls.medium) {
        imageUrl = card.iconUrls.medium;
      } else if (card.iconUrls && card.iconUrls['300']) {
        imageUrl = card.iconUrls['300'];
      } else if (card.iconUrl) {
        imageUrl = card.iconUrl;
      } else {
        // Fallback: try to construct from name (less reliable)
        const cardId = card.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        imageUrl = `https://api-assets.clashroyale.com/cards/300/${cardId}.png`;
      }
      
      if (imageUrl) {
        console.log(`Attempting to load card image from: ${imageUrl}`);
        
        const cardImage = await loadImage(imageUrl);
        
        // Calculate image dimensions to fit in card with padding - maintain aspect ratio
        const imageSize = Math.min(width - 20, height - 60); // Use smaller dimension to maintain square aspect
        const imageX = x + (width - imageSize) / 2; // Center the image horizontally
        const imageY = y + 10;
        
        // Draw card image
        ctx.drawImage(cardImage, imageX, imageY, imageSize, imageSize);
        
        // Add a subtle overlay for better text readability (like HTML version)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(imageX, imageY, imageSize, imageSize);
      } else {
        throw new Error('No image URL available');
      }
      
    } catch (error) {
      // Fallback to placeholder if image fails to load
      console.log(`Failed to load image for card ${card.name}:`, error.message);
      
      // Create a nicer placeholder that matches the HTML styling
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(x + 10, y + 10, width - 20, width - 20);
      
      // Add card name as placeholder text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(card.name, x + width/2, y + width/2 + 10);
    }
    
    // Card name - positioned below the image area (like HTML version)
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    // Don't truncate names - show full names like HTML version
    ctx.fillText(card.name, x + width/2, y + height - 50);
    
    // Card level (like HTML version)
    ctx.fillStyle = '#b8c5d6';
    ctx.font = '12px Arial';
    ctx.fillText(`Lvl ${card.level}`, x + width/2, y + height - 35);
    
    // Elixir cost circle (like HTML version)
    ctx.fillStyle = '#3182ce';
    ctx.beginPath();
    ctx.arc(x + width/2, y + height - 20, 15, 0, 2 * Math.PI);
    ctx.fill();
    
    // Elixir cost text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(card.elixirCost.toString(), x + width/2, y + height - 20);
  }

  getRarityColor(rarity) {
    switch (rarity?.toLowerCase()) {
      case 'common': return '#8b9dc3';
      case 'rare': return '#ff8c00';
      case 'epic': return '#9932cc';
      case 'legendary': return '#ffd700';
      default: return '#8b9dc3';
    }
  }
}
