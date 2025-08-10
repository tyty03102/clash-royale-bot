import fs from 'fs';
import path from 'path';

export class DeckImageGenerator {
  constructor() {
    this.outputDir = './deck_images';
    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async generateDeckImage(playerStats) {
    const html = this.generateDeckHTML(playerStats);
    const filename = `deck_${playerStats.tag.replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}.html`;
    const filepath = path.join(this.outputDir, filename);
    
    fs.writeFileSync(filepath, html);
    
    return {
      filepath,
      filename,
      html
    };
  }

  generateDeckHTML(playerStats) {
    const deck = playerStats.currentDeck || [];
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${playerStats.name}'s Deck</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            backdrop-filter: blur(10px);
        }
        .player-info {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
        }
        .player-name {
            font-size: 2.5em;
            font-weight: bold;
            margin: 0;
            color: #ffd700;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        .clan-name {
            font-size: 1.2em;
            color: #b8c5d6;
            margin: 10px 0;
        }
        .trophy-info {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            margin: 15px 0;
        }
        .trophy-box {
            background: #4a5568;
            color: white;
            padding: 8px 15px;
            border-radius: 8px;
            font-weight: bold;
            border: 2px solid #3182ce;
        }
        .trophy-change {
            background: #3182ce;
            color: white;
            padding: 8px 15px;
            border-radius: 8px;
            font-weight: bold;
            border: 2px solid #3182ce;
        }
        .deck-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-top: 20px;
        }
        .card {
            background: linear-gradient(145deg, #667eea, #764ba2);
            border-radius: 15px;
            padding: 15px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            border: 3px solid #4a5568;
            transition: transform 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
        }
        .card-image {
            width: 100px;
            height: 100px;
            margin: 0 auto 10px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8em;
            color: white;
        }
        .card-name {
            font-weight: bold;
            margin: 10px 0;
            color: #ffd700;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        .card-level {
            color: #b8c5d6;
            font-size: 0.9em;
        }
        .card-elixir {
            background: #3182ce;
            color: white;
            padding: 4px 8px;
            border-radius: 20px;
            font-size: 0.8em;
            margin-top: 8px;
            display: inline-block;
        }
        .rarity-common { border-color: #8b9dc3; }
        .rarity-rare { border-color: #ff8c00; }
        .rarity-epic { border-color: #9932cc; }
        .rarity-legendary { border-color: #ffd700; }
        .sword-icon {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 2em;
            color: #ffd700;
        }
        @media print {
            body { background: white; }
            .container { background: white; color: black; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="sword-icon">⚔️</div>
        
        <div class="player-info">
            <h1 class="player-name">${playerStats.name}</h1>
            <div class="clan-name">${playerStats.clan?.name || 'No Clan'}</div>
            
            <div class="trophy-info">
                <div class="trophy-box">${Math.max(0, playerStats.trophies - 30)}</div>
                <div class="trophy-change">+30</div>
                <div class="trophy-box">${playerStats.trophies}</div>
            </div>
        </div>
        
        <div class="deck-grid">
            ${deck.map(card => this.generateCardHTML(card)).join('')}
        </div>
    </div>
</body>
</html>`;
  }

  generateCardHTML(card) {
    const rarityClass = `rarity-${card.rarity?.toLowerCase() || 'common'}`;
    const cardImage = card.iconUrls?.medium || '';
    
    return `
        <div class="card ${rarityClass}">
            <div class="card-image">
                ${cardImage ? `<img src="${cardImage}" alt="${card.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` : card.name.charAt(0).toUpperCase()}
            </div>
            <div class="card-name">${card.name}</div>
            <div class="card-level">Lvl ${card.level}</div>
            <div class="card-elixir">${card.elixirCost} elixir</div>
        </div>
    `;
  }

  // Method to get the file path for the generated image
  getImageFilePath(playerStats) {
    const filename = `deck_${playerStats.tag.replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}.html`;
    return path.join(this.outputDir, filename);
  }
}
