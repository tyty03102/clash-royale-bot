// Test the timestamp fix
const testBattleTime = "20250812T000914.000Z";

console.log("Testing timestamp fix...");
console.log("Original battleTime:", testBattleTime);

try {
  // Convert compact format to standard ISO format
  // From: 20250812T000914.000Z
  // To: 2025-08-12T00:09:14.000Z
  let isoTime = testBattleTime;
  if (isoTime.match(/^\d{8}T\d{6}\.\d{3}Z$/)) {
    // Format: YYYYMMDDTHHMMSS.mmmZ
    const year = isoTime.substring(0, 4);
    const month = isoTime.substring(4, 6);
    const day = isoTime.substring(6, 8);
    const time = isoTime.substring(9, 15); // HHMMSS
    const hour = time.substring(0, 2);
    const minute = time.substring(2, 4);
    const second = time.substring(4, 6);
    const millis = isoTime.substring(16, 19); // .mmm
    
    isoTime = `${year}-${month}-${day}T${hour}:${minute}:${second}.${millis}Z`;
  }
  
  console.log("Converted to ISO:", isoTime);
  
  const battleTime = new Date(isoTime);
  console.log("Parsed Date object:", battleTime);
  console.log("getTime():", battleTime.getTime());
  console.log("isNaN check:", isNaN(battleTime.getTime()));
  
  if (!isNaN(battleTime.getTime())) {
    const timestamp = Math.floor(battleTime.getTime() / 1000);
    console.log("Unix timestamp:", timestamp);
    const discordTimestamp = `<t:${timestamp}:R>`;
    console.log("Discord timestamp:", discordTimestamp);
  } else {
    console.log("Date is still invalid!");
  }
} catch (error) {
  console.error("Error parsing battle time:", error);
}
