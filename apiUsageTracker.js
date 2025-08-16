import fs from 'fs';
import path from 'path';

export class ApiUsageTracker {
  constructor() {
    this.cacheFile = 'api_usage_cache.json';
    this.usageData = this.loadUsageData();
  }

  // Load usage data from JSON file
  loadUsageData() {
    try {
      if (fs.existsSync(this.cacheFile)) {
        const data = fs.readFileSync(this.cacheFile, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading API usage cache:', error);
    }
    
    // Return default structure if file doesn't exist or is invalid
    return {
      currentMonth: this.getCurrentMonthKey(),
      requests: 0,
      lastReset: new Date().toISOString(),
      monthlyHistory: {}
    };
  }

  // Save usage data to JSON file
  saveUsageData() {
    try {
      fs.writeFileSync(this.cacheFile, JSON.stringify(this.usageData, null, 2));
    } catch (error) {
      console.error('Error saving API usage cache:', error);
    }
  }

  // Get current month key (YYYY-MM format)
  getCurrentMonthKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  // Check if we need to reset for a new month
  checkMonthReset() {
    const currentMonth = this.getCurrentMonthKey();
    
    if (this.usageData.currentMonth !== currentMonth) {
      // Save current month data to history
      this.usageData.monthlyHistory[this.usageData.currentMonth] = {
        requests: this.usageData.requests,
        lastReset: this.usageData.lastReset
      };
      
      // Reset for new month
      this.usageData.currentMonth = currentMonth;
      this.usageData.requests = 0;
      this.usageData.lastReset = new Date().toISOString();
      
      console.log(`API Usage Tracker: Reset for new month ${currentMonth}`);
    }
  }

  // Increment API request count
  incrementRequest() {
    this.checkMonthReset();
    this.usageData.requests++;
    this.saveUsageData();
    
    console.log(`API Request #${this.usageData.requests} for month ${this.usageData.currentMonth}`);
  }

  // Get current month usage
  getCurrentMonthUsage() {
    this.checkMonthReset();
    return {
      month: this.usageData.currentMonth,
      requests: this.usageData.requests,
      lastReset: this.usageData.lastReset
    };
  }

  // Get usage history
  getUsageHistory() {
    return this.usageData.monthlyHistory;
  }

  // Get all usage data
  getAllUsageData() {
    this.checkMonthReset();
    return {
      ...this.usageData,
      currentUsage: this.getCurrentMonthUsage()
    };
  }

  // Reset current month (admin function)
  resetCurrentMonth() {
    const currentMonth = this.getCurrentMonthKey();
    this.usageData.monthlyHistory[currentMonth] = {
      requests: this.usageData.requests,
      lastReset: this.usageData.lastReset
    };
    
    this.usageData.requests = 0;
    this.usageData.lastReset = new Date().toISOString();
    this.saveUsageData();
    
    console.log(`API Usage Tracker: Manually reset for month ${currentMonth}`);
  }
}
