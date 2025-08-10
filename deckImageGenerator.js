import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage, registerFont } from 'canvas';

export class DeckImageGenerator {
  constructor() {
    this.outputDir = './deck_images';
    this.ensureOutputDir();
    
    // Set up canvas dimensions
    this.width = 800;
    this.height = 600;
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
    
    // Generate filename and save
    const filename = `deck_${playerStats.tag.replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}.png`;
    const filepath = path.join(this.outputDir, filename);
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filepath, buffer);
    
    return {
      filepath,
      filename,
      buffer
    };
  }

  drawBackground(ctx) {
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);
    
    // Add some decorative elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(20, 20, this.width - 40, this.height - 40);
  }

  async drawPlayerInfo(ctx, playerStats) {
    // Player name
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(playerStats.name, this.width / 2, 80);
    
    // Clan name
    ctx.fillStyle = '#b8c5d6';
    ctx.font = '24px Arial';
    ctx.fillText(playerStats.clan?.name || 'No Clan', this.width / 2, 110);
    
    // Trophy info
    const trophyY = 150;
    const trophyWidth = 80;
    const spacing = 20;
    const startX = (this.width - (trophyWidth * 3 + spacing * 2)) / 2;
    
    // Previous trophies
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(startX, trophyY, trophyWidth, 40);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(Math.max(0, playerStats.trophies - 30).toString(), startX + trophyWidth/2, trophyY + 25);
    
    // Trophy change
    ctx.fillStyle = '#3182ce';
    ctx.fillRect(startX + trophyWidth + spacing, trophyY, trophyWidth, 40);
    ctx.fillStyle = 'white';
    ctx.fillText('+30', startX + trophyWidth + spacing + trophyWidth/2, trophyY + 25);
    
    // Current trophies
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(startX + (trophyWidth + spacing) * 2, trophyY, trophyWidth, 40);
    ctx.fillStyle = 'white';
    ctx.fillText(playerStats.trophies.toString(), startX + (trophyWidth + spacing) * 2 + trophyWidth/2, trophyY + 25);
  }

  async drawDeckGrid(ctx, deck) {
    const cardWidth = 120;
    const cardHeight = 160;
    const cardsPerRow = 4;
    const startY = 220;
    const startX = (this.width - (cardWidth * cardsPerRow)) / 2;
    
    for (let i = 0; i < deck.length; i++) {
      const row = Math.floor(i / cardsPerRow);
      const col = i % cardsPerRow;
      const x = startX + col * cardWidth;
      const y = startY + row * cardHeight;
      
      await this.drawCard(ctx, deck[i], x, y, cardWidth, cardHeight);
    }
  }

  async drawCard(ctx, card, x, y, width, height) {
    // Card background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(x, y, width, height);
    
    // Card border based on rarity
    const borderColor = this.getRarityColor(card.rarity);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);
    
    // Card image placeholder (since we can't load external images easily)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(x + 10, y + 10, width - 20, width - 20);
    
    // Card name
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(card.name, x + width/2, y + width + 30);
    
    // Card level
    ctx.fillStyle = '#b8c5d6';
    ctx.font = '12px Arial';
    ctx.fillText(`Lvl ${card.level}`, x + width/2, y + width + 50);
    
    // Elixir cost
    ctx.fillStyle = '#3182ce';
    ctx.beginPath();
    ctx.arc(x + width/2, y + height - 20, 15, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(card.elixirCost.toString(), x + width/2, y + height - 18);
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
